import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Menu, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SiInstagram, SiLinkedin, SiWhatsapp, SiX } from "react-icons/si";
import { HomeType } from "./backend.d";
import { useActor } from "./hooks/useActor";
import { AcademyPage } from "./pages/AcademyPage";
import { AdminPage } from "./pages/AdminPage";
import { BlogPage } from "./pages/BlogPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";

// ─── Constants ──────────────────────────────────────────────────────────────
const WA_NUMBER = "919535708093";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=Hi%20Flynk%2C%20I%20want%20to%20know%20more%20about%20the%20services.`;
const WA_TRIAL_LINK = `https://wa.me/${WA_NUMBER}?text=Hey%20Flynk%2C%20I%20want%20to%20start%207%20day%20free%20trial%20for%20my%20home.`;
const CURRENT_YEAR = new Date().getFullYear();

// ─── Waitlist Modal ──────────────────────────────────────────────────────────

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const handleTrialClick = () => {
    window.open(WA_TRIAL_LINK, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(8,6,16,0.75)",
          }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-ocid="waitlist.modal"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="w-full max-w-md rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(124,58,237,0.35)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.2), 0 0 60px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
              }}
            />

            {/* Atmospheric glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.14) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2
                    className="font-serif text-2xl"
                    style={{ color: "rgba(255,255,255,0.95)" }}
                  >
                    Start Your 7-Day Free Trial
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    No credit card. No commitment. Just a clean home.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={onClose}
                  data-ocid="waitlist.close_button"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <X
                    className="w-4 h-4"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  />
                </button>
              </div>

              <div className="py-4 text-center space-y-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                  }}
                >
                  🏠
                </div>
                <div>
                  <p
                    className="font-sans text-base leading-relaxed mb-1"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    Tap the button below to start your free trial on WhatsApp.
                    We'll confirm your slot within 2 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTrialClick}
                  data-ocid="trial.claim_button"
                  className="w-full h-14 rounded-full text-white font-semibold text-base btn-glow flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    border: "none",
                  }}
                  aria-label="Start 7-day free trial on WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                  Start My 7-Day Free Trial →
                </button>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  ✓ 7 days free · ✓ No card needed · ✓ Opens WhatsApp
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

interface NavbarProps {
  onWaitlist: () => void;
  onNavigate: (page: string) => void;
}

function Navbar({ onWaitlist, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Flynk Academy", action: () => onNavigate("academy") },
    { label: "Blog", action: () => onNavigate("blog") },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-1"
            aria-label="flynk home"
          >
            <span
              className="font-serif text-2xl font-bold tracking-tight"
              style={{ color: "#3D0066" }}
            >
              FLYNK
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.action}
                  data-ocid="nav.link"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ),
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-2 text-sm font-semibold border rounded-full px-4 py-2 transition-all duration-200 hover:bg-secondary"
              style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
            >
              <SiWhatsapp className="w-4 h-4" style={{ color: "#25D366" }} />
              WhatsApp Us
            </a>
            <button
              type="button"
              onClick={onWaitlist}
              data-ocid="nav.primary_button"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
              }}
              aria-label="Start your free trial with flynk."
            >
              Free Trial
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.hamburger_button"
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white/98 backdrop-blur-md overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      data-ocid="nav.link"
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      key={link.label}
                      type="button"
                      data-ocid="nav.link"
                      onClick={() => {
                        setMenuOpen(false);
                        link.action?.();
                      }}
                      className="px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-xl transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ),
                )}
                <div className="px-4 pt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onWaitlist();
                    }}
                    data-ocid="nav.primary_button"
                    className="w-full py-3 rounded-full text-white font-semibold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    }}
                  >
                    Free Trial
                  </button>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full border text-sm font-semibold text-center flex items-center justify-center gap-2"
                    style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <SiWhatsapp
                      className="w-4 h-4"
                      style={{ color: "#25D366" }}
                    />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onWaitlist }: { onWaitlist: () => void }) {
  return (
    <section
      id="hero"
      className="relative flex items-center pt-24 pb-16 lg:min-h-screen lg:pt-16 overflow-hidden"
      style={{ background: "#FAF8FF" }}
    >
      {/* Gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          animation: "pulse-blob 8s ease-in-out infinite",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          animation: "pulse-blob 8s ease-in-out infinite 2s",
          transformOrigin: "center",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border"
                style={{
                  borderColor: "#F59E0B",
                  color: "#F59E0B",
                  background: "rgba(245,158,11,0.06)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full badge-blink"
                  style={{
                    backgroundColor: "#22c55e",
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                />
                Now Live in Bengaluru 560077
              </span>
            </motion.div>

            {/* H1 — editorial scale */}
            <h1
              className="font-serif mb-7"
              style={{
                fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
                lineHeight: "0.97",
                letterSpacing: "-0.025em",
              }}
            >
              <span className="text-foreground block">A clean home.</span>
              <em
                className="block"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                Every single day.
              </em>
              <span className="text-foreground block">Guaranteed.</span>
            </h1>

            {/* Subtext */}
            <p
              className="font-sans text-xl text-muted-foreground leading-relaxed max-w-[460px] mb-8"
              style={{ letterSpacing: "-0.01em" }}
            >
              Same certified Flynk every day. Background verified. No hour-based
              billing.
            </p>

            {/* Price display */}
            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-border">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-sans uppercase tracking-wider text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.1em" }}
                >
                  Starting from
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-serif font-bold"
                    style={{
                      fontSize: "2.6rem",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    ₹4,999
                  </span>
                  <span className="font-sans text-muted-foreground text-base">
                    /month
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <del className="text-muted-foreground text-sm font-sans">
                  ₹6,999/month
                </del>
                <span
                  className="text-xs font-bold font-sans px-2.5 py-1 rounded-full w-fit"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    color: "#F59E0B",
                    border: "1px solid rgba(245,158,11,0.25)",
                  }}
                >
                  Early Bird Price
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <button
                type="button"
                onClick={onWaitlist}
                data-ocid="hero.primary_button"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white btn-glow transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                }}
                aria-label="Start your 7-day free trial — no card needed"
              >
                Start 7-Day Free Trial →
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border-2 transition-all duration-200 hover:bg-green-50"
                style={{ borderColor: "#25D366", color: "#25D366" }}
                aria-label="Chat with flynk. on WhatsApp"
              >
                <SiWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2">
              {[
                "✓ 7-Day Free Trial",
                "✓ Flynk Academy Certified",
                "✓ Background Verified",
                "✓ Shadow Flynk if Absent",
                "✓ No Hour-Based Billing",
              ].map((chip) => (
                <span
                  key={chip}
                  className="font-sans text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "rgba(124,58,237,0.3)",
                    color: "#7C3AED",
                    background: "rgba(124,58,237,0.04)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats / Trust card panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4"
          >
            {/* Hero photo placeholder */}
            <div
              className="col-span-2 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(245,158,11,0.08))",
                border: "2px dashed rgba(124,58,237,0.25)",
                minHeight: "200px",
                padding: "24px",
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  👩‍💼
                </div>
                <p
                  className="font-sans text-xs text-center leading-relaxed"
                  style={{
                    color: "#7A75A0",
                    fontStyle: "italic",
                    maxWidth: "260px",
                  }}
                >
                  [INSERT: Photo of Flynk professional at apartment door —
                  smiling, in uniform, holding ID card]
                </p>
              </div>
            </div>

            {/* Card 1: Pricing highlight */}
            <div
              className="col-span-2 flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(124,58,237,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                }}
                aria-hidden="true"
              >
                💰
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span
                    className="font-serif font-bold"
                    style={{
                      fontSize: "1.9rem",
                      lineHeight: 1,
                      background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ₹4,999
                  </span>
                  <span className="font-sans text-muted-foreground text-sm">
                    /mo
                  </span>
                </div>
                <p className="font-sans text-xs font-semibold text-foreground mt-0.5">
                  Standard plan
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  7-day free trial included
                </p>
              </div>
            </div>

            {/* Card 2: 6× / week */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(124,58,237,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(124,58,237,0.1)",
                }}
                aria-hidden="true"
              >
                📅
              </div>
              <div className="min-w-0">
                <p
                  className="font-serif font-bold"
                  style={{
                    fontSize: "1.35rem",
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  6× / week
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-snug">
                  Same Flynk every time
                </p>
              </div>
            </div>

            {/* Card 3: 100% verified */}
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(124,58,237,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(245,158,11,0.1)",
                }}
                aria-hidden="true"
              >
                🛡️
              </div>
              <div className="min-w-0">
                <p
                  className="font-serif font-bold"
                  style={{
                    fontSize: "1.35rem",
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  100% verified
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-snug">
                  Aadhaar + police check
                </p>
              </div>
            </div>

            {/* Card 4: Shadow Flynk */}
            <div
              className="col-span-2 flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid rgba(124,58,237,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(124,58,237,0.08)",
                }}
                aria-hidden="true"
              >
                ⚡
              </div>
              <div className="min-w-0">
                <p
                  className="font-serif font-bold"
                  style={{
                    fontSize: "1.1rem",
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  Shadow Flynk
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-snug">
                  Backup deployed instantly if regular Flynk is absent
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Scrolling Ticker ────────────────────────────────────────────────────────

function Ticker() {
  const tickerText =
    "✦ Same Flynk Every Day | Flynk Academy Certified | ✦ Shadow Flynk if Absent | No Hourly Billing | ✦ Background Verified Flynks | Live in Bengaluru 560077 | ✦ ₹4,999 Launch Price | 100% Trust Guaranteed | ";
  const doubled = tickerText + tickerText;

  return (
    <div
      className="w-full py-3.5 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #7C3AED, #F59E0B)" }}
      aria-label="flynk. key features"
    >
      <div className="ticker-track">
        <span className="font-sans text-sm font-bold text-white">
          {doubled}
        </span>
      </div>
    </div>
  );
}

// ─── Service Chips Row ────────────────────────────────────────────────────────

function ServiceChipsRow() {
  const chips = [
    { emoji: "🧹", label: "Sweeping", bg: "rgba(124,58,237,0.10)" },
    { emoji: "🪣", label: "Mopping", bg: "rgba(245,158,11,0.10)" },
    { emoji: "🚿", label: "Bathroom", bg: "rgba(124,58,237,0.07)" },
    { emoji: "🍽️", label: "Dishes", bg: "rgba(124,58,237,0.07)" },
    { emoji: "✨", label: "Dusting", bg: "rgba(245,158,11,0.07)" },
    { emoji: "🏠", label: "Tidying", bg: "rgba(124,58,237,0.05)" },
  ];

  return (
    <section
      className="py-10 bg-white"
      id="service-chips"
      aria-label="Service categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <p
            className="font-sans text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#7C3AED" }}
          >
            Services
          </p>
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Everything your home needs. Daily.
          </h2>
        </div>

        {/* Chips scroll container */}
        <ul
          className="chips-scroll-container"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: "12px",
            paddingBottom: "8px",
            justifyContent: "center",
            flexWrap: "nowrap",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
          aria-label="Service chips"
        >
          {chips.map((chip) => (
            <motion.li
              key={chip.label}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{
                flexShrink: 0,
                width: "120px",
                height: "140px",
                borderRadius: "16px",
                background: chip.bg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                scrollSnapAlign: "start",
                cursor: "default",
              }}
            >
              <span
                style={{ fontSize: "32px", lineHeight: 1 }}
                role="img"
                aria-label={chip.label}
              >
                {chip.emoji}
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0C0A14",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {chip.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      emoji: "🏠",
      title: "Tell us about your home",
      desc: "WhatsApp us or fill the waitlist form. Tell us your home size, schedule preference, and pincode.",
    },
    {
      num: "02",
      emoji: "🔍",
      title: "We match your Flynk",
      desc: "We assign a trained, certified, background-verified Flynk who lives nearby.",
    },
    {
      num: "03",
      emoji: "🤝",
      title: "Meet & love",
      desc: "Your Flynk arrives for your first morning. You meet her. Subscription begins.",
    },
    {
      num: "04",
      emoji: "✨",
      title: "Come home to clean",
      desc: "Every day. Same Flynk. Same time. No surprises.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C3AED" }}
          >
            Simple · Transparent · Reliable
          </p>
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            How <span style={{ color: "#3D0066" }}>FLYNK</span> works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line desktop */}
          <div
            className="hidden lg:block absolute top-16 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #EDE8FA 20%, #EDE8FA 80%, transparent)",
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotateY: 3, rotateX: -2, y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              data-ocid={`how_it_works.item.${i + 1}`}
            >
              <div className="border border-border rounded-2xl p-7 h-full flex flex-col gap-4 bg-white hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{step.emoji}</div>
                  <span
                    className="font-serif text-5xl font-bold leading-none"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
  const services = [
    {
      emoji: "🧹",
      title: "Sweeping & Mopping",
      desc: "All floors. Every day. Pristine.",
      color: "#7C3AED",
    },
    {
      emoji: "🚿",
      title: "Bathroom Basic Clean",
      desc: "Sink, toilet seat, floor wipe. Fresh every morning.",
      color: "#F59E0B",
    },
    {
      emoji: "🍽️",
      title: "Dishes & Utensils",
      desc: "Washed, dried, put away. No pile-ups.",
      color: "#7C3AED",
    },
    {
      emoji: "✨",
      title: "Light Dusting",
      desc: "Surfaces, shelves, furniture. Done before you notice.",
      color: "#F59E0B",
    },
    {
      emoji: "🏠",
      title: "Light Tidying",
      desc: "Home reset. Everything in its place.",
      color: "#7C3AED",
    },
    {
      emoji: "➕",
      title: "Upcoming Add-Ons",
      desc: "Cooking prep, laundry, deep clean — coming soon as we expand.",
      color: "#7A75A0",
      comingSoon: true,
    },
    {
      emoji: "🍳",
      title: "Cooking Assistance",
      desc: "Basic South and North Indian cooking — launching soon.",
      color: "#F59E0B",
      comingSoon: true,
    },
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-28"
      style={{ background: "#FAF8FF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C3AED" }}
          >
            Daily · Reliable · Comprehensive
          </p>
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Everything included. Every day.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                delay: i * 0.08,
              }}
              data-ocid={`services.card.${i + 1}`}
            >
              <div className="service-card rounded-2xl p-7 h-full flex flex-col gap-4 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-white border border-border shadow-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${service.color}12`,
                  }}
                >
                  {service.emoji}
                </div>
                <div>
                  <h3
                    className="font-serif text-lg mb-1.5"
                    style={{ color: "#0C0A14" }}
                  >
                    {service.title}
                  </h3>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                {service.comingSoon && (
                  <span
                    className="font-sans text-xs font-bold px-2.5 py-1 rounded-full w-fit"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      color: "#F59E0B",
                      border: "1px solid rgba(245,158,11,0.25)",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────

function CheckIcon({ id }: { id: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="9" fill={`url(#cg-${id})`} opacity="0.18" />
      <path
        d="M5 9l3 3 5-5"
        stroke={`url(#cg2-${id})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={`cg-${id}`} x1="0" y1="0" x2="18" y2="18">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={`cg2-${id}`} x1="0" y1="0" x2="18" y2="18">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type BillingCycle = "monthly" | "quarterly" | "halfyearly" | "yearly";

const BILLING_OPTIONS: {
  key: BillingCycle;
  label: string;
  discount: number;
  saveBadge: string;
  note: string;
}[] = [
  { key: "monthly", label: "Monthly", discount: 0, saveBadge: "", note: "" },
  {
    key: "quarterly",
    label: "Quarterly",
    discount: 8,
    saveBadge: "Save 8%",
    note: "Billed every 3 months",
  },
  {
    key: "halfyearly",
    label: "Half Yearly",
    discount: 15,
    saveBadge: "Save 15%",
    note: "Billed every 6 months",
  },
  {
    key: "yearly",
    label: "Yearly",
    discount: 25,
    saveBadge: "Save 25%",
    note: "Billed annually",
  },
];

function applyDiscount(base: number, discount: number): string {
  const final = Math.round(base * (1 - discount / 100));
  return `₹${final.toLocaleString("en-IN")}`;
}

function PricingSection({ onWaitlist }: { onWaitlist: () => void }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const starterFeatures = [
    "Daily home sweeping (all floors)",
    "Daily mopping (all floors)",
    "Bathroom basic clean",
    "Dishes and utensil washing",
    "Light dusting",
  ];

  const standardFeatures = [
    "Everything in Starter",
    "Light tidying and home reset",
    "Same certified Flynk every day",
    "Shadow Flynk if regular is absent",
    "No hour-based billing — ever",
  ];

  const plusFeatures = [
    "Everything in Standard",
    "Priority scheduling",
    "Extended cleaning time (up to 3 hours)",
    "Deep clean monthly",
    "Dedicated account manager",
  ];

  return (
    <section
      id="pricing"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#12101A" }}
    >
      {/* Atmospheric depth: radial cobalt glow behind the cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.18) 0%, rgba(245,158,11,0.06) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center p-1 rounded-full gap-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {BILLING_OPTIONS.map((opt) => {
              const isActive = billingCycle === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setBillingCycle(opt.key)}
                  data-ocid={`pricing.${opt.key}_toggle`}
                  className="px-4 py-2 rounded-full text-sm font-semibold font-sans transition-all duration-200 flex items-center gap-1.5"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, #7C3AED, #F59E0B)",
                          color: "white",
                        }
                      : { color: "rgba(255,255,255,0.5)" }
                  }
                >
                  {opt.label}
                  {opt.saveBadge && (
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-full hidden sm:inline"
                      style={{
                        background: isActive
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(245,158,11,0.2)",
                        color: isActive ? "white" : "#F59E0B",
                      }}
                    >
                      {opt.saveBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active billing period note */}
        {billingCycle !== "monthly" && (
          <div className="flex justify-center mb-4">
            <p className="font-sans text-sm" style={{ color: "#F59E0B" }}>
              {BILLING_OPTIONS.find((o) => o.key === billingCycle)?.note} —{" "}
              {BILLING_OPTIONS.find((o) => o.key === billingCycle)?.saveBadge}
            </p>
          </div>
        )}

        {/* Free trial banner strip */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold font-sans"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#F59E0B",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg,#7C3AED,#F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ✦
            </span>
            7-Day Free Trial on All Plans — No Credit Card Required
            <span
              style={{
                background: "linear-gradient(135deg,#7C3AED,#F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ✦
            </span>
          </div>
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#F59E0B" }}
          >
            Early Bird — 560077 Only
          </p>
          <h2
            className="font-serif text-white"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}
          >
            Simple pricing.
            <br />
            No surprises.
          </h2>
        </motion.div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-center">
          {/* ── Starter ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.0 }}
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="p-7">
              <p className="font-sans text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                Starter
              </p>
              <p className="font-sans text-white/40 text-xs mb-3">
                6 days/week
              </p>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="font-serif text-white"
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {applyDiscount(
                    3999,
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.discount ?? 0,
                  )}
                </span>
                <span className="font-sans text-white/40 text-sm mb-1">
                  /mo
                </span>
              </div>
              {billingCycle !== "monthly" && (
                <p
                  className="font-sans text-xs mb-2"
                  style={{ color: "#F59E0B" }}
                >
                  {BILLING_OPTIONS.find((o) => o.key === billingCycle)?.note} —{" "}
                  {
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.saveBadge
                  }
                </p>
              )}
              <p className="font-sans text-white/35 text-xs mb-7">
                3-month minimum
              </p>

              <div className="space-y-3 mb-8">
                {starterFeatures.map((f, i) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckIcon id={`starter-${i}`} />
                    <span className="font-sans text-sm text-white/65 leading-relaxed">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onWaitlist}
                data-ocid="pricing.starter_button"
                className="w-full py-3.5 rounded-full text-white font-semibold font-sans text-sm transition-all duration-200 hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-label="Start your free trial on the Starter plan"
              >
                Start Free Trial →
              </button>
              <p className="font-sans text-xs text-center text-white/40 mt-2">
                7 days free · No card needed
              </p>
            </div>
          </motion.div>

          {/* ── Standard (Most Popular) ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotateX: 0, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="rounded-2xl overflow-hidden relative lg:-my-5"
            style={{
              transform: "perspective(1000px) rotateX(2deg)",
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(124,58,237,0.35)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,58,237,0.2), 0 0 60px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Gradient top border */}
            <div
              className="h-[3px] w-full"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
              }}
            />

            <div className="p-7 lg:p-8">
              {/* Most Popular badge */}
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans text-white/50 text-xs font-semibold uppercase tracking-widest">
                  Standard
                </p>
                <span
                  className="font-sans text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(245,158,11,0.15)",
                    color: "#F59E0B",
                    border: "1px solid rgba(245,158,11,0.35)",
                  }}
                >
                  Most Popular
                </span>
              </div>
              <p className="font-sans text-white/40 text-xs mb-3">
                6 days/week
              </p>

              <div className="flex items-end gap-2 mb-1">
                <span
                  className="font-serif"
                  style={{
                    fontSize: "3.6rem",
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {applyDiscount(
                    4999,
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.discount ?? 0,
                  )}
                </span>
                <span className="font-sans text-white/40 text-sm mb-1">
                  /mo
                </span>
              </div>
              {billingCycle !== "monthly" && (
                <p
                  className="font-sans text-xs mb-2"
                  style={{ color: "#F59E0B" }}
                >
                  {BILLING_OPTIONS.find((o) => o.key === billingCycle)?.note} —{" "}
                  {
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.saveBadge
                  }
                </p>
              )}
              {billingCycle === "monthly" && (
                <div className="flex items-center gap-2 mb-1">
                  <del className="font-sans text-white/30 text-xs">
                    ₹6,999/mo after launch
                  </del>
                  <span
                    className="font-sans text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(245,158,11,0.12)",
                      color: "#F59E0B",
                      border: "1px solid rgba(245,158,11,0.25)",
                    }}
                  >
                    Save ₹2,000/mo
                  </span>
                </div>
              )}
              <p className="font-sans text-white/35 text-xs mb-7">
                3-month minimum
              </p>

              <div className="space-y-3 mb-8">
                {standardFeatures.map((f, i) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckIcon id={`standard-${i}`} />
                    <span className="font-sans text-sm text-white/80 leading-relaxed">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onWaitlist}
                data-ocid="pricing.primary_button"
                className="w-full py-4 rounded-full text-white font-semibold font-sans text-sm btn-glow transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                }}
                aria-label="Start your free trial on the Standard plan"
              >
                Start Free Trial →
              </button>
              <p className="font-sans text-xs text-center text-white/35 mt-3">
                ✓ 7 days free · No card needed · Early bird rate locked for life
              </p>
            </div>
          </motion.div>

          {/* ── Plus ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="p-7">
              <p className="font-sans text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                Plus
              </p>
              <p className="font-sans text-white/40 text-xs mb-3">
                6 days/week
              </p>
              <div className="flex items-end gap-2 mb-1">
                <span
                  className="font-serif text-white"
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {applyDiscount(
                    6999,
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.discount ?? 0,
                  )}
                </span>
                <span className="font-sans text-white/40 text-sm mb-1">
                  /mo
                </span>
              </div>
              {billingCycle !== "monthly" && (
                <p
                  className="font-sans text-xs mb-2"
                  style={{ color: "#F59E0B" }}
                >
                  {BILLING_OPTIONS.find((o) => o.key === billingCycle)?.note} —{" "}
                  {
                    BILLING_OPTIONS.find((o) => o.key === billingCycle)
                      ?.saveBadge
                  }
                </p>
              )}
              <p className="font-sans text-white/35 text-xs mb-7">
                3-month minimum
              </p>

              <div className="space-y-3 mb-8">
                {plusFeatures.map((f, i) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckIcon id={`plus-${i}`} />
                    <span className="font-sans text-sm text-white/65 leading-relaxed">
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onWaitlist}
                data-ocid="pricing.plus_button"
                className="w-full py-3.5 rounded-full text-white font-semibold font-sans text-sm transition-all duration-200 hover:opacity-80"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                aria-label="Start your free trial on the Plus plan"
              >
                Start Free Trial →
              </button>
              <p className="font-sans text-xs text-center text-white/40 mt-2">
                7 days free · No card needed
              </p>
            </div>
          </motion.div>
        </div>

        {/* Custom plans note */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-sans text-sm text-center mt-8 lg:mt-10"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          Larger homes? Villa or penthouse? Plans up to ₹19,999/month —{" "}
          <a
            href="https://wa.me/919535708093?text=Hi%20flynk!%20I%27m%20interested%20in%20a%20custom%20plan%20for%20a%20larger%20home."
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="pricing.whatsapp_link"
            className="font-semibold underline underline-offset-2 transition-opacity duration-150 hover:opacity-80"
            style={{ color: "#F59E0B" }}
            aria-label="WhatsApp us for a custom plan for larger homes"
          >
            WhatsApp us for a custom match.
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Why flynk. ───────────────────────────────────────────────────────────────

function WhyFlynkSection({ onWaitlist }: { onWaitlist: () => void }) {
  const reasons = [
    {
      num: "01",
      title: "Same Flynk. Always.",
      desc: "No strangers at your door. Your assigned Flynk learns your home and routines. You build real trust.",
    },
    {
      num: "02",
      title: "Shadow Flynk guarantee",
      desc: "If your Flynk is ever absent, a backup Shadow Flynk is deployed immediately. Zero disruption.",
    },
    {
      num: "03",
      title: "No hourly billing. Ever.",
      desc: "Cleaning takes longer some days. The price stays the same. We absorb the variance, not you.",
    },
    {
      num: "04",
      title: "Flynk Academy trained",
      desc: "Every Flynk completes a rigorous training programme before they enter your home. Not hired off the street.",
    },
    {
      num: "05",
      title: "Full background verification",
      desc: "Aadhaar + police check + reference check. Every Flynk. No exceptions.",
    },
    {
      num: "06",
      title: "One pincode at a time",
      desc: "We launch one pincode at a time — never stretching thin. Quality over scale.",
    },
  ];

  return (
    <section id="why-flynk" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C3AED" }}
          >
            Six reasons. Zero compromises.
          </p>
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Why choose <span style={{ color: "#3D0066" }}>FLYNK</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, rotateY: 2 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-ocid={`why_flynk.card.${i + 1}`}
            >
              <div
                className="group rounded-2xl p-7 h-full flex flex-col gap-4 border border-border bg-white hover:border-cobalt transition-all duration-300 hover:shadow-card-hover cursor-default"
                style={{ "--cobalt-border": "#7C3AED" } as React.CSSProperties}
              >
                <span
                  className="font-serif text-4xl font-bold leading-none"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {reason.num}
                </span>
                <h3 className="font-serif text-lg text-foreground">
                  {reason.title}
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            type="button"
            onClick={onWaitlist}
            data-ocid="why_flynk.primary_button"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-white btn-glow transition-all duration-200 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
            }}
            aria-label="Start your 7-day free trial"
          >
            Start Your Free 7-Day Trial →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    {
      value: "6×",
      label: "Weekly visits",
      bg: "rgba(124,58,237,0.06)",
      gradientFrom: "#7C3AED",
      gradientTo: "#F59E0B",
    },
    {
      value: "100%",
      label: "Trust guaranteed",
      bg: "rgba(245,158,11,0.06)",
      gradientFrom: "#F59E0B",
      gradientTo: "#7C3AED",
    },
    {
      value: "₹166/day",
      label: "Daily cost",
      bg: "rgba(18,16,26,0.06)",
      gradientFrom: "#7C3AED",
      gradientTo: "#12101A",
    },
  ];

  return (
    <section
      className="py-16"
      style={{ background: "#FAF8FF" }}
      aria-label="Key statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: i * 0.1,
              }}
              data-ocid={`stats.card.${i + 1}`}
            >
              <div
                style={{
                  borderRadius: "24px",
                  padding: "32px 24px",
                  textAlign: "center",
                  background: stat.bg,
                  transform: "perspective(600px) rotateX(2deg)",
                  transition: "transform 0.3s ease",
                }}
                className="stats-card"
              >
                <span
                  className="font-serif block"
                  style={{
                    fontSize: "56px",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <p
                  className="font-sans mt-2"
                  style={{ fontSize: "14px", color: "#7A75A0" }}
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Flynk Academy ────────────────────────────────────────────────────────────

function AcademySectionPreview({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const steps = [
    {
      num: "01",
      title: "Training Programme",
      desc: "5-day intensive training programme. Tested and certified.",
    },
    {
      num: "02",
      title: "Background Check",
      desc: "Aadhaar verification, police clearance, reference check. Non-negotiable.",
    },
    {
      num: "03",
      title: "Communication Skills",
      desc: "Trained to communicate professionally and respectfully with households.",
    },
    {
      num: "04",
      title: "Certification",
      desc: "Only Flynks who pass all assessments are deployed to your home.",
    },
    {
      num: "05",
      title: "Monthly Re-Assessment",
      desc: "Ongoing quality checks. Standards maintained, not just promised.",
    },
  ];

  return (
    <section
      id="flynk-academy"
      className="py-20 lg:py-28"
      style={{ background: "#F3F0FA" }}
      data-ocid="academy.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Certificate visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <span
                className="font-sans text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  color: "#7C3AED",
                }}
              >
                Bengaluru's Most Rigorous Home Helper Training Programme
              </span>
            </div>
            <h2
              className="font-serif text-foreground mb-6"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              The Flynk Academy
            </h2>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
              Every Flynk who enters your home has completed our comprehensive
              training programme. Not a 2-hour orientation. A rigorous 5-day
              intensive training programme.
            </p>

            {/* Certificate card */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div className="absolute top-6 right-6 w-24 h-24 rounded-full border-2 border-white" />
                <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full border border-white" />
              </div>
              <div className="relative z-10 text-center">
                <svg
                  width="160"
                  height="112"
                  viewBox="0 0 200 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                  role="img"
                  aria-label="Flynk Academy certificate badge"
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
                  <circle cx="82" cy="72" r="2" fill="white" opacity="0.7" />
                  <text x="85" y="100" fontSize="12" fill="white" opacity="0.7">
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
                <p className="font-serif text-xl text-white mb-1">
                  Certificate of Completion
                </p>
                <p className="font-sans text-white/60 text-sm">
                  Flynk Academy — Bengaluru
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("academy")}
              className="mt-6 font-sans text-sm font-semibold underline underline-offset-4 transition-colors"
              style={{ color: "#7C3AED" }}
              data-ocid="academy.secondary_button"
            >
              Learn more about Flynk Academy →
            </button>
          </motion.div>

          {/* Right: Steps */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-0"
          >
            {steps.map((step, i) => (
              <div key={step.num} className="relative pl-14 pb-8 last:pb-0">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-8 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
                )}
                <div
                  className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs font-sans"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    {
      stars: 5,
      quote:
        "Finally a service that actually shows up every single morning. My Flynk knows exactly how I like the kitchen. It feels like having someone you actually trust.",
      initials: "SR",
      name: "Smitha R.",
      location: "Thanisandra, Bengaluru",
      color: "#7C3AED",
    },
    {
      stars: 5,
      quote:
        "The Shadow Flynk guarantee is real — our regular was sick once and someone showed up within the hour. No panic. No scrambling.",
      initials: "KM",
      name: "Karthik M.",
      location: "Manyata Tech Park Area, Bengaluru",
      color: "#F59E0B",
    },
    {
      stars: 5,
      quote:
        "₹4,999 sounds like a lot until you realise it is ₹166 a day for a clean home and a person your family actually trusts. Best decision this year.",
      initials: "DS",
      name: "Deepa S.",
      location: "Thanisandra, Bengaluru",
      color: "#12101A",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Real homes. Real trust.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`testimonials.card.${i + 1}`}
            >
              <div
                className="testimonial-card h-full flex flex-col gap-4"
                style={{
                  background: "white",
                  border: "1.5px solid #EAE6F5",
                  borderRadius: "20px",
                  padding: "28px",
                }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center text-white font-sans font-bold"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    fontSize: "16px",
                    background:
                      i === 0
                        ? "linear-gradient(135deg, #7C3AED, #F59E0B)"
                        : i === 1
                          ? "linear-gradient(135deg, #F59E0B, #7C3AED)"
                          : "linear-gradient(135deg, #12101A, #7C3AED)",
                  }}
                >
                  {t.initials}
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {["s1", "s2", "s3", "s4", "s5"]
                    .slice(0, t.stars)
                    .map((key) => (
                      <Star
                        key={key}
                        className="w-4 h-4 fill-current"
                        style={{ color: "#FFB800" }}
                      />
                    ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="font-sans flex-1"
                  style={{
                    fontStyle: "italic",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "#0C0A14",
                  }}
                >
                  "{t.quote}"
                </blockquote>

                {/* Name + locality */}
                <div>
                  <p
                    className="font-sans"
                    style={{
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "#0C0A14",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: "11px", color: "#7A75A0" }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-sans text-center mt-8"
          style={{ fontSize: "13px", color: "#7A75A0", fontStyle: "italic" }}
        >
          *Early subscriber feedback from beta trial families
        </motion.p>
      </div>
    </section>
  );
}

// ─── Waitlist Banner ──────────────────────────────────────────────────────────

function WaitlistBanner() {
  const [bannerPhone, setBannerPhone] = useState("");
  const [bannerSubmitted, setBannerSubmitted] = useState(false);
  const { actor } = useActor();

  const handleBannerSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!bannerPhone) return;
      try {
        if (actor) {
          await actor.addWaitlistEntry(
            "",
            bannerPhone,
            "",
            "Bengaluru",
            HomeType.TwoBHK,
            BigInt(0),
            BigInt(2),
            BigInt(0),
            BigInt(0),
            "",
          );
        } else {
          console.log("Banner waitlist:", { phone: bannerPhone });
        }
      } catch {
        // silent
      }
      setBannerSubmitted(true);
    },
    [actor, bannerPhone],
  );

  return (
    <section id="waitlist" className="py-20 lg:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
        }}
        aria-hidden="true"
      />
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold text-white select-none"
          style={{
            fontSize: "clamp(8rem, 20vw, 18rem)",
            opacity: 0.06,
            letterSpacing: "-0.05em",
          }}
        >
          560077
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-serif text-white mb-4"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            We're live now in Bengaluru 560077
          </h2>
          <p className="font-sans text-white/80 text-lg mb-10">
            Early bird price: ₹4,999/month — once we go public it's
            ₹6,999/month.
            <br />
            Lock your rate now.
          </p>

          {bannerSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-8 py-5"
            >
              <span className="text-2xl">🎉</span>
              <p className="font-sans text-white font-semibold">
                You're on the list! We'll WhatsApp you soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleBannerSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="tel"
                placeholder="Your WhatsApp number"
                value={bannerPhone}
                onChange={(e) => setBannerPhone(e.target.value)}
                required
                data-ocid="waitlist.phone_input"
                className="flex-1 h-14 rounded-full bg-white border-0 px-6 text-foreground placeholder:text-muted-foreground font-sans"
              />
              <button
                type="submit"
                data-ocid="waitlist.submit_button"
                className="h-14 px-7 rounded-full font-semibold font-sans text-white whitespace-nowrap transition-all duration-200 hover:opacity-90"
                style={{ background: "#12101A" }}
                aria-label="Reserve my spot on the flynk. waitlist"
              >
                Reserve My Spot →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────

function BlogPreviewSection({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const posts = [
    {
      gradientFrom: "#7C3AED",
      gradientTo: "#F59E0B",
      emoji: "💰",
      tag: "Pricing",
      title:
        "Why flynk. costs ₹4,999 — and why Urban Company costs more in the long run",
      excerpt:
        "On-demand apps charge ₹300–500 per visit. Daily. That's ₹9,000–15,000/month. flynk. gives you daily service at nearly half the cost.",
      readTime: "5 min read",
    },
    {
      gradientFrom: "#F59E0B",
      gradientTo: "#7C3AED",
      emoji: "🎓",
      tag: "Inside flynk.",
      title: "Inside the Flynk Academy: How we train and certify every helper",
      excerpt:
        "We don't hire off the street. Every Flynk spends two weeks in structured training before they ever enter a home.",
      readTime: "4 min read",
    },
    {
      gradientFrom: "#12101A",
      gradientTo: "#7C3AED",
      emoji: "📍",
      tag: "Cities",
      title: "Why we chose 560077 first — and what it means for Bengaluru",
      excerpt:
        "We could have launched across 50 pincodes. We chose one. Here's why quality-first matters more than scale.",
      readTime: "3 min read",
    },
  ];

  return (
    <section
      id="blog"
      className="py-20 lg:py-28"
      style={{ background: "#FAF8FF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            From the <span style={{ color: "#3D0066" }}>FLYNK</span> journal
          </h2>
          <button
            type="button"
            onClick={() => onNavigate("blog")}
            className="font-sans text-sm font-semibold underline underline-offset-4 whitespace-nowrap ml-8"
            style={{ color: "#7C3AED" }}
            data-ocid="blog.link"
          >
            View all posts →
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`blog.card.${i + 1}`}
              onClick={() => onNavigate("blog")}
              className="cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="h-40 relative overflow-hidden flex-shrink-0">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 160"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    role="img"
                    aria-label={post.title}
                  >
                    <defs>
                      <linearGradient
                        id={`grad${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={post.gradientFrom} />
                        <stop offset="100%" stopColor={post.gradientTo} />
                      </linearGradient>
                    </defs>
                    <rect width="300" height="160" fill={`url(#grad${i})`} />
                    <path
                      d="M80 40 Q140 10 200 60 Q240 100 180 140 Q120 170 70 130 Q20 90 80 40Z"
                      fill="white"
                      opacity="0.07"
                    />
                    <path
                      d="M150 10 Q210 0 250 50 Q290 90 240 130 Q190 160 150 140 Q90 120 120 60 Q140 20 150 10Z"
                      fill="white"
                      opacity="0.05"
                    />
                    <text
                      x="50%"
                      y="50%"
                      fontSize="48"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {post.emoji}
                    </text>
                  </svg>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-sans text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(124,58,237,0.08)",
                        color: "#7C3AED",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="font-sans text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const faqs = [
    {
      q: "How does the 7-day free trial work?",
      a: "We send a certified Flynk to your home for 7 consecutive days, completely free. No credit card, no upfront payment, no commitment. After the trial, if you'd like to continue, you simply choose a plan. If not, there's nothing to cancel and nothing to pay.",
    },
    {
      q: "What happens if my Flynk is absent?",
      a: "A Shadow Flynk is deployed to your home immediately — no gaps, no scrambling. We maintain a roster of backup Flynks for every area we serve.",
    },
    {
      q: "Do you charge by the hour?",
      a: "Never. Your monthly price is fixed regardless of how long cleaning takes on any given day. If we're slower some days, that's our problem, not yours.",
    },
    {
      q: "Can I request the same time slot every day?",
      a: "Yes. You pick your preferred arrival window when you subscribe. Your Flynk shows up at the same time every day.",
    },
    {
      q: "Is flynk. available in my area?",
      a: "We're currently live only in Bengaluru 560077. We're expanding one pincode at a time — join the waitlist for your area and we'll notify you first.",
    },
    {
      q: "What does Flynk Academy certification mean?",
      a: "Every Flynk completes a 5-day intensive training programme covering cleaning techniques, safety protocols, communication standards, and professionalism. Only those who pass are deployed.",
    },
    {
      q: "Does it include cooking or childcare?",
      a: "Not currently — those are upcoming add-on services as we expand. The current plan covers daily cleaning: sweeping, mopping, bathroom, dishes, dusting, and tidying.",
    },
    {
      q: "What is the early bird price and when does it expire?",
      a: "The early bird price is ₹4,999/month — available only for the 560077 waitlist. Once we launch publicly, the standard price will be ₹6,999/month. Your rate is locked for life as long as you stay subscribed.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-foreground"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Questions? We've got answers.
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`faq-${i}`}
              data-ocid={`faq.item.${i + 1}`}
              className="border border-border rounded-2xl px-6 py-1 bg-white hover:border-cobalt transition-colors data-[state=open]:border-cobalt overflow-hidden"
              style={{ "--cobalt": "#7C3AED" } as React.CSSProperties}
            >
              <AccordionTrigger
                className="font-serif text-lg text-foreground text-left py-6 hover:no-underline"
                style={{ color: "inherit" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-base text-muted-foreground leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="font-sans text-base text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hi%20Flynk%2C%20I%20want%20to%20know%20more%20about%20the%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="faq.whatsapp_button"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border-2 transition-all duration-200 hover:bg-green-50"
            style={{ borderColor: "#25D366", color: "#25D366" }}
            aria-label="Chat with flynk. on WhatsApp"
          >
            <SiWhatsapp className="w-5 h-5" />
            Chat with us on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface FooterProps {
  onWaitlist: () => void;
  onNavigate: (page: string) => void;
}

function Footer({ onWaitlist, onNavigate }: FooterProps) {
  return (
    <footer style={{ background: "#0C0A14" }} data-ocid="footer.section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-0.5">
              <span
                className="font-serif text-2xl font-bold"
                style={{ color: "#3D0066" }}
              >
                FLYNK
              </span>
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed">
              A clean home. Every single day. Guaranteed.
            </p>
            <p className="font-sans text-xs text-white/30">
              Currently serving: Bengaluru 560077
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: SiX, href: "https://x.com", label: "X (Twitter)" },
                {
                  icon: SiLinkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: SiInstagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                { icon: SiWhatsapp, href: WA_LINK, label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Flynk Academy", action: () => onNavigate("academy") },
                { label: "Blog", action: () => onNavigate("blog") },
                { label: "About FLYNK", href: "#hero" },
              ].map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={item.action}
                      className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {item.label}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Sweeping & Mopping",
                "Bathroom Clean",
                "Dishes",
                "Dusting",
                "Tidying",
                "Upcoming Add-Ons",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={onWaitlist}
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Join Waitlist
                </button>
              </li>
              <li>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@getflynk.in"
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  hello@getflynk.in
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  FAQ
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("privacy")}
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("terms")}
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-white/30">
            © {CURRENT_YEAR} FLYNK. All rights reserved. Built with ❤️ in
            Bengaluru
          </p>
          <div className="flex gap-5 flex-wrap justify-center sm:justify-end">
            {[
              { label: "Privacy", action: () => onNavigate("privacy") },
              { label: "Terms", action: () => onNavigate("terms") },
              { label: "Sitemap", href: "/sitemap.xml" },
              { label: "Admin", action: () => onNavigate("admin") },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors"
                  data-ocid="footer.link"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="font-sans text-xs text-white/30 hover:text-white/60 transition-colors"
                  data-ocid="footer.link"
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp Button ─────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="absolute right-14 bottom-1 bg-white rounded-xl px-3 py-2 shadow-card whitespace-nowrap"
            data-ocid="whatsapp.tooltip"
          >
            <p className="font-sans text-xs font-semibold text-foreground">
              Chat with us on WhatsApp
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat with flynk. on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="wa-float w-14 h-14 rounded-full flex items-center justify-center shadow-cobalt transition-transform hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type Page = "home" | "blog" | "academy" | "privacy" | "terms" | "admin";

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    // Check if URL hash indicates admin page
    if (window.location.hash === "#admin") return "admin";
    return "home";
  });
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleNavigate = (p: string) => {
    setPage(p as Page);
    if (p === "admin") {
      window.location.hash = "admin";
    } else {
      window.location.hash = "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setPage("home");
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "blog") return <BlogPage onBack={handleBack} />;
  if (page === "academy") return <AcademyPage onBack={handleBack} />;
  if (page === "privacy") return <PrivacyPage onBack={handleBack} />;
  if (page === "terms") return <TermsPage onBack={handleBack} />;
  if (page === "admin") return <AdminPage onBack={handleBack} />;

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />

      {/* Navbar */}
      <Navbar
        onWaitlist={() => setWaitlistOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main content */}
      <main>
        <HeroSection onWaitlist={() => setWaitlistOpen(true)} />
        <Ticker />
        <ServiceChipsRow />
        <HowItWorksSection />
        <ServicesSection />
        <PricingSection onWaitlist={() => setWaitlistOpen(true)} />
        <WhyFlynkSection onWaitlist={() => setWaitlistOpen(true)} />
        <StatsSection />
        <AcademySectionPreview onNavigate={handleNavigate} />
        <TestimonialsSection />
        <WaitlistBanner />
        <BlogPreviewSection onNavigate={handleNavigate} />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onWaitlist={() => setWaitlistOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
