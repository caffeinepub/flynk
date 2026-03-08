import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, RefreshCw, Search, Shield } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { WaitlistEntry } from "../backend.d";
import { useActor } from "../hooks/useActor";

// ─── Admin PIN (change this before going live) ───────────────────────────────
const ADMIN_PIN = "1234";

interface AdminPageProps {
  onBack: () => void;
}

function formatHomeType(ht: string): string {
  const map: Record<string, string> = {
    PG: "PG / Hostel",
    OneBHK: "1 BHK",
    TwoBHK: "2 BHK",
    ThreeBHK: "3 BHK",
    FourBHKPlus: "4 BHK+",
  };
  return map[ht] ?? ht;
}

function formatTimestamp(ts: bigint): string {
  // Motoko Time is nanoseconds
  const ms = Number(ts) / 1_000_000;
  if (ms < 1000) return "—";
  const d = new Date(ms);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("flynk_admin_auth", "true");
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#12101A" }}
    >
      <div
        className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden transition-transform ${
          shake ? "animate-shake" : ""
        }`}
        style={{
          boxShadow: shake
            ? "0 0 0 3px #ef4444, 0 20px 60px rgba(0,0,0,0.5)"
            : "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(135deg, #7C3AED, #F59E0B)" }}
        />
        <div className="p-8">
          <div className="text-center mb-8">
            <span
              className="font-serif text-3xl font-bold block mb-1"
              style={{ color: "#3D0066" }}
            >
              FLYNK
            </span>
            <p className="font-sans text-sm text-muted-foreground flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Admin Panel — Leads Dashboard
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
                data-ocid="admin.password_input"
                className="h-12 rounded-xl text-center text-lg tracking-widest"
              />
              {error && (
                <p className="text-xs text-red-500 text-center mt-2 font-sans">
                  Incorrect password. Try again.
                </p>
              )}
            </div>
            <Button
              type="submit"
              data-ocid="admin.login_button"
              className="w-full h-12 rounded-full text-white font-semibold"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #F59E0B)",
                border: "none",
              }}
            >
              Unlock Dashboard
            </Button>
          </form>
          <p className="font-sans text-xs text-center text-muted-foreground mt-6">
            {/* TODO: Replace with server-side authentication before going live */}
            For now, PIN is stored client-side for testing purposes only.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.6s ease-in-out; }
      `}</style>
    </div>
  );
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  gradient,
}: {
  label: string;
  value: number | string;
  gradient: string;
}) {
  return (
    <div
      className="bg-white rounded-2xl p-5 border border-border"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-2">
        {label}
      </p>
      <span
        className="font-serif text-4xl font-bold"
        style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
          display: "block",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard({
  onBack,
  onLogout,
}: {
  onBack: () => void;
  onLogout: () => void;
}) {
  const { actor } = useActor();
  const [leads, setLeads] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchLeads = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const entries = await actor.getAllWaitlistEntries();
      setLeads(entries);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeads();
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchLeads]);

  const filteredLeads = leads.filter((lead) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      lead.name.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q)
    );
  });

  // Stats
  const today = new Date().toDateString();
  const todayCount = leads.filter((l) => {
    const ms = Number(l.timestamp) / 1_000_000;
    return ms > 1000 && new Date(ms).toDateString() === today;
  }).length;

  const exportCSV = () => {
    const rows = [
      [
        "#",
        "Name",
        "Phone",
        "Email",
        "Home Type",
        "Sq Ft",
        "Adults",
        "Children",
        "Elderly",
        "City",
        "Start Date",
        "Timestamp",
      ],
      ...filteredLeads.map((l, i) => [
        i + 1,
        l.name || "—",
        l.phone,
        l.email || "—",
        formatHomeType(l.homeType as unknown as string),
        l.squareFootage.toString(),
        l.adults.toString(),
        l.children.toString(),
        l.elderly.toString(),
        l.city || "—",
        l.preferredStartDate || "—",
        formatTimestamp(l.timestamp),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const now = new Date();
    a.href = url;
    a.download = `flynk-leads-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const secondsAgo = Math.round((Date.now() - lastRefreshed.getTime()) / 1000);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAF8FF" }}
      data-ocid="admin.page"
    >
      {/* Top Bar */}
      <div
        className="sticky top-0 z-40 border-b border-border"
        style={{
          background: "rgba(250,248,255,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <button
                type="button"
                onClick={onBack}
                data-ocid="admin.back_button"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to site</span>
              </button>
              <div className="w-px h-5 bg-border shrink-0" />
              <div className="min-w-0">
                <span
                  className="font-serif text-xl font-bold"
                  style={{ color: "#3D0066" }}
                >
                  FLYNK
                </span>
                <span className="font-sans text-sm text-muted-foreground ml-2 hidden sm:inline">
                  Leads Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-sans text-xs text-muted-foreground hidden md:inline">
                Refreshed {secondsAgo}s ago
              </span>
              <button
                type="button"
                onClick={fetchLeads}
                data-ocid="admin.refresh_button"
                aria-label="Refresh leads"
                className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <Button
                type="button"
                variant="outline"
                onClick={exportCSV}
                data-ocid="admin.export_button"
                className="h-9 rounded-full text-sm font-semibold gap-2 hidden sm:flex"
                style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <button
                type="button"
                onClick={onLogout}
                data-ocid="admin.logout_button"
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          data-ocid="admin.stats.panel"
        >
          <StatCard
            label="Total Leads"
            value={leads.length}
            gradient="linear-gradient(135deg, #7C3AED, #F59E0B)"
          />
          <StatCard
            label="New Today"
            value={todayCount}
            gradient="linear-gradient(135deg, #F59E0B, #7C3AED)"
          />
          <StatCard
            label="With Email"
            value={leads.filter((l) => l.email).length}
            gradient="linear-gradient(135deg, #7C3AED, #12101A)"
          />
          <StatCard
            label="Filtered"
            value={filteredLeads.length}
            gradient="linear-gradient(135deg, #12101A, #7C3AED)"
          />
        </div>

        {/* Search + Mobile Export */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin.search_input"
              className="pl-9 h-10 rounded-full"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={exportCSV}
            data-ocid="admin.export_button"
            className="h-10 rounded-full text-sm font-semibold gap-2 sm:hidden"
            style={{ borderColor: "#7C3AED", color: "#7C3AED" }}
          >
            <Download className="w-4 h-4" />
            CSV
          </Button>
        </div>

        {/* Table */}
        <div
          className="bg-white rounded-2xl border border-border overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          data-ocid="admin.leads.table"
        >
          {loading ? (
            <div
              className="flex items-center justify-center py-20 text-muted-foreground"
              data-ocid="admin.leads.loading_state"
            >
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              <span className="font-sans text-sm">Loading leads…</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
              data-ocid="admin.leads.empty_state"
            >
              <div className="text-4xl mb-4">📋</div>
              <p className="font-sans text-sm font-semibold text-foreground">
                No leads yet
              </p>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {search
                  ? "No leads match your search."
                  : "Once visitors join your waitlist, they'll appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm font-sans"
                style={{ minWidth: "700px" }}
              >
                <thead>
                  <tr
                    className="border-b border-border"
                    style={{ background: "#FAF8FF" }}
                  >
                    {[
                      "#",
                      "Name",
                      "Phone",
                      "Home Type",
                      "City",
                      "Adults",
                      "Email",
                      "Date & Time",
                    ].map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-3 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, i) => (
                    <tr
                      key={`${lead.phone}-${i}`}
                      data-ocid={`admin.leads.row.${i + 1}`}
                      className="border-b border-border last:border-0 transition-colors"
                      style={{
                        background: i % 2 === 0 ? "white" : "#FAF8FF",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = "rgba(124,58,237,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLTableRowElement
                        ).style.background = i % 2 === 0 ? "white" : "#FAF8FF";
                      }}
                    >
                      <td
                        className="px-4 py-3.5 text-xs text-muted-foreground font-mono"
                        style={{ borderLeft: "3px solid #7C3AED" }}
                      >
                        {i + 1}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-foreground whitespace-nowrap">
                        {lead.name || "—"}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{lead.phone}</span>
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(lead.name || "there")}!%20This%20is%20FLYNK.%20We%20saw%20your%20waitlist%20request%20for%20560077.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity hover:opacity-80"
                            style={{
                              background: "rgba(37,211,102,0.1)",
                              color: "#25D366",
                              border: "1px solid rgba(37,211,102,0.25)",
                            }}
                            aria-label={`WhatsApp ${lead.name || lead.phone}`}
                          >
                            WhatsApp
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(124,58,237,0.08)",
                            color: "#7C3AED",
                          }}
                        >
                          {formatHomeType(lead.homeType as unknown as string)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                        {lead.city || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-center text-foreground">
                        {lead.adults.toString()}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {lead.email || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap text-xs">
                        {formatTimestamp(lead.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredLeads.length > 0 && (
          <p className="font-sans text-xs text-muted-foreground text-center mt-4">
            Showing {filteredLeads.length} of {leads.length} total leads
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Admin Page (auth gate + dashboard) ──────────────────────────────────────

export function AdminPage({ onBack }: AdminPageProps) {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("flynk_admin_auth") === "true",
  );

  const handleLogout = () => {
    sessionStorage.removeItem("flynk_admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return <LoginGate onAuth={() => setAuthed(true)} />;
  }

  return <Dashboard onBack={onBack} onLogout={handleLogout} />;
}
