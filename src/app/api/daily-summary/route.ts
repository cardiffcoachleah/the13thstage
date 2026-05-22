import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get results from the last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: results, error: dbError } = await supabase
      .from("quiz_results")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // Don't send if no results
    if (!results || results.length === 0) {
      return NextResponse.json({ message: "No results today" });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
    }

    const resend = new Resend(resendKey);

    const bandLabels: Record<string, string> = {
      early: "Early Signals",
      middle: "Messy Middle",
      serious: "Serious Territory",
      crisis: "Crisis Zone",
    };

    // Build summary
    const withEmail = results.filter((r) => r.email);
    const withoutEmail = results.filter((r) => !r.email);
    const optedIn = results.filter((r) => r.newsletter_opt_in);

    const bandCounts: Record<string, number> = {};
    for (const r of results) {
      const band = r.band || "unknown";
      bandCounts[band] = (bandCounts[band] || 0) + 1;
    }

    const rows = results
      .map((r) => {
        const email = r.email || "no email";
        const band = bandLabels[r.band] || r.band || "unknown";
        const score = r.total_score || "?";
        const time = new Date(r.created_at).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "Europe/London",
        });
        const opted = r.newsletter_opt_in ? "yes" : "no";
        return `<tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #d6d3d1; font-size: 13px;">${email}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #d6d3d1; font-size: 13px;">${band}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #d6d3d1; font-size: 13px; text-align: center;">${score}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #d6d3d1; font-size: 13px; text-align: center;">${opted}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #d6d3d1; font-size: 13px;">${time}</td>
        </tr>`;
      })
      .join("\n");

    const bandSummary = Object.entries(bandCounts)
      .map(([band, count]) => `${bandLabels[band] || band}: ${count}`)
      .join(" &middot; ");

    const { error: sendError } = await resend.emails.send({
      from: "The 13th Stage <hello@the13thstage.com>",
      to: "leah@leahfarmer.com",
      subject: `13th Stage Daily: ${results.length} assessment${results.length === 1 ? "" : "s"} today`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
          <div style="padding: 24px 0 16px; border-bottom: 2px solid #c2410c;">
            <h1 style="font-size: 20px; font-weight: 700; margin: 0;">Daily Assessment Summary</h1>
            <p style="font-size: 13px; color: #a8a29e; margin: 4px 0 0;">Last 24 hours</p>
          </div>

          <div style="padding: 20px 0;">
            <p style="font-size: 15px; color: #57534e; margin: 0 0 4px;">
              <strong>${results.length}</strong> assessment${results.length === 1 ? "" : "s"} completed
            </p>
            <p style="font-size: 13px; color: #a8a29e; margin: 0 0 4px;">
              ${withEmail.length} with email &middot; ${withoutEmail.length} anonymous &middot; ${optedIn.length} newsletter opt-in
            </p>
            <p style="font-size: 13px; color: #a8a29e; margin: 0;">
              ${bandSummary}
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <thead>
              <tr style="background-color: #fdf8f0;">
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8a29e; border-bottom: 1px solid #d6d3d1;">Email</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8a29e; border-bottom: 1px solid #d6d3d1;">Band</th>
                <th style="padding: 8px 12px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8a29e; border-bottom: 1px solid #d6d3d1;">Score</th>
                <th style="padding: 8px 12px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8a29e; border-bottom: 1px solid #d6d3d1;">Opted In</th>
                <th style="padding: 8px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a8a29e; border-bottom: 1px solid #d6d3d1;">Time</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div style="padding: 16px 0; border-top: 1px solid #d6d3d1; font-size: 11px; color: #a8a29e;">
            <a href="https://hbbbiamiqtgcdxkiyahh.supabase.co" style="color: #c2410c;">View full data in Supabase</a>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ sent: true, count: results.length });
  } catch (err) {
    console.error("Daily summary error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
