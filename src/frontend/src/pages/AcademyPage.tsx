import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const WA_NUMBER = "[YOUR_WHATSAPP_NUMBER]";
const WA_LINK = `https://wa.me/91${WA_NUMBER}?text=Hi%20flynk!%20I%27d%20like%20to%20know%20more%20about%20your%20services`;

const steps = [
  {
    num: "01",
    title: "Training Programme",
    desc: "2 weeks of hands-on cleaning technique training. Correct floor mopping, safe bathroom cleaning, efficient dusting, handling fragile items, and working through a home systematically. Tested and certified at every stage.",
    detail:
      "Flynks learn by doing — not just watching. Every technique is practised until it becomes second nature.",
  },
  {
    num: "02",
    title: "Background Verification",
    desc: "Aadhaar verification, police clearance, and reference check. Non-negotiable. No Flynk enters a home without passing all three — no exceptions, no shortcuts.",
    detail:
      "We run thorough checks before training begins. Candidates who don't clear verification don't proceed.",
  },
  {
    num: "03",
    title: "Communication Skills",
    desc: "Trained to communicate professionally and respectfully with households. What to say when something is unclear. How to ask for feedback. Punctuality and conduct standards.",
    detail:
      "Professionalism isn't just about cleaning well — it's about being someone you're comfortable having in your home.",
  },
  {
    num: "04",
    title: "Certification",
    desc: "Only Flynks who pass all practical and professional assessments receive certification. Those who don't meet the standard are not deployed — regardless of how close they came.",
    detail: "The certificate means something. It's earned, not handed out.",
  },
  {
    num: "05",
    title: "Monthly Re-Assessment",
    desc: "Certification is not a one-time event. Every Flynk is re-assessed monthly against quality standards. Ongoing checks. Real accountability.",
    detail: "Standards maintained, not just promised. We check. Every month.",
  },
];

interface AcademyPageProps {
  onBack: () => void;
}

export function AcademyPage({ onBack }: AcademyPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="academy.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to flynk.
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-serif text-2xl font-bold text-foreground"
          >
            flynk<span className="gradient-text">.</span>
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white px-4 py-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #7C3AED, #F59E0B)" }}
          >
            Join Waitlist
          </a>
        </div>
      </header>

      <main data-ocid="academy.section">
        {/* Hero */}
        <section
          className="py-20 lg:py-28"
          style={{
            background: "linear-gradient(135deg, #12101A 0%, #7C3AED 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm font-semibold text-white/80 mb-8">
                <span
                  className="w-2 h-2 rounded-full bg-teal badge-blink inline-block"
                  style={{ backgroundColor: "#F59E0B" }}
                />
                India's First Certified Home Helper Programme
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl text-white mb-6 leading-tight">
                The Flynk
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Academy
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                We don't hire off the street. Before a Flynk enters your home,
                they complete two weeks of structured training, full background
                verification, and professional certification.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certificate + Steps */}
        <section className="py-20 lg:py-28" style={{ background: "#F3F0FA" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Certificate visual */}
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="sticky top-24"
              >
                <div
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
                    minHeight: "400px",
                  }}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-8 right-8 w-32 h-32 rounded-full border-2 border-white" />
                    <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-white" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white" />
                  </div>

                  <div className="relative z-10 text-center">
                    <svg
                      width="200"
                      height="140"
                      viewBox="0 0 200 140"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto mb-6"
                      role="img"
                      aria-label="Flynk Academy Certificate Badge"
                    >
                      <path
                        d="M100 15 L135 30 L135 75 Q135 105 100 120 Q65 105 65 75 L65 30 Z"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.8"
                      />
                      <polygon
                        points="100,45 118,55 100,65 82,55"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line
                        x1="100"
                        y1="65"
                        x2="100"
                        y2="78"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <line
                        x1="82"
                        y1="55"
                        x2="82"
                        y2="70"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="82"
                        cy="72"
                        r="2"
                        fill="white"
                        opacity="0.7"
                      />
                      <text
                        x="85"
                        y="100"
                        fontSize="12"
                        fill="white"
                        opacity="0.7"
                      >
                        ★ ★ ★
                      </text>
                      <line
                        x1="40"
                        y1="125"
                        x2="160"
                        y2="125"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                      <line
                        x1="55"
                        y1="132"
                        x2="145"
                        y2="132"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.2"
                      />
                    </svg>

                    <h3 className="font-serif text-2xl text-white mb-1">
                      Certificate of Completion
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                      Flynk Academy — Bengaluru
                    </p>

                    <div className="border border-white/20 rounded-2xl p-4 mb-6">
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                        Awarded to
                      </p>
                      <p className="text-white font-serif text-xl italic">
                        Certified Flynk
                      </p>
                    </div>

                    <div className="flex justify-center gap-1 mb-4">
                      {[
                        "Cleaning",
                        "Safety",
                        "Communication",
                        "Professionalism",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="text-xs text-white/60 border border-white/20 rounded-full px-2 py-0.5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/50 text-xs">
                      flynk. · www.flynknow.com
                    </p>
                  </div>
                </div>

                {/* Stats below certificate */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { value: "2 weeks", label: "Training" },
                    { value: "3-step", label: "Background check" },
                    { value: "Monthly", label: "Re-assessment" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-4 bg-white rounded-2xl border border-border shadow-card"
                    >
                      <p className="font-serif text-xl gradient-text font-bold">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Steps */}
              <div className="space-y-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-16 pb-10 last:pb-0"
                  >
                    {/* Vertical line */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-6 top-10 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
                    )}

                    {/* Number circle */}
                    <div
                      className="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-serif font-bold text-sm"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                      }}
                    >
                      {step.num}
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {step.desc}
                      </p>
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-white border border-border">
                        <CheckCircle2
                          className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5"
                          style={{ color: "#7C3AED" }}
                        />
                        <p className="text-sm text-foreground">{step.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-foreground text-background">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl text-white mb-4">
                Your home. Our standards.
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                Every Flynk in your home is Flynk Academy certified. No
                exceptions.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold btn-glow"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                }}
                data-ocid="academy.primary_button"
              >
                Join the flynk. Waitlist
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center bg-background">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} flynk. — Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "flynknow.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
