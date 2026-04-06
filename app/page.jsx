"use client";

import { useState, useEffect } from "react";

/* ── Config ── */
// Replace this with your actual Calendly link
const CALENDLY_URL = "https://calendly.com/briefdadmin/30min";

const openCalendly = () => {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, "_blank", "noopener");
  }
};

/* ── Design tokens ── */
const C = {
  bg: "#FAFAF8", card: "#FFFFFF", dark: "#111111", text: "#333333",
  muted: "#6B7280", accent: "#1B4D3E", accentLight: "#E8F0ED",
  gold: "#C4973B", goldLight: "#FBF6ED", border: "#E5E5E3",
  red: "#C0392B", redLight: "#FDF2F0",
};
const serif = "Fraunces, Georgia, serif";
const sans = "'General Sans', -apple-system, sans-serif";

/* ── Reusable components ── */

const Pill = ({ children, color = C.accent }) => (
  <span style={{
    display: "inline-block", padding: "5px 14px", fontSize: 12, fontWeight: 600,
    fontFamily: sans, letterSpacing: "0.08em", textTransform: "uppercase",
    color, background: color === C.accent ? C.accentLight : color === C.red ? C.redLight : C.goldLight,
    borderRadius: 100,
  }}>{children}</span>
);

const Btn = ({ children, big, outline, onClick, full, style: s }) => {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        fontFamily: sans, fontSize: big ? 17 : 15, fontWeight: 600, cursor: "pointer",
        padding: big ? "18px 40px" : "14px 28px", borderRadius: 10, border: "none",
        width: full ? "100%" : "auto", transition: "all 0.2s ease",
        ...(outline
          ? { background: "transparent", color: C.accent, border: `1.5px solid ${C.border}`, ...(h && { borderColor: C.accent }) }
          : { background: h ? "#163E32" : C.accent, color: "#fff", boxShadow: h ? "0 8px 24px rgba(27,77,62,0.25)" : "0 4px 12px rgba(27,77,62,0.15)", transform: h ? "translateY(-1px)" : "none" }),
        ...s,
      }}
    >{children}</button>
  );
};

const Check = ({ children }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
      <circle cx="9" cy="9" r="9" fill={C.accentLight} />
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ fontFamily: sans, fontSize: 15, color: C.text, lineHeight: 1.55 }}>{children}</span>
  </div>
);

const Cross = ({ children }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
      <circle cx="9" cy="9" r="9" fill={C.redLight} />
      <path d="M6 6l6 6M12 6l-6 6" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    <span style={{ fontFamily: sans, fontSize: 15, color: C.muted, lineHeight: 1.55 }}>{children}</span>
  </div>
);

const Wrap = ({ children, style, id, narrow }) => (
  <section id={id} style={{ padding: "72px 24px", maxWidth: narrow ? 740 : 1060, margin: "0 auto", ...style }}>
    {children}
  </section>
);

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, padding: "18px 0", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 500, color: C.dark }}>{q}</span>
        <span style={{
          fontFamily: sans, fontSize: 20, color: C.accent,
          transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none",
          flexShrink: 0, marginLeft: 12,
        }}>+</span>
      </div>
      {open && <p style={{ fontFamily: sans, fontSize: 15, color: C.muted, lineHeight: 1.7, marginTop: 10, marginBottom: 0, paddingRight: 32 }}>{a}</p>}
    </div>
  );
};

/* ── ROI Calculator ── */

const SliderInput = ({ label, value, onChange, min, max, step, prefix, suffix }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <label style={{ fontFamily: sans, fontSize: 14, color: C.muted }}>{label}</label>
      <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: C.accent }}>{prefix}{value}{suffix}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      style={{
        width: "100%",
        appearance: "none",
        height: 6,
        borderRadius: 100,
        background: `linear-gradient(to right, ${C.accent} ${((value - min) / (max - min)) * 100}%, ${C.border} ${((value - min) / (max - min)) * 100}%)`,
        outline: "none",
        cursor: "pointer",
      }}
    />
  </div>
);

