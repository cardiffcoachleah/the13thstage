import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, band, newsletterOptIn } = await req.json();

    if (!email || !newsletterOptIn) {
      return NextResponse.json({ skipped: true });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const server = process.env.MAILCHIMP_SERVER; // e.g. "us21"

    if (!apiKey || !listId || !server) {
      console.error("Mailchimp env vars not set");
      return NextResponse.json({ error: "Config missing" }, { status: 500 });
    }

    // Mailchimp uses MD5 hash of lowercase email as subscriber ID
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    const bandLabels: Record<string, string> = {
      early: "Early Signals",
      middle: "Messy Middle",
      serious: "Serious Territory",
      crisis: "Crisis Zone",
    };

    const tags = [
      "13th Stage Quiz",
      bandLabels[band] || band,
    ];

    // Use PUT for upsert (add or update)
    const url = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          QUIZ_BAND: bandLabels[band] || band,
        },
        tags: tags,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Mailchimp error:", err);

      // If merge field doesn't exist, try without it
      if (err.detail?.includes("merge")) {
        const retryResponse = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `apikey ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status_if_new: "subscribed",
          }),
        });

        if (!retryResponse.ok) {
          const retryErr = await retryResponse.json();
          console.error("Mailchimp retry error:", retryErr);
          return NextResponse.json({ error: "Mailchimp failed" }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: "Mailchimp failed" }, { status: 500 });
      }
    }

    // Tags need to be added separately via the tags endpoint
    const tagsUrl = `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/tags`;
    await fetch(tagsUrl, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tags.map((t) => ({ name: t, status: "active" })),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mailchimp sync error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
