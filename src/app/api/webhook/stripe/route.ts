import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;

      if (!email) {
        console.error("No email in checkout session");
        return NextResponse.json({ error: "No email" }, { status: 400 });
      }

      const workbookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://the13thstage.com"}/files/13th_stage_workbook.pdf`;

      const { error } = await getResend().emails.send({
        from: "The 13th Stage <hello@the13thstage.com>",
        replyTo: "leah@leahfarmer.com",
        to: email,
        subject: "Your 13th Stage Workbook",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; color: #1c1917;">
            <div style="padding: 32px 0 24px; border-bottom: 2px solid #d97706;">
              <h1 style="font-size: 24px; font-weight: 700; margin: 0; color: #1c1917;">The 13th Stage</h1>
              <p style="font-size: 13px; color: #a8a29e; margin: 4px 0 0;">Your Workbook Is Ready</p>
            </div>

            <div style="padding: 28px 0;">
              <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
                Thank you for purchasing The 13th Stage Workbook. Here it is.
              </p>

              <div style="padding: 20px 0;">
                <a href="${workbookUrl}" style="display: inline-block; padding: 12px 28px; background-color: #d97706; color: #fef3c7; text-decoration: none; border-radius: 50px; font-size: 15px; font-weight: 600;">
                  Download the Workbook
                </a>
              </div>

              <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
                This is a fillable PDF. You can type directly into it on your computer or print it and write by hand. Give yourself six weeks. Work through one or two sections per week. The point is not to finish it. The point is to do the work inside it.
              </p>

              <p style="font-size: 15px; line-height: 1.7; color: #57534e;">
                If at any point you realize you want a thinking partner, the <a href="https://the13thstage.com/coaching" style="color: #d97706;">6-week coaching program</a> is built around this workbook. Your purchase price is credited toward coaching.
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
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