const ROICalculator = () => {
  const [clients, setClients] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [hoursPerClient, setHoursPerClient] = useState(12);

  const monthlyHoursSaved = clients * hoursPerClient;
  const monthlyValueRecovered = monthlyHoursSaved * hourlyRate;
  const annualSavings = monthlyValueRecovered * 12;

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: "40px 36px",
      maxWidth: 580,
      margin: "0 auto",
    }}>
      <h3 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.dark, marginBottom: 8, textAlign: "center" }}>
        Your savings with Briefd
      </h3>
      <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, textAlign: "center", marginBottom: 36 }}>
        Drag the sliders to match your agency
      </p>
      <SliderInput label="Retainer clients" value={clients} onChange={setClients} min={3} max={50} step={1} suffix=" clients" />
      <SliderInput label="Team hourly rate" value={hourlyRate} onChange={setHourlyRate} min={30} max={200} step={5} prefix="£" suffix="/hr" />
      <SliderInput label="Hours per client on reporting" value={hoursPerClient} onChange={setHoursPerClient} min={4} max={20} step={1} suffix=" hrs" />

      <div style={{
        background: C.accentLight,
        borderRadius: 12,
        padding: "28px 24px",
        marginTop: 16,
        border: `1px solid ${C.accent}22`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Hours recovered / month</div>
            <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.accent }}>{monthlyHoursSaved}</div>
          </div>
          <div>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Value recovered / month</div>
            <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.accent }}>£{monthlyValueRecovered.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.accent}33`, paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Annual savings</div>
            <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: C.dark }}>£{annualSavings.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>That&apos;s enough to</div>
            <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: C.dark, lineHeight: 1.5 }}>
              {annualSavings >= 500000 ? "Open a second office" : annualSavings >= 250000 ? "Build an entire new team" : annualSavings >= 150000 ? "Hire a strategist and an AM" : annualSavings >= 100000 ? "Hire 2 senior strategists" : annualSavings >= 50000 ? "Hire a senior strategist" : "Fund your next hire"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button
          onClick={openCalendly}
          style={{
            fontFamily: sans, fontSize: 15, fontWeight: 600, cursor: "pointer",
            padding: "14px 32px", borderRadius: 10, border: "none",
            background: C.accent, color: "#fff",
            boxShadow: "0 4px 12px rgba(27,77,62,0.15)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#163E32"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = "none"; }}
        >
          Get these hours back. Book a call →
        </button>
      </div>
    </div>
  );
};

/* ── Main page ── */

export default function BriefdOffer() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.dark }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "18px 24px",
        background: showSticky ? `${C.bg}EE` : "transparent",
        backdropFilter: showSticky ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        borderBottom: showSticky ? `1px solid ${C.border}` : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.accent }}>Briefd</span>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn outline onClick={() => scrollTo("pricing")}>See Plans</Btn>
            <Btn onClick={openCalendly}>Book Your Onboarding Call</Btn>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <Wrap style={{ paddingTop: 140, paddingBottom: 60, textAlign: "center" }}>
        <div className="fi"><Pill>For agencies managing 5 to 50 client accounts</Pill></div>
        <h1 className="fi fi1" style={{
          fontFamily: serif, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
          lineHeight: 1.15, color: C.dark, maxWidth: 760, margin: "24px auto 20px",
        }}>
          Your clients deserve reports that read like strategy,{" "}
          <span style={{ color: C.accent, fontStyle: "italic" }}>not spreadsheets</span>
        </h1>
        <p className="fi fi2" style={{
          fontFamily: sans, fontSize: 19, lineHeight: 1.7, color: C.muted,
          maxWidth: 600, margin: "0 auto 36px",
        }}>
          Briefd connects to Google Ads, Meta Ads, and GA4, then generates branded narrative client reports in under 45 seconds. No data-pulling. No copy-pasting. No rewording numbers into sentences.
        </p>
        <div className="fi fi3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn big onClick={openCalendly}>Start Your 14-Day Free Trial</Btn>
          <Btn big outline onClick={() => scrollTo("how")}>See How It Works ↓</Btn>
        </div>
        <p className="fi fi3" style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginTop: 14, opacity: 0.7 }}>
          Free 14-day trial · No long-term contract · Live in under 10 minutes
        </p>
      </Wrap>

      {/* ── THE PROBLEM ── */}
      <Wrap narrow>
        <Pill color={C.red}>The problem</Pill>
        <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.dark, marginTop: 16, marginBottom: 14, lineHeight: 1.2 }}>
          Reporting is the most hated task in agency life
        </h2>
        <p style={{ fontFamily: sans, fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>
          Every month, your team logs into 3+ platforms, pulls screenshots, stitches data into spreadsheets, writes &ldquo;insights&rdquo; that are just numbers restated as sentences, formats branded PDFs, and emails them out. Clients often don&apos;t even read them.
        </p>
        <div style={{ background: C.redLight, borderRadius: 12, padding: "24px 22px", border: `1px solid ${C.red}15` }}>
          <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            What this actually costs a 15-client agency
          </div>
          {[
            ["Hours lost per month", "120 to 180 hrs"],
            ["At £55/hr blended rate", "£6,600 to £9,900/mo"],
            ["Annual cost of reporting", "£79,000 to £119,000"],
            ["Senior talent doing junior work", "Priceless waste"],
          ].map(([l, v], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "8px 0",
              borderBottom: i < 3 ? `1px solid ${C.red}10` : "none",
            }}>
              <span style={{ fontFamily: sans, fontSize: 14, color: C.text }}>{l}</span>
              <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: i === 2 ? C.red : C.dark }}>{v}</span>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── HOW IT WORKS ── */}
      <Wrap id="how">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill>How Briefd works</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: C.dark, marginTop: 16, lineHeight: 1.2 }}>
            From live data to branded report in 45 seconds
          </h2>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { n: "1", t: "Connect your ad platforms", d: "Sign in with your Google and Meta accounts. That's it. Briefd uses secure OAuth connections, the same login method used by tools like Google Analytics and Slack. No API keys to find, no developer needed, no manual CSV uploads. Access is read-only, so Briefd can never modify your ad accounts. Once connected, Briefd automatically pulls 90 days of historical campaign data so you get trend analysis and period comparisons from day one." },
            { n: "2", t: "Briefd writes the strategic narrative", d: "Briefd analyses campaign performance, compares to prior periods, spots anomalies, and writes the full report. Executive summary, channel breakdowns, key wins, concerns, and specific recommendations. Not 'clicks went up' but why it matters." },
            { n: "3", t: "Branded PDF, delivered", d: "Your logo, your colours, your tone of voice. Every report generates as a polished PDF with embedded charts. Review and edit before sending, or set it to auto-deliver weekly or monthly. Clients get a private dashboard too." },
          ].map(({ n, t, d }) => (
            <div key={n} style={{
              flex: "1 1 280px", background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "32px 26px",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: C.accentLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: sans, fontWeight: 700, fontSize: 15, color: C.accent, marginBottom: 18,
              }}>{n}</div>
              <h3 style={{ fontFamily: serif, fontSize: 21, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{t}</h3>
              <p style={{ fontFamily: sans, fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── ROI CALCULATOR ── */}
      <Wrap id="roi" narrow>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill>Interactive calculator</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: C.dark, marginTop: 16, lineHeight: 1.2 }}>
            See what reporting <em>actually</em> costs your agency
          </h2>
        </div>
        <ROICalculator />
      </Wrap>

      {/* ── VS COMPETITORS ── */}
      <Wrap narrow>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Pill>Why Briefd is different</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.dark, marginTop: 16, lineHeight: 1.2 }}>
            Dashboard tools show charts. Briefd writes the report.
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: C.muted, marginTop: 10, lineHeight: 1.65 }}>
            Tools like AgencyAnalytics, Whatagraph, and DashThis give you dashboards, but your clients don&apos;t log in. They want a written analysis emailed to them. Briefd is the only tool built for that.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: "28px 24px" }}>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.red, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Dashboard tools</div>
            <Cross>Charts and widgets your clients never check</Cross>
            <Cross>You still write the narrative by hand</Cross>
            <Cross>No strategic recommendations</Cross>
            <Cross>PDF export is a screenshot, not a report</Cross>
            <Cross>Paying for data you still have to interpret</Cross>
          </div>
          <div style={{ flex: "1 1 300px", background: C.accentLight, borderRadius: 14, border: `2px solid ${C.accent}33`, padding: "28px 24px" }}>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Briefd</div>
            <Check>Written narrative your clients actually read</Check>
            <Check>Strategic analysis & recommendations, written for you</Check>
            <Check>Branded PDF with charts, KPIs, and commentary</Check>
            <Check>Auto-scheduled delivery, fully hands-off</Check>
            <Check>14-day free trial to prove it works</Check>
          </div>
        </div>
      </Wrap>

      {/* ── WHAT'S IN EVERY REPORT ── */}
      <Wrap narrow>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Pill>What you get</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.dark, marginTop: 16, lineHeight: 1.2 }}>
            Every Briefd report includes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            ["Executive Summary", "2 to 3 paragraph overview with specific numbers and period-over-period comparisons."],
            ["Channel Performance", "Dedicated analysis for each platform. Google Ads, Meta Ads, and GA4 organic traffic."],
            ["Key Wins", "Specific victories with data: 'Carousel campaign ROAS increased 34% to 4.2x, driven by new creative testing.'"],
            ["Areas of Concern", "Anomalies and underperformance flagged with context. Not just red numbers, but what's causing them."],
            ["Recommendations", "Actionable next steps: 'Shift $500/week from Campaign X to Campaign Y based on 3x ROAS difference.'"],
            ["Branded PDF", "Cover page, table of contents, embedded charts, agency branding. Ready to email as-is."],
          ].map(([title, desc], i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 6 }}>{title}</div>
              <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Wrap>

      {/* ── PRICING ── */}
      <Wrap id="pricing">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill color={C.gold}>Founding member pricing. First 20 agencies.</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: C.dark, marginTop: 16, lineHeight: 1.2 }}>
            Simple plans that scale with your agency
          </h2>
          <p style={{ fontFamily: sans, fontSize: 16, color: C.muted, marginTop: 10, lineHeight: 1.65, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Every plan includes a 14-day free trial. Founding rates are locked for life while your subscription stays active.
          </p>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "stretch" }}>

          {/* Starter */}
          <div style={{
            background: C.card, borderRadius: 16, padding: "36px 28px",
            border: `1px solid ${C.border}`, flex: "1 1 280px",
            display: "flex", flexDirection: "column",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.accent, marginBottom: 4 }}>Starter</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: serif, fontSize: 44, fontWeight: 700, color: C.dark }}>$119</span>
              <span style={{ fontFamily: sans, fontSize: 14, color: C.muted }}>/month</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginBottom: 12, textDecoration: "line-through" }}>$199/mo standard pricing</div>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>
              For solo founders and small agencies getting started with automated reporting. Everything you need to replace manual data-pulling for your first clients.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginBottom: 20, flex: 1 }}>
              <Check>Up to <strong>5 clients</strong></Check>
              <Check><strong>20 reports</strong>/month</Check>
              <Check><strong>2</strong> team members</Check>
              <Check>Google Ads + Meta Ads + GA4</Check>
              <Check>Logo + brand colours on reports</Check>
              <Check>Email report delivery</Check>
              <Check>Email support</Check>
            </div>
            <Btn full onClick={openCalendly}>Start Free Trial</Btn>
          </div>

          {/* Growth */}
          <div style={{
            background: C.card, borderRadius: 16, padding: "36px 28px",
            border: `2px solid ${C.accent}`, flex: "1 1 280px", position: "relative",
            display: "flex", flexDirection: "column",
            boxShadow: "0 12px 40px rgba(27,77,62,0.12)",
          }}>
            <div style={{
              position: "absolute", top: -1, left: "50%", transform: "translateX(-50%) translateY(-50%)",
              background: C.accent, color: "#fff", fontFamily: sans, fontSize: 11, fontWeight: 700,
              padding: "5px 16px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>Most Popular</div>
            <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.accent, marginBottom: 4 }}>Growth</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: serif, fontSize: 44, fontWeight: 700, color: C.dark }}>$209</span>
              <span style={{ fontFamily: sans, fontSize: 14, color: C.muted }}>/month</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginBottom: 12, textDecoration: "line-through" }}>$349/mo standard pricing</div>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>
              For mid-size agencies ready to fully automate client reporting. More clients, more control, and client-facing dashboards so your work speaks for itself.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginBottom: 20, flex: 1 }}>
              <Check>Up to <strong>15 clients</strong></Check>
              <Check><strong>60 reports</strong>/month</Check>
              <Check><strong>5</strong> team members</Check>
              <Check>Everything in Starter, plus:</Check>
              <Check>Custom font selection</Check>
              <Check>Password-protected client dashboards</Check>
              <Check>Scheduled auto-delivery (weekly/monthly)</Check>
              <Check>Priority email support</Check>
            </div>
            <Btn full onClick={openCalendly}>Start Free Trial (Most Popular)</Btn>
          </div>

          {/* Agency */}
          <div style={{
            background: C.card, borderRadius: 16, padding: "36px 28px",
            border: `1px solid ${C.border}`, flex: "1 1 280px",
            display: "flex", flexDirection: "column",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.accent, marginBottom: 4 }}>Agency</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: serif, fontSize: 44, fontWeight: 700, color: C.dark }}>$299</span>
              <span style={{ fontFamily: sans, fontSize: 14, color: C.muted }}>/month</span>
            </div>
            <div style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginBottom: 12, textDecoration: "line-through" }}>$499/mo standard pricing</div>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>
              For established agencies that want Briefd to feel like their own product. White-label everything, unlimited team access, and dedicated support.
            </p>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginBottom: 20, flex: 1 }}>
              <Check>Up to <strong>40 clients</strong></Check>
              <Check><strong>160 reports</strong>/month</Check>
              <Check><strong>Unlimited</strong> team members</Check>
              <Check>Everything in Growth, plus:</Check>
              <Check>White-label custom domain</Check>
              <Check>Full brand customisation on client dashboards</Check>
              <Check>Dedicated Slack support channel</Check>
              <Check>Additional clients at $25/client/mo</Check>
            </div>
            <Btn full onClick={openCalendly}>Start Free Trial</Btn>
          </div>
        </div>
        <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, textAlign: "center", marginTop: 20 }}>
          All plans include branded narrative reports, prior-period comparisons, trend detection, and 90-day historical backfill on connect.
        </p>
      </Wrap>

      {/* ── GET STARTED ── */}
      <Wrap id="get-started" narrow>
        <div style={{
          background: C.card, borderRadius: 20, padding: "56px 40px",
          border: `2px solid ${C.accent}22`, textAlign: "center",
          boxShadow: "0 12px 40px rgba(27,77,62,0.08)",
        }}>
          <Pill color={C.gold}>Limited founding spots</Pill>
          <h2 style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, color: C.dark, marginTop: 18, marginBottom: 12, lineHeight: 1.2 }}>
            See Briefd with your own data
          </h2>
          <p style={{ fontFamily: sans, fontSize: 17, color: C.muted, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 16px" }}>
            Book a 20-minute onboarding call. We&apos;ll connect your ad platforms, configure your branding, and generate your first report live so you can see exactly what your clients will receive.
          </p>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
            background: C.accentLight, borderRadius: 14, padding: "28px 24px",
            maxWidth: 440, margin: "0 auto 28px",
          }}>
            <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Your 14-day trial includes
            </div>
            <div style={{ textAlign: "left", width: "100%" }}>
              <Check>1-on-1 onboarding. We set everything up for you.</Check>
              <Check>Connect Google Ads, Meta Ads, and GA4</Check>
              <Check>Branded narrative reports generated automatically</Check>
              <Check>90 days of historical data pulled automatically</Check>
              <Check>Full access to all features, no restrictions</Check>
              <Check>Cancel anytime, no questions asked</Check>
            </div>
          </div>
          <Btn big onClick={openCalendly}>Book Your Onboarding Call →</Btn>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginTop: 14 }}>
            Free 14-day trial · Takes 20 minutes · No commitment
          </p>
        </div>
      </Wrap>

      {/* ── GUARANTEE ── */}
      <Wrap narrow>
        <div style={{
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
          padding: "44px 36px", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🛡️</div>
          <h3 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: C.dark, marginBottom: 10 }}>
            14-day free trial. Cancel in one click.
          </h3>
          <p style={{ fontFamily: sans, fontSize: 16, color: C.muted, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Try Briefd with your real client data for two full weeks. If it doesn&apos;t save you meaningful time, cancel from your settings page. No calls, no emails, no hoops. You&apos;ll never be charged.
          </p>
        </div>
      </Wrap>

      {/* ── FAQ ── */}
      <Wrap narrow>
        <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: C.dark, textAlign: "center", marginBottom: 32 }}>
          Common questions
        </h2>
        <FAQ q="What happens on the onboarding call?" a="We'll connect your Google and Meta accounts, upload your logo and brand colours, add your first client, and generate a live report together. The whole thing takes about 20 minutes. You'll leave the call with a finished report you can send to a client that same day." />
        <FAQ q="How long does setup take?" a="Under 10 minutes once we're on the call. You connect via OAuth (one click each), add your first client, and Briefd immediately pulls 90 days of historical data. Your first report generates the same day." />
        <FAQ q="What does the narrative actually sound like?" a="Like a senior strategist wrote it. It references specific numbers, compares to prior periods, explains why changes happened, and gives actionable recommendations. Not generic filler. You choose between Professional, Conversational, or Direct tone, and Briefd writes in your agency's voice." />
        <FAQ q="Can I edit reports before they go to clients?" a="Yes. Every report section is independently editable with a rich text editor. Most agencies review the first few reports, then switch to auto-send once they trust the output." />
        <FAQ q="Is my client data secure?" a="All connections are read-only OAuth, so Briefd can never modify your ad accounts. Data is encrypted in transit and at rest. Row-level security ensures agencies can only access their own data. We never share data between agencies." />
        <FAQ q="Which platforms do you support?" a="Google Ads, Meta Ads (Facebook & Instagram), and Google Analytics 4 at launch. LinkedIn Ads and TikTok Ads are coming in Q3 2026." />
        <FAQ q="What happens after the 14-day trial?" a="You pick the plan that fits your agency. Starter, Growth, or Agency. Your founding rate locks in for life. If Briefd isn't right for you, just cancel before the trial ends. No charge, no pressure." />
        <FAQ q="How does Briefd compare to AgencyAnalytics or Whatagraph?" a="Those tools are dashboard-first. They show charts and widgets. But clients don't log into dashboards. They want a written report emailed to them. Briefd is the only tool built for that." />
      </Wrap>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "80px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 700, color: C.dark, lineHeight: 1.2, marginBottom: 16 }}>
            Stop writing reports your clients don&apos;t read.{" "}
            <span style={{ color: C.accent, fontStyle: "italic" }}>Start sending ones they do.</span>
          </h2>
          <p style={{ fontFamily: sans, fontSize: 17, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>
            Book a 20-minute call and we&apos;ll generate your first client report live. Your real data, your branding, your clients.
          </p>
          <Btn big onClick={openCalendly}>Book Your Onboarding Call →</Btn>
          <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginTop: 14 }}>
            Free 14-day trial · No commitment · Limited founding spots
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "28px 24px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.accent }}>Briefd</span>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.muted, marginLeft: 12 }}>
          Automated client reporting for marketing agencies
        </span>
      </footer>
    </div>
  );
}