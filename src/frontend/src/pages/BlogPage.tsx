import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "motion/react";

const WA_NUMBER = "9535708093";
const WA_LINK = `https://wa.me/91${WA_NUMBER}?text=Hey%20Flynk%2C%20I%20want%20to%20start%207%20day%20free%20trial%20for%20my%20home.`;

const posts = [
  {
    tag: "Pricing",
    title:
      "Why flynk. costs ₹4,999 — and why Urban Company costs more in the long run",
    excerpt:
      "On-demand apps charge ₹300–500 per visit. Daily. That's ₹9,000–15,000/month. flynk. gives you daily service at nearly half the cost — and the same person every single day.",
    readTime: "5 min read",
    gradientFrom: "#7C3AED",
    gradientTo: "#F59E0B",
    emoji: "💰",
    content: `
When you book a maid through an on-demand app, you pay per visit. Sounds flexible. But flexible is expensive.

At ₹300–500 per visit, a daily booking for 30 days costs you ₹9,000–15,000 every month. And each time, it's a different person. They don't know where you keep your utensils. They don't know how you like your shelves dusted. You start from scratch every morning.

flynk. is different. ₹4,999/month. Same Flynk every day. Trained. Certified. Background verified.

The math is simple. The experience is incomparable.

**The hidden costs of on-demand**

On-demand services also have hidden costs: cancellation fees, surge pricing on weekends, "professional" upsells you didn't ask for.

With flynk., your price is fixed. Forever. (As long as your subscription is active — your early bird rate is locked for life.)

**The trust premium**

Beyond money, there's trust. Coming home to the same person every day — someone who knows your home, your routines, your preferences — is worth more than any discount.

That's what flynk. is building. Not a gig economy. A subscription to peace of mind.
    `,
  },
  {
    tag: "Inside flynk.",
    title: "Inside the Flynk Academy: How we train and certify every helper",
    excerpt:
      "We don't hire off the street. Every Flynk completes a 5-day intensive training programme before they ever enter a home. Here's what that programme actually looks like.",
    readTime: "4 min read",
    gradientFrom: "#F59E0B",
    gradientTo: "#7C3AED",
    emoji: "🎓",
    content: `
Most home services companies hire fast and deploy fast. Someone applies on Monday and they're at your door by Friday.

That's not how flynk. works.

**The Flynk Academy**

Every Flynk completes a 5-day intensive training programme before they're ever assigned to a home. We call it the Flynk Academy.

Week one: hands-on cleaning technique. Correct floor mopping. Safe bathroom cleaning. Efficient dusting. How to handle fragile items. How to move through a home without creating more work.

Week two: professional standards. Punctuality. Communication. How to interact respectfully with a household. What to do if something goes wrong.

**Background verification — non-negotiable**

Before training begins, every candidate undergoes full background verification: Aadhaar check, police clearance, and reference verification. We don't cut corners.

**Certification**

Only Flynks who pass all assessments — practical and professional — are certified and deployed. Those who don't meet the standard aren't deployed. Period.

**Monthly re-assessment**

Certification isn't a one-time event. Every Flynk is re-assessed monthly. Standards maintained, not just promised.

This is Bengaluru's most rigorous home helper training programme. We built it because we believe Flynks deserve real training, and you deserve someone who actually knows what they're doing.
    `,
  },
  {
    tag: "Cities",
    title: "Why we chose 560077 first — and what it means for Bengaluru",
    excerpt:
      "We could have launched across 50 pincodes. We chose one. Here's why quality-first matters more than scale — and what our expansion plan actually looks like.",
    readTime: "3 min read",
    gradientFrom: "#12101A",
    gradientTo: "#7C3AED",
    emoji: "📍",
    content: `
When we decided to launch flynk. in Bengaluru, the easy move was to go wide. Cover as many pincodes as possible. Grow fast. Worry about quality later.

We chose the opposite.

**Why 560077**

Bengaluru 560077 is a dense, high-demand area with a mix of working professionals, young families, and established households. It's a pincode where people genuinely need reliable daily home help — and where the on-demand model has consistently let them down.

It's also a pincode we could serve well. Not just adequately. Well.

**One pincode at a time**

The reason we expand slowly is simple: quality doesn't scale automatically. For every new pincode we enter, we need trained Flynks who live in that area. We need shadow Flynk coverage. We need the infrastructure to respond if something goes wrong.

Launching in 560077 first lets us build that infrastructure properly. We learn what works. We fix what doesn't. We earn trust before we ask for it across the city.

**What this means for you**

If you're in 560077 — join the waitlist now. Early bird pricing is ₹4,999/month and it's locked for life once you subscribe.

If you're in another Bengaluru pincode — join the waitlist for your area. We're expanding methodically. We'll notify you the moment your pincode goes live.

flynk. isn't trying to be everywhere. We're trying to be irreplaceable — one neighbourhood at a time.
    `,
  },
];

interface BlogPageProps {
  onBack: () => void;
}

export function BlogPage({ onBack }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="blog.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FLYNK
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-serif text-2xl font-bold text-foreground"
          >
            <span style={{ color: "#3D0066" }}>FLYNK</span>
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white px-4 py-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #7C3AED, #F59E0B)" }}
          >
            Book Free Trial
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-cobalt mb-4">
            The Journal
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-6">
            From the <span style={{ color: "#3D0066" }}>FLYNK</span> journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Stories, insights, and honest takes on home care, trust, and
            building a better kind of service.
          </p>
        </motion.div>

        <div className="space-y-16">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-border rounded-3xl overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
              data-ocid={`blog.card.${i + 1}`}
            >
              {/* Thumbnail */}
              <div className="h-48 relative overflow-hidden">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 600 200"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                  aria-label={post.title}
                >
                  <defs>
                    <linearGradient
                      id={`bg${i}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={post.gradientFrom} />
                      <stop offset="100%" stopColor={post.gradientTo} />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="200" fill={`url(#bg${i})`} />
                  <path
                    d="M100 50 Q200 10 300 60 Q380 100 320 160 Q240 200 160 170 Q60 140 100 50Z"
                    fill="white"
                    opacity="0.06"
                  />
                  <path
                    d="M250 20 Q380 0 450 70 Q510 120 440 170 Q370 210 290 180 Q180 150 250 20Z"
                    fill="white"
                    opacity="0.05"
                  />
                  <text
                    x="50%"
                    y="50%"
                    fontSize="64"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {post.emoji}
                  </text>
                </svg>
              </div>

              <div className="p-8 lg:p-10 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-cobalt border border-primary/20">
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-foreground mb-4 leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line text-sm border-t border-border pt-6">
                  {post.content.trim()}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FLYNK — Built with ❤️ in Bengaluru
        </p>
      </footer>
    </div>
  );
}
