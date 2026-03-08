import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: March 2025
          </p>

          <div className="prose prose-neutral max-w-none space-y-8">
            {[
              {
                heading: "1. Information We Collect",
                body: "When you join the flynk. waitlist, we collect your name, WhatsApp number, email address, home type, and preferred start date. We also collect anonymous usage data to improve our service.",
              },
              {
                heading: "2. How We Use Your Information",
                body: "We use your contact information solely to communicate with you about flynk. services, waitlist status, and updates relevant to your area (560077). We do not sell your data to third parties.",
              },
              {
                heading: "3. WhatsApp Communication",
                body: "By joining our waitlist, you consent to receive WhatsApp messages from flynk. regarding your subscription and service updates. You can opt out at any time by messaging STOP.",
              },
              {
                heading: "4. Data Storage",
                body: "Your data is stored securely on the Internet Computer blockchain — a decentralized, tamper-resistant platform. We do not store passwords. We do not store payment information on our servers.",
              },
              {
                heading: "5. Data Retention",
                body: "We retain your data for as long as you are a flynk. customer or waitlist member. You may request deletion of your data at any time by emailing hello@getflynk.in.",
              },
              {
                heading: "6. Cookies",
                body: "Our website uses minimal cookies for session management and analytics. We do not use tracking cookies for advertising purposes.",
              },
              {
                heading: "7. Contact",
                body: "For privacy-related requests, contact us at hello@getflynk.in or message us on WhatsApp.",
              },
            ].map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-xl text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} flynk. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
