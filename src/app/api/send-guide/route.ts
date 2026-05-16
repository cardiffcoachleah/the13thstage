import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const resend = getResend();
    const { email, band } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const guideUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://the13thstage.com"}/files/13th_stage_guide.pdf`;

    const bandLabels: Record<string, string> = {
      early: "Early Signals",
      middle: "The Messy Middle",
      serious: "Serious Territory",
      crisis: "Crisis Zone",
    };

    const bandLabel = bandLabels[band] || "";
    const bandNote = bandLabel
      ? `Your assessment placed you in the ${bandLabel} range. `
      : "";

    const { error } = await resend.emails.send({
      from: "The 13th Stage <hello@the13thstage.com>",
      replyTo: "leah@leahfarmer.com",
      to: email,
      subject: "Your 13th Stage Guide",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; color: #1c1917;">
          <div style="padding: 32px 0 24px; border-bottom: 2px solid #c2410c;">
            <h1 style="font-size: 24px; font-weight: 700; margin: 0; color: #1c1917;">The 13th Stage</h1>
            <p style="font-size: 13px; color: #a8a29e; margin: 4px 0 0;">A Framework for Burnout Recovery</p>
          </div>

          <div style="padding: 28px 0;">
            <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
              Thank you for taking the assessment. ${bandNote}Here is your free copy of The 13th Stage Guide.
            </p>

            <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
              This guide walks through the 12 stages of burnout, explains why recovery is the 13th, and introduces the three phases of coming back to yourself: Stabilize, Resource, and Reimagine.
            </p>

            <div style="padding: 20px 0;">
              <a href="${guideUrl}" style="display: inline-block; padding: 12px 28px; background-color: #c2410c; color: #fef3c7; text-decoration: none; border-radius: 50px; font-size: 15px; font-weight: 600;">
                Download the Guide
              </a>
            </div>

            <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
              If you want to go deeper, the <a href="https://the13thstage.com/workbook" style="color: #c2410c;">13th Stage Workbook</a> is a self-guided 6-week recovery program. And if you'd rather not do it alone, the <a href="https://the13thstage.com/coaching" style="color: #c2410c;">coaching program</a> is built around the same framework, one-on-one.
            </p>

            <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
              Take care of yourself.
            </p>

            <p style="font-size: 15px; color: #1c1917; font-weight: 600;">Leah</p>
          </div>

          <div style="padding: 20px 0; border-top: 1px solid #d6d3d1; font-size: 11px; color: #a8a29e;">
            <p style="margin: 0;">Leah Farmer Coaching &amp; Advisory</p>
            <p style="margin: 4px 0 0;">
              <a href="https://the13thstage.com" style="color: #a8a29e;">the13thstage.com</a> &middot;
              <a href="https://leahfarmer.com" style="color: #a8a29e;">leahfarmer.com</a>
            </p>
            <p style="margin: 8px 0 0; font-size: 10px;">
              This assessment is for self-reflection purposes only and does not constitute medical advice.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send guide error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
