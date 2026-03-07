import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
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
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: March 2025
          </p>

          <div className="prose prose-neutral max-w-none space-y-8">
            {[
              {
                heading: "1. Service Overview",
                body: "flynk. provides a daily home cleaning subscription service in Bengaluru, India. The service is currently available only in pincode 560045. By joining the waitlist or subscribing, you agree to these terms.",
              },
              {
                heading: "2. Subscription Terms",
                body: "flynk. subscriptions require a minimum 3-month commitment. The early bird price of ₹4,999/month is locked for life for waitlist subscribers, provided the subscription remains active. Cancellation before 3 months may incur a fee.",
              },
              {
                heading: "3. Service Scope",
                body: "The standard plan includes: daily sweeping, mopping, bathroom basic clean, dishes and utensil washing, light dusting, and light tidying. Cooking, childcare, and elder care are not included in the standard plan and will be offered as separate add-on services in the future.",
              },
              {
                heading: "4. Flynk Assignment",
                body: "flynk. will assign a trained, certified Flynk to your home. In cases of absence, a Shadow Flynk will be deployed. flynk. reserves the right to reassign Flynks in exceptional circumstances, with advance notice provided when possible.",
              },
              {
                heading: "5. Pricing",
                body: "The standard price post-launch is ₹6,999/month. Early bird subscribers who joined via the waitlist will receive their locked rate permanently. Prices for future add-on services will be announced separately.",
              },
              {
                heading: "6. Customer Responsibilities",
                body: "Customers are responsible for providing safe working conditions for Flynks, including access to water and appropriate cleaning supplies (unless otherwise arranged). Customers must provide at least 24 hours notice for schedule changes.",
              },
              {
                heading: "7. Liability",
                body: "flynk. carries insurance for Flynks operating in your home. In the event of accidental damage, please contact us at hello@flynknow.com within 24 hours. flynk. is not liable for pre-existing damage or items that were improperly secured.",
              },
              {
                heading: "8. Termination",
                body: "Either party may terminate the subscription with 30 days written notice after the initial 3-month period. flynk. reserves the right to terminate service for violation of these terms or conduct that endangers Flynk safety.",
              },
              {
                heading: "9. Contact",
                body: "For service questions or disputes, contact hello@flynknow.com.",
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
