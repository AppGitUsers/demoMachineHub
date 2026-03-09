import { useState, useEffect, useRef } from "react";

// ─── DUMMY DATA ────────────────────────────────────────────────────────────────
const MACHINES = [
  {
    id: 1, category: "machines",
    name: "HydroPress X900",
    desc: "Industrial hydraulic press with precision control system. Ideal for metal forming, stamping, and deep drawing operations.",
    price: 450000, originalPrice: 520000,
    specs: { Power: "22 kW", Capacity: "900 Ton", Stroke: "400 mm", Speed: "15 mm/s" },
    tag: "Bestseller", badge: "🔥",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    id: 2, category: "machines",
    name: "TurboLathe CNC-500",
    desc: "High-speed CNC lathe with 5-axis capability. Swiss-precision spindle for aerospace-grade turning operations.",
    price: 320000, originalPrice: 380000,
    specs: { Power: "18.5 kW", RPM: "4500", Chuck: "500 mm", Control: "Fanuc" },
    tag: "New Arrival", badge: "✨",
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
  },
  {
    id: 3, category: "machines",
    name: "PlasmaArc Pro 2000",
    desc: "CNC plasma cutting machine with 2m x 3m table. Ideal for structural steel, pipes, and custom metal fabrication.",
    price: 185000, originalPrice: 220000,
    specs: { Current: "200A", Table: "2×3 m", Thickness: "50 mm", Gas: "Plasma/Oxy" },
    tag: "Popular", badge: "⚡",
    img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
  },
  {
    id: 4, category: "machines",
    name: "VertikalMill VMC-850",
    desc: "Vertical machining center with box-way construction. Superior rigidity for heavy-duty milling and drilling.",
    price: 560000, originalPrice: 650000,
    specs: { Travel: "850×500 mm", Power: "30 kW", ATC: "24 Tools", Accuracy: "±0.005 mm" },
    tag: "Premium", badge: "👑",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: 5, category: "machines",
    name: "BendMaster 400T",
    desc: "Hydraulic press brake with 4-meter bending length. CNC back gauge for repeatable precision bending of heavy plates.",
    price: 275000, originalPrice: 310000,
    specs: { Force: "400 Ton", Length: "4000 mm", Stroke: "200 mm", Axes: "6-Axis CNC" },
    tag: "Hot Deal", badge: "🔥",
    img: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80",
  },
  {
    id: 6, category: "machines",
    name: "LaserCut Fiber 6kW",
    desc: "High-power fiber laser cutting system. Processes SS, MS, Aluminium, and Brass with mirror-finish edge quality.",
    price: 690000, originalPrice: 750000,
    specs: { Power: "6000 W", Table: "3×1.5 m", Thickness: "25 mm SS", Speed: "120 m/min" },
    tag: "New Arrival", badge: "✨",
    img: "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=600&q=80",
  },
];

const ACCESSORIES = [
  {
    id: 7, category: "accessories",
    name: "Coolant Pump Kit",
    desc: "High-pressure coolant delivery system with filtration. Compatible with all CNC machines.",
    price: 32000, originalPrice: 38000,
    specs: { Flow: "40 L/min", Pressure: "70 bar", Tank: "100 L", Filter: "25 micron" },
    tag: "Essential", badge: "🔧",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 8, category: "accessories",
    name: "Rotary Table RT-250",
    desc: "Precision 4th-axis rotary table for multi-sided machining. Hydraulic clamping for zero-slip accuracy.",
    price: 85000, originalPrice: 100000,
    specs: { Diameter: "250 mm", Accuracy: "±5 arc-sec", Load: "300 kg", Interface: "Fanuc/Siemens" },
    tag: "Popular", badge: "⭐",
    img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
  },
  {
    id: 9, category: "accessories",
    name: "Tool Presetter Pro",
    desc: "Offline tool presetting station with 0.001 mm resolution. Reduces machine downtime by 60%.",
    price: 65000, originalPrice: 80000,
    specs: { Resolution: "0.001 mm", Range: "300 mm", Interface: "USB/RS232", Display: "8\" TFT" },
    tag: "Time Saver", badge: "⏱️",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    id: 10, category: "accessories",
    name: "Chip Conveyor Belt",
    desc: "Hinge-belt chip conveyor for continuous swarf removal. Prevents chip re-cutting and protects machine slideway.",
    price: 42000, originalPrice: 50000,
    specs: { Length: "2.5 m", Capacity: "150 kg/hr", Width: "200 mm", Drive: "0.37 kW" },
    tag: "Maintenance", badge: "🛡️",
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
  },
];

const ALL_PRODUCTS = [...MACHINES, ...ACCESSORIES];
const ADMIN_CREDS = { email: "admin@machinehub.in", password: "Admin@123" };
const INITIAL_REQUESTS = [
  { id: 1, user: "Ramesh Kumar", email: "ramesh@steelworks.in", product: "HydroPress X900", price: 450000, date: "2025-02-15", status: "Pending", phone: "9876543210" },
  { id: 2, user: "Priya Sharma", email: "priya@infra.co", product: "LaserCut Fiber 6kW", price: 690000, date: "2025-02-18", status: "Contacted", phone: "9123456789" },
  { id: 3, user: "Anil Patel", email: "anil@manuf.com", product: "TurboLathe CNC-500", price: 320000, date: "2025-02-20", status: "Closed", phone: "9988776655" },
];
const TESTIMONIALS = [
  { name: "Rajesh Mehta", company: "Mehta Engineering Works", text: "The HydroPress X900 transformed our production. ROI in just 8 months.", rating: 5, avatar: "RM" },
  { name: "Sunita Kapoor", company: "Kapoor Steel Fabricators", text: "LaserCut Fiber precision is unmatched. Customer support is top-notch.", rating: 5, avatar: "SK" },
  { name: "Vikram Nair", company: "Nair Machining Co.", text: "Best decision we made. VertikalMill VMC-850 runs 3 shifts daily without issues.", rating: 5, avatar: "VN" },
];

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const formatPrice = (p) => `₹${(p / 100000).toFixed(1)}L`;
const formatPriceFull = (p) => `₹${p.toLocaleString("en-IN")}`;

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10, maxWidth: "calc(100vw - 32px)" }}>
      {toasts.map(t => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          background: t.type === "success" ? "#00ff88" : t.type === "error" ? "#ff4466" : "#f0a500",
          color: "#000", padding: "12px 18px", borderRadius: 10, fontWeight: 700,
          cursor: "pointer", minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          animation: "slideIn 0.3s ease", fontFamily: "inherit", fontSize: 14, wordBreak: "break-word"
        }}>{t.msg}</div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const remove = (id) => setToasts(p => p.filter(t => t.id !== id));
  return { toasts, add, remove };
}

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      WebkitOverflowScrolling: "touch",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0d0d0d", border: "1px solid #333", borderRadius: 20,
        maxWidth: 560, width: "100%", maxHeight: "90svh", overflowY: "auto",
        padding: "clamp(20px, 5vw, 32px)", position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 12, right: 12, background: "#222", border: "none",
          color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          WebkitTapHighlightColor: "transparent",
        }}>×</button>
        {children}
      </div>
    </div>
  );
}

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, user, setUser, isAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on page change
  useEffect(() => setMenuOpen(false), [page]);

  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Machines", key: "catalog" },
    { label: "Accessories", key: "catalog" },
    { label: "Query", key: "query" },
  ];

  const navBase = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled || menuOpen ? "rgba(6,6,6,0.97)" : "transparent",
    backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
    WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
    borderBottom: scrolled || menuOpen ? "1px solid #1a1a1a" : "none",
    transition: "all 0.4s ease",
  };

  return (
    <nav style={navBase}>
      {/* Top bar */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68, padding: "0 clamp(16px, 4vw, 40px)", gap: 12,
      }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, WebkitTapHighlightColor: "transparent" }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #f0a500, #ff6b00)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, color: "#000", flexShrink: 0 }}>M</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(18px, 3vw, 22px)", letterSpacing: 2, color: "#fff" }}>MachineHub</span>
        </div>

        {/* Desktop Links */}
        <div className="mh-nav-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => setPage(l.key)} style={{
              background: "none", border: "none", color: page === l.key ? "#f0a500" : "#aaa",
              fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 1,
              textTransform: "uppercase", fontFamily: "inherit", transition: "color 0.2s",
              WebkitTapHighlightColor: "transparent", minHeight: 44, padding: "0 4px",
            }}>{l.label}</button>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="mh-nav-auth" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <>
              {isAdmin && (
                <button onClick={() => setPage("admin")} style={{
                  background: "#f0a500", color: "#000", border: "none", borderRadius: 8,
                  padding: "8px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13,
                  minHeight: 40, WebkitTapHighlightColor: "transparent",
                }}>Admin</button>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#000", flexShrink: 0 }}>{user.name?.[0]?.toUpperCase() || "U"}</div>
                <span className="mh-username" style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{user.name?.split(" ")[0]}</span>
                <button onClick={() => { setUser(null); setPage("home"); }} style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #333", borderRadius: 8, padding: "6px 10px", fontSize: 12, cursor: "pointer", minHeight: 36, WebkitTapHighlightColor: "transparent" }}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setPage("login")} style={{ background: "none", border: "1px solid #333", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, minHeight: 40, WebkitTapHighlightColor: "transparent" }}>Login</button>
              <button onClick={() => setPage("register")} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, minHeight: 40, WebkitTapHighlightColor: "transparent" }}>Register</button>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="mh-hamburger"
          aria-label="Toggle menu"
          style={{
            display: "none", flexDirection: "column", justifyContent: "center", alignItems: "center",
            gap: 5, width: 44, height: 44, background: "#1a1a1a", border: "1px solid #333",
            borderRadius: 10, cursor: "pointer", padding: 10, flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
          }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 18, height: 2, background: "#fff", borderRadius: 2, display: "block",
              transition: "all 0.25s",
              transform: i === 0 && menuOpen ? "rotate(45deg) translateY(7px)" : i === 2 && menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div style={{
        overflow: "hidden",
        maxHeight: menuOpen ? "100svh" : "0",
        transition: "max-height 0.35s ease",
        borderTop: menuOpen ? "1px solid #1a1a1a" : "none",
      }}>
        <div style={{ padding: "8px 0 16px", display: "flex", flexDirection: "column" }}>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => setPage(l.key)} style={{
              background: "none", border: "none", color: page === l.key ? "#f0a500" : "#ccc",
              fontSize: 16, fontWeight: 600, cursor: "pointer", textTransform: "uppercase",
              fontFamily: "inherit", letterSpacing: 1, padding: "14px clamp(16px, 4vw, 40px)",
              textAlign: "left", borderBottom: "1px solid #1a1a1a", minHeight: 52,
              WebkitTapHighlightColor: "transparent",
            }}>{l.label}</button>
          ))}
          {/* Mobile auth buttons */}
          <div style={{ display: "flex", gap: 10, padding: "14px clamp(16px, 4vw, 40px)", flexWrap: "wrap" }}>
            {user ? (
              <>
                {isAdmin && (
                  <button onClick={() => setPage("admin")} style={{ background: "#f0a500", color: "#000", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14, flex: 1, minHeight: 44, WebkitTapHighlightColor: "transparent" }}>Admin Panel</button>
                )}
                <button onClick={() => { setUser(null); setPage("home"); }} style={{ background: "#1a1a1a", color: "#aaa", border: "1px solid #333", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer", flex: 1, minHeight: 44, WebkitTapHighlightColor: "transparent" }}>Logout ({user.name?.split(" ")[0]})</button>
              </>
            ) : (
              <>
                <button onClick={() => setPage("login")} style={{ background: "none", border: "1px solid #333", color: "#fff", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, flex: 1, minHeight: 44, WebkitTapHighlightColor: "transparent" }}>Login</button>
                <button onClick={() => setPage("register")} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, flex: 1, minHeight: 44, WebkitTapHighlightColor: "transparent" }}>Register</button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mh-nav-desktop { display: none !important; }
          .mh-nav-auth    { display: none !important; }
          .mh-hamburger   { display: flex !important; }
        }
        @media (max-width: 900px) {
          .mh-username { display: none; }
        }
      `}</style>
    </nav>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [count, setCount] = useState({ machines: 0, clients: 0, years: 0 });

  useEffect(() => {
    const targets = { machines: 500, clients: 1200, years: 18 };
    const duration = 2000, steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        machines: Math.round(targets.machines * progress),
        clients: Math.round(targets.clients * progress),
        years: Math.round(targets.years * progress),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#060606", color: "#fff", overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{
        minHeight: "100svh", display: "flex", alignItems: "center",
        background: "radial-gradient(ellipse at 30% 50%, #1a0800 0%, #060606 60%)",
        position: "relative", overflow: "hidden", paddingTop: 80,
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(240,165,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: "min(600px, 80vw)", height: "min(600px, 80vw)", background: "radial-gradient(circle, rgba(240,165,0,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(32px, 6vw, 60px) clamp(16px, 4vw, 40px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 6vw, 80px)", alignItems: "center", position: "relative", width: "100%" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,165,0,0.12)", border: "1px solid rgba(240,165,0,0.3)", borderRadius: 100, padding: "6px 14px", marginBottom: "clamp(16px, 3vw, 24px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 2s infinite", flexShrink: 0 }} />
              <span style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 700, color: "#f0a500", letterSpacing: 2, textTransform: "uppercase" }}>Trusted Industrial Machines</span>
            </div>

            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.95, letterSpacing: 2, marginBottom: "clamp(16px, 3vw, 24px)", color: "#fff" }}>
              POWER YOUR<br />
              <span style={{ color: "#f0a500" }}>FACTORY</span><br />
              FLOOR
            </h1>

            <p style={{ color: "#888", fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.7, marginBottom: "clamp(24px, 4vw, 40px)", maxWidth: 480 }}>
              Premium industrial machines and accessories from ₹30,000 to ₹7 Lakhs. Engineered for Indian manufacturing excellence.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setPage("catalog")} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: "clamp(12px, 2vw, 16px) clamp(22px, 4vw, 36px)", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 800, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", boxShadow: "0 0 40px rgba(240,165,0,0.4)", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Explore Machines →</button>
              <button onClick={() => setPage("query")} style={{ background: "none", color: "#fff", border: "1px solid #333", borderRadius: 12, padding: "clamp(12px, 2vw, 16px) clamp(22px, 4vw, 36px)", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 700, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Get a Quote</button>
            </div>
          </div>

          {/* Hero Machine Card — hidden on mobile */}
          <div className="mh-hero-card">
            <div style={{ background: "linear-gradient(145deg, #111, #1a1a1a)", border: "1px solid #222", borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
              <img src={MACHINES[0].img} alt="machine" style={{ width: "100%", height: "clamp(200px, 28vw, 340px)", objectFit: "cover", opacity: 0.85 }} />
              <div style={{ padding: "clamp(16px, 2.5vw, 24px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div>
                    <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Featured</div>
                    <div style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 800 }}>{MACHINES[0].name}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: 900, color: "#f0a500" }}>{formatPrice(MACHINES[0].price)}</div>
                    <div style={{ fontSize: 13, color: "#666", textDecoration: "line-through" }}>{formatPrice(MACHINES[0].originalPrice)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, background: "#00ff88", color: "#000", borderRadius: 12, padding: "8px 14px", fontWeight: 800, fontSize: 13, whiteSpace: "nowrap" }}>Bestseller 🔥</div>
          </div>
        </div>

        <style>{`
          .mh-hero-card { position: relative; }
          @media (max-width: 768px) {
            .mh-hero-card { display: none; }
            section > div[style*="grid"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* STATS */}
      <section style={{ padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 40px)", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 3vw, 40px)", textAlign: "center" }}>
          {[
            { val: count.machines + "+", label: "Machines Sold", sub: "Across India" },
            { val: count.clients + "+", label: "Happy Clients", sub: "SMEs to Large Industries" },
            { val: count.years + "yrs", label: "Experience", sub: "In Industrial Equipment" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "clamp(16px, 3vw, 32px) clamp(8px, 2vw, 20px)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 7vw, 64px)", color: "#f0a500", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "clamp(13px, 1.6vw, 18px)", fontWeight: 700, color: "#fff", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#666", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 64px)" }}>
            <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Our Collection</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: 2, color: "#fff" }}>FEATURED MACHINES</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "clamp(16px, 2.5vw, 28px)" }}>
            {MACHINES.slice(0, 3).map(m => <ProductCard key={m.id} product={m} setPage={() => {}} featured />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "clamp(28px, 4vw, 48px)" }}>
            <button onClick={() => setPage("catalog")} style={{ background: "none", color: "#f0a500", border: "1px solid #f0a500", borderRadius: 12, padding: "clamp(12px, 2vw, 14px) clamp(24px, 4vw, 40px)", fontSize: "clamp(13px, 1.5vw, 15px)", fontWeight: 700, cursor: "pointer", letterSpacing: 1, minHeight: 52, WebkitTapHighlightColor: "transparent" }}>View All Machines & Accessories →</button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 40px)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 64px)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: 2, color: "#fff" }}>WHY MACHINEHUB?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(240px, 100%), 1fr))", gap: "clamp(14px, 2vw, 28px)" }}>
            {[
              { icon: "⚙️", title: "Premium Quality", desc: "Every machine undergoes 47-point quality inspection before delivery" },
              { icon: "🚀", title: "Pan-India Delivery", desc: "Fast and safe logistics to your factory anywhere in India" },
              { icon: "🛡️", title: "2-Year Warranty", desc: "Comprehensive warranty with on-site service by certified engineers" },
              { icon: "💰", title: "Best Price", desc: "Competitive pricing with EMI and financing options available" },
            ].map((f, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: "clamp(20px, 3vw, 32px)", transition: "border-color 0.3s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f0a500"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: "clamp(15px, 1.8vw, 17px)", marginBottom: 10, color: "#fff" }}>{f.title}</div>
                <div style={{ color: "#777", fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 64px)" }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 56px)", letterSpacing: 2, color: "#fff" }}>WHAT CLIENTS SAY</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "clamp(14px, 2vw, 28px)" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: "clamp(20px, 3vw, 32px)" }}>
                <div style={{ color: "#f0a500", fontSize: "clamp(16px, 2.5vw, 22px)", marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: "#ccc", lineHeight: 1.7, marginBottom: 24, fontSize: "clamp(13px, 1.4vw, 15px)" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#000", flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "clamp(13px, 1.5vw, 15px)" }}>{t.name}</div>
                    <div style={{ color: "#666", fontSize: "clamp(11px, 1.2vw, 13px)" }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 40px)", background: "linear-gradient(135deg, #1a0800, #0d0d0d)", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 8vw, 64px)", letterSpacing: 2, color: "#fff", marginBottom: 20 }}>READY TO POWER UP?</h2>
          <p style={{ color: "#888", fontSize: "clamp(14px, 1.6vw, 17px)", marginBottom: "clamp(24px, 4vw, 40px)" }}>Talk to our experts today. We'll help you find the perfect machine for your production line.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("query")} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)", fontSize: "clamp(14px, 1.6vw, 16px)", fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Send Query Now</button>
            <button onClick={() => setPage("catalog")} style={{ background: "none", color: "#fff", border: "1px solid #444", borderRadius: 12, padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)", fontSize: "clamp(14px, 1.6vw, 16px)", fontWeight: 700, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Browse Catalog</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060606", borderTop: "1px solid #111", padding: "clamp(24px, 4vw, 40px)", textAlign: "center" }}>
        <div style={{ color: "#f0a500", fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, marginBottom: 8 }}>MachineHub</div>
        <div style={{ color: "#555", fontSize: 13 }}>© 2025 MachineHub Industries Pvt. Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product, onBuy, user, setPage }) {
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#111",
          border: `1px solid ${hovered ? "#f0a500" : "#1a1a1a"}`,
          borderRadius: 20, overflow: "hidden", transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 60px rgba(240,165,0,0.15)" : "none",
          display: "flex", flexDirection: "column",
        }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: "clamp(180px, 22vw, 220px)", objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)", display: "block" }} />
          <div style={{ position: "absolute", top: 12, left: 12, background: "#f0a500", color: "#000", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 800 }}>{product.badge} {product.tag}</div>
          <div style={{ position: "absolute", top: 12, right: 12, background: "#00ff88", color: "#000", borderRadius: 8, padding: "4px 8px", fontSize: 12, fontWeight: 800 }}>-{discount}%</div>
        </div>

        <div style={{ padding: "clamp(16px, 2.5vw, 24px)", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, color: "#f0a500", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{product.category}</div>
          <h3 style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>{product.name}</h3>
          <p style={{ color: "#777", fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{product.desc}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
              <div key={k} style={{ background: "#0d0d0d", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "#ccc", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 6 }}>
            <div>
              <div style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 900, color: "#f0a500" }}>{formatPrice(product.price)}</div>
              <div style={{ fontSize: 12, color: "#555", textDecoration: "line-through" }}>{formatPriceFull(product.originalPrice)}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowDetails(true)} style={{ flex: 1, background: "#1a1a1a", color: "#fff", border: "1px solid #333", borderRadius: 10, padding: "clamp(10px, 1.5vw, 12px)", fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 700, cursor: "pointer", minHeight: 44, WebkitTapHighlightColor: "transparent" }}>View Details</button>
            <button onClick={() => { if (!user) { setPage("login"); return; } onBuy && onBuy(product); }} style={{ flex: 1, background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 10, padding: "clamp(10px, 1.5vw, 12px)", fontSize: "clamp(12px, 1.4vw, 14px)", fontWeight: 800, cursor: "pointer", minHeight: 44, WebkitTapHighlightColor: "transparent" }}>Request to Buy</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={showDetails} onClose={() => setShowDetails(false)}>
        <div>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: "clamp(160px, 30vw, 240px)", objectFit: "cover", borderRadius: 12, marginBottom: 20, display: "block" }} />
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{product.category}</div>
          <h2 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>{product.name}</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginBottom: 20, fontSize: "clamp(13px, 1.4vw, 15px)" }}>{product.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} style={{ background: "#111", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 600, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#fff", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, color: "#f0a500" }}>{formatPriceFull(product.price)}</div>
              <div style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}>{formatPriceFull(product.originalPrice)}</div>
            </div>
            <div style={{ background: "#00ff88", color: "#000", borderRadius: 8, padding: "6px 12px", fontWeight: 800, fontSize: 13 }}>Save {formatPriceFull(product.originalPrice - product.price)}</div>
          </div>
          <button onClick={() => { setShowDetails(false); if (!user) { setPage && setPage("login"); return; } onBuy && onBuy(product); }} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Request to Buy →</button>
        </div>
      </Modal>
    </>
  );
}

// ─── CATALOG PAGE ──────────────────────────────────────────────────────────────
function CatalogPage({ user, setPage, addToast, addRequest }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [buyProduct, setBuyProduct] = useState(null);
  const [buyForm, setBuyForm] = useState({ name: user?.name || "", phone: user?.phone || "", message: "" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = ALL_PRODUCTS
    .filter(p => filter === "all" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);

  const handleBuySubmit = () => {
    if (!buyForm.name || !buyForm.phone) { addToast("Please fill all fields", "error"); return; }
    addRequest({ product: buyProduct, user, form: buyForm });
    addToast("🎉 Request submitted! Our team will contact you soon.", "success");
    setBuyProduct(null);
    setBuyForm({ name: user?.name || "", phone: user?.phone || "", message: "" });
  };

  const filterBtnStyle = (active) => ({
    background: active ? "#f0a500" : "#111", color: active ? "#000" : "#aaa",
    border: "1px solid", borderColor: active ? "#f0a500" : "#222",
    borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", textTransform: "capitalize", minHeight: 44,
    WebkitTapHighlightColor: "transparent",
  });

  return (
    <div style={{ background: "#060606", minHeight: "100vh", paddingTop: 80, color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 40px) clamp(48px, 6vw, 80px)" }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(28px, 5vw, 48px)" }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Our Inventory</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: 2, color: "#fff", marginBottom: 12 }}>MACHINES & ACCESSORIES</h1>
          <p style={{ color: "#666", fontSize: "clamp(13px, 1.5vw, 16px)" }}>Find the perfect equipment for your production line. Premium quality, competitive pricing.</p>
        </div>

        {/* Search bar always visible */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search machines, accessories..."
            style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 20px 14px 48px", color: "#fff", fontSize: "clamp(14px, 1.6vw, 15px)", fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 52 }} />
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" }}>🔍</span>
        </div>

        {/* Filter toggle for mobile */}
        <button onClick={() => setFiltersOpen(p => !p)} className="mh-filter-toggle" style={{ display: "none", width: "100%", background: "#111", border: "1px solid #222", borderRadius: 10, padding: "12px 16px", color: "#aaa", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 12, justifyContent: "space-between", alignItems: "center", minHeight: 48, WebkitTapHighlightColor: "transparent" }}>
          <span>⚙ Filters & Sort</span>
          <span style={{ fontSize: 11 }}>{filtersOpen ? "▲" : "▼"}</span>
        </button>

        {/* Filters row */}
        <div className="mh-filters" style={{ display: "flex", gap: 10, marginBottom: "clamp(20px, 3vw, 40px)", flexWrap: "wrap", alignItems: "center" }}>
          {["all", "machines", "accessories"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={filterBtnStyle(filter === f)}>
              {f === "all" ? "All Products" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: "#111", border: "1px solid #222", color: "#aaa", borderRadius: 10, padding: "10px 16px", fontSize: 14, cursor: "pointer", fontFamily: "inherit", outline: "none", minHeight: 44, WebkitAppearance: "none" }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        <div style={{ color: "#555", fontSize: 14, marginBottom: "clamp(16px, 2.5vw, 28px)" }}>{filtered.length} products found</div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "clamp(14px, 2.5vw, 28px)" }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} user={user} setPage={setPage} onBuy={p => setBuyProduct(p)} />
          ))}
        </div>
      </div>

      {/* Buy Request Modal */}
      <Modal open={!!buyProduct} onClose={() => setBuyProduct(null)}>
        {buyProduct && (
          <div>
            <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Request to Buy</div>
            <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: "#fff", marginBottom: 4 }}>{buyProduct.name}</h2>
            <div style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: "#f0a500", marginBottom: 24 }}>{formatPriceFull(buyProduct.price)}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Your Name", key: "name", placeholder: "Full name" },
                { label: "Phone Number", key: "phone", placeholder: "+91 98765 43210" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                  <input value={buyForm[f.key]} onChange={e => setBuyForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 52 }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Message (optional)</label>
                <textarea value={buyForm.message} onChange={e => setBuyForm(p => ({ ...p, message: e.target.value }))} placeholder="Any specific requirements..." rows={3}
                  style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: 14, margin: "18px 0", fontSize: 13, color: "#777" }}>
              📧 Confirmation will be sent to <strong style={{ color: "#f0a500" }}>{user?.email}</strong>
            </div>
            <button onClick={handleBuySubmit} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Submit Request →</button>
          </div>
        )}
      </Modal>

      <style>{`
        @media (max-width: 640px) {
          .mh-filter-toggle { display: flex !important; }
          .mh-filters { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─── QUERY PAGE ────────────────────────────────────────────────────────────────
function QueryPage({ addToast }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", interest: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.message) { addToast("Please fill all required fields", "error"); return; }
    setSent(true);
    addToast("Query submitted successfully! We'll respond within 4 hours.", "success");
  };

  if (sent) return (
    <div style={{ background: "#060606", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", padding: "80px clamp(16px, 4vw, 40px) 40px" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: "clamp(48px, 10vw, 80px)", marginBottom: 24 }}>✅</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 48px)", color: "#f0a500", marginBottom: 16 }}>QUERY RECEIVED!</h2>
        <p style={{ color: "#777", fontSize: "clamp(13px, 1.5vw, 16px)", marginBottom: 32 }}>Our sales team will reach out to you within 4 business hours.</p>
        <button onClick={() => setSent(false)} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 15, fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>Send Another Query</button>
      </div>
    </div>
  );

  const inputStyle = { width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 52 };

  return (
    <div style={{ background: "#060606", minHeight: "100vh", paddingTop: 80, color: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 40px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ marginBottom: "clamp(28px, 5vw, 48px)" }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: 2, marginBottom: 12 }}>SEND A QUERY</h1>
          <p style={{ color: "#666", fontSize: "clamp(13px, 1.5vw, 16px)" }}>Tell us what you need and we'll get back to you with the best solution.</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: "clamp(20px, 5vw, 40px)" }}>
          <div className="mh-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2vw, 20px)", marginBottom: "clamp(12px, 2vw, 20px)" }}>
            {[
              { label: "Full Name *", key: "name", placeholder: "Your full name" },
              { label: "Email Address *", key: "email", placeholder: "you@company.com", type: "email" },
              { label: "Phone Number *", key: "phone", placeholder: "+91 98765 43210" },
              { label: "Company Name", key: "company", placeholder: "Your company" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                <input type={f.type || "text"} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
          </div>

          <div className="mh-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2vw, 20px)", marginBottom: "clamp(12px, 2vw, 20px)" }}>
            <div>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Machine of Interest</label>
              <select value={form.interest} onChange={e => setForm(p => ({ ...p, interest: e.target.value }))} style={{ ...inputStyle, color: form.interest ? "#fff" : "#555", cursor: "pointer", WebkitAppearance: "none" }}>
                <option value="">Select a machine</option>
                {ALL_PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                <option value="other">Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Budget Range</label>
              <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} style={{ ...inputStyle, color: form.budget ? "#fff" : "#555", cursor: "pointer", WebkitAppearance: "none" }}>
                <option value="">Select budget</option>
                <option>₹30K – ₹1L</option>
                <option>₹1L – ₹2.5L</option>
                <option>₹2.5L – ₹5L</option>
                <option>₹5L – ₹7L</option>
                <option>Above ₹7L</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "clamp(18px, 3vw, 28px)" }}>
            <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Your Message *</label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Describe your requirements in detail..." rows={5}
              style={{ ...inputStyle, resize: "vertical", minHeight: "unset" }} />
          </div>

          <button onClick={handleSubmit} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 18, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: "pointer", letterSpacing: 1, minHeight: 56, WebkitTapHighlightColor: "transparent" }}>SEND QUERY →</button>
        </div>

        {/* Contact Info */}
        <div className="mh-contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(10px, 2vw, 20px)", marginTop: "clamp(20px, 3vw, 32px)" }}>
          {[
            { icon: "📞", label: "Call Us", val: "+91 98765 43210" },
            { icon: "📧", label: "Email", val: "sales@machinehub.in" },
            { icon: "📍", label: "Location", val: "Mumbai, Maharashtra" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: "clamp(16px, 2.5vw, 24px)", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(20px, 3.5vw, 28px)", marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 11, color: "#555", fontWeight: 600, marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: "clamp(12px, 1.3vw, 14px)", color: "#ccc", fontWeight: 600 }}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .mh-form-grid    { grid-template-columns: 1fr !important; }
          .mh-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── AUTH PAGES ────────────────────────────────────────────────────────────────
function LoginPage({ setUser, setPage, addToast }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!form.email || !form.password) { addToast("Fill all fields", "error"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.email === ADMIN_CREDS.email && form.password === ADMIN_CREDS.password) {
        setUser({ name: "Admin User", email: form.email, role: "admin" });
        addToast("Welcome back, Admin!", "success");
        setPage("admin");
      } else {
        const users = JSON.parse(localStorage.getItem("mh_users") || "[]");
        const found = users.find(u => u.email === form.email && u.password === form.password);
        if (found) {
          setUser(found);
          addToast(`Welcome back, ${found.name.split(" ")[0]}!`, "success");
          setPage("catalog");
        } else {
          addToast("Invalid credentials. Try again.", "error");
        }
      }
    }, 1000);
  };

  const inputStyle = { width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 52 };

  return (
    <div style={{ background: "#060606", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(80px, 12vw, 100px) 16px 40px", backgroundImage: "radial-gradient(ellipse at 50% 50%, #1a0800 0%, #060606 60%)" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 4vw, 28px)", color: "#f0a500", letterSpacing: 3, marginBottom: 8 }}>MachineHub</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 48px)", color: "#fff", letterSpacing: 2 }}>WELCOME BACK</h1>
          <p style={{ color: "#666", fontSize: "clamp(13px, 1.5vw, 15px)" }}>Sign in to request machines and track orders</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: "clamp(24px, 5vw, 40px)" }}>
          {[
            { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
            { label: "Password", key: "password", type: "password", placeholder: "Your password" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder={f.placeholder} style={inputStyle} />
            </div>
          ))}
          <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #f0a500, #ff6b00)", color: loading ? "#777" : "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: 6, minHeight: 52, WebkitTapHighlightColor: "transparent" }}>
            {loading ? "Signing in..." : "SIGN IN →"}
          </button>
          <div style={{ textAlign: "center", marginTop: 22, color: "#555", fontSize: 14 }}>
            Don't have an account?{" "}
            <button onClick={() => setPage("register")} style={{ background: "none", border: "none", color: "#f0a500", fontWeight: 700, cursor: "pointer", fontSize: 14, WebkitTapHighlightColor: "transparent" }}>Register here</button>
          </div>
          <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 10, padding: 14, marginTop: 18, fontSize: 12, color: "#555" }}>
            <strong style={{ color: "#f0a500" }}>Demo Admin:</strong> admin@machinehub.in / Admin@123
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ setPage, addToast }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", password: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!form.name || !form.email || !form.phone || !form.password) { addToast("Fill all fields", "error"); return; }
    if (form.password !== form.confirmPassword) { addToast("Passwords don't match", "error"); return; }
    if (form.password.length < 8) { addToast("Password must be at least 8 characters", "error"); return; }
    setLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      addToast(`OTP sent to ${form.email}: ${code}`, "success");
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp) { addToast("Invalid OTP. Try again.", "error"); return; }
    const users = JSON.parse(localStorage.getItem("mh_users") || "[]");
    users.push({ name: form.name, email: form.email, phone: form.phone, company: form.company, password: form.password, role: "user" });
    localStorage.setItem("mh_users", JSON.stringify(users));
    addToast("Account created! Please login.", "success");
    setPage("login");
  };

  const inputStyle = { width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "12px 14px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box", minHeight: 48 };

  return (
    <div style={{ background: "#060606", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(80px, 12vw, 100px) 16px 40px", backgroundImage: "radial-gradient(ellipse at 50% 50%, #1a0800 0%, #060606 60%)" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(22px, 4vw, 28px)", color: "#f0a500", letterSpacing: 3, marginBottom: 8 }}>MachineHub</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 48px)", color: "#fff", letterSpacing: 2 }}>CREATE ACCOUNT</h1>
          <p style={{ color: "#666", fontSize: "clamp(13px, 1.5vw, 15px)" }}>Join thousands of manufacturers across India</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24, padding: "0 20px" }}>
          {[1, 2].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i === 0 ? 1 : "unset" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: step >= s ? "linear-gradient(135deg, #f0a500, #ff6b00)" : "#1a1a1a", border: `2px solid ${step >= s ? "#f0a500" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: step >= s ? "#000" : "#555", flexShrink: 0 }}>{s}</div>
              {i === 0 && <div style={{ flex: 1, height: 2, background: step >= 2 ? "#f0a500" : "#1a1a1a", margin: "0 12px" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginBottom: 28, fontSize: 12, color: "#555" }}>
          <span style={{ color: step >= 1 ? "#f0a500" : "#555" }}>Personal Info</span>
          <span style={{ color: step >= 2 ? "#f0a500" : "#555" }}>OTP Verification</span>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: "clamp(20px, 5vw, 40px)" }}>
          {step === 1 ? (
            <>
              <div className="mh-reg-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px, 2vw, 16px)", marginBottom: 14 }}>
                {[
                  { label: "Full Name *", key: "name", placeholder: "Your full name" },
                  { label: "Email *", key: "email", type: "email", placeholder: "you@company.com" },
                  { label: "Phone *", key: "phone", placeholder: "+91 98765 43210" },
                  { label: "Company", key: "company", placeholder: "Your company name" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6, display: "block" }}>{f.label}</label>
                    <input type={f.type || "text"} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                  </div>
                ))}
              </div>
              {[
                { label: "Password *", key: "password", placeholder: "Min. 8 characters" },
                { label: "Confirm Password *", key: "confirmPassword", placeholder: "Repeat password" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6, display: "block" }}>{f.label}</label>
                  <input type="password" value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
              <button onClick={handleSendOtp} disabled={loading} style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #f0a500, #ff6b00)", color: loading ? "#777" : "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 15px)", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: 6, minHeight: 52, WebkitTapHighlightColor: "transparent" }}>
                {loading ? "Sending OTP..." : "SEND OTP →"}
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: "clamp(36px, 8vw, 48px)", marginBottom: 14 }}>📧</div>
                <h3 style={{ fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>Check Your Email</h3>
                <p style={{ color: "#666", fontSize: "clamp(13px, 1.4vw, 14px)" }}>We've sent a 6-digit OTP to <strong style={{ color: "#f0a500" }}>{form.email}</strong></p>
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Enter OTP</label>
                <input value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} placeholder="6-digit code"
                  style={{ width: "100%", background: "#0d0d0d", border: "1px solid #333", borderRadius: 10, padding: 18, color: "#fff", fontSize: "clamp(20px, 5vw, 28px)", fontFamily: "monospace", outline: "none", textAlign: "center", letterSpacing: "clamp(8px, 3vw, 16px)", boxSizing: "border-box" }} />
              </div>
              <button onClick={handleVerifyOtp} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 16, fontSize: 15, fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>VERIFY & CREATE ACCOUNT ✓</button>
              <button onClick={() => setStep(1)} style={{ width: "100%", background: "none", color: "#666", border: "none", padding: 12, fontSize: 14, cursor: "pointer", marginTop: 10, WebkitTapHighlightColor: "transparent" }}>← Back to edit details</button>
            </>
          )}
          <div style={{ textAlign: "center", marginTop: 22, color: "#555", fontSize: 14 }}>
            Already have an account?{" "}
            <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: "#f0a500", fontWeight: 700, cursor: "pointer", fontSize: 14, WebkitTapHighlightColor: "transparent" }}>Login here</button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) { .mh-reg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function AdminPage({ requests, setRequests, addToast }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [newProduct, setNewProduct] = useState({ name: "", category: "machines", price: "", desc: "", tag: "New", badge: "✨" });
  const [editProduct, setEditProduct] = useState(null);
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  const stats = {
    totalRequests: requests.length,
    pending: requests.filter(r => r.status === "Pending").length,
    contacted: requests.filter(r => r.status === "Contacted").length,
    closed: requests.filter(r => r.status === "Closed").length,
    revenue: requests.filter(r => r.status === "Closed").reduce((s, r) => s + r.price, 0),
  };

  const updateStatus = (id, status) => {
    setRequests(p => p.map(r => r.id === id ? { ...r, status } : r));
    addToast(`Status updated to "${status}"`, "success");
  };

  const deleteProduct = (id) => {
    setProducts(p => p.filter(x => x.id !== id));
    addToast("Product removed", "success");
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) { addToast("Fill name and price", "error"); return; }
    const p = { ...newProduct, id: Date.now(), price: parseInt(newProduct.price), originalPrice: Math.round(parseInt(newProduct.price) * 1.15), specs: {}, img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" };
    setProducts(prev => [...prev, p]);
    setActiveTab("products");
    setNewProduct({ name: "", category: "machines", price: "", desc: "", tag: "New", badge: "✨" });
    addToast("Product added successfully!", "success");
  };

  const StatusBadge = ({ status }) => {
    const colors = { Pending: "#f0a500", Contacted: "#4488ff", Closed: "#00ff88" };
    return <span style={{ background: (colors[status] || "#aaa") + "22", color: colors[status] || "#aaa", borderRadius: 100, padding: "4px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{status}</span>;
  };

  const tabs = ["overview", "requests", "products", "add product"];

  const inputStyle = { width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: "#060606", minHeight: "100vh", color: "#fff", paddingTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 40px) 60px" }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Admin Panel</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 7vw, 56px)", letterSpacing: 2, color: "#fff" }}>DASHBOARD</h1>
        </div>

        {/* Tabs — desktop pill row */}
        <div className="mh-tabs-desktop" style={{ display: "flex", gap: 6, marginBottom: "clamp(24px, 4vw, 40px)", background: "#111", borderRadius: 14, padding: 6, width: "fit-content", flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ background: activeTab === t ? "#f0a500" : "none", color: activeTab === t ? "#000" : "#666", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: "clamp(12px, 1.3vw, 13px)", fontWeight: 700, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s", minHeight: 42, WebkitTapHighlightColor: "transparent" }}>{t}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div className="mh-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: "clamp(10px, 2vw, 20px)", marginBottom: "clamp(24px, 4vw, 40px)" }}>
              {[
                { label: "Total Requests", val: stats.totalRequests, icon: "📋", color: "#4488ff" },
                { label: "Pending",        val: stats.pending,       icon: "⏳", color: "#f0a500" },
                { label: "Contacted",      val: stats.contacted,     icon: "📞", color: "#aa88ff" },
                { label: "Closed Deals",   val: stats.closed,        icon: "✅", color: "#00ff88" },
                { label: "Total Value",    val: formatPrice(stats.revenue || 1), icon: "💰", color: "#ff6b00" },
                { label: "Products Listed",val: products.length,     icon: "🏭", color: "#ff4488" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: "clamp(18px, 3vw, 28px)" }}>
                  <div style={{ fontSize: "clamp(22px, 3.5vw, 32px)", marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 40px)", color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "#666", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Requests */}
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "clamp(16px, 3vw, 24px) clamp(18px, 3.5vw, 28px)", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: "clamp(15px, 2vw, 18px)" }}>Recent Requests</h3>
                <button onClick={() => setActiveTab("requests")} style={{ background: "none", border: "none", color: "#f0a500", cursor: "pointer", fontSize: 14, fontWeight: 700, WebkitTapHighlightColor: "transparent" }}>View All →</button>
              </div>
              {requests.slice(0, 3).map(r => (
                <div key={r.id} style={{ padding: "clamp(14px, 2.5vw, 20px) clamp(18px, 3.5vw, 28px)", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "clamp(13px, 1.5vw, 15px)" }}>{r.user}</div>
                    <div style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#666" }}>{r.product} • {r.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 700, color: "#f0a500", fontSize: "clamp(13px, 1.5vw, 15px)" }}>{formatPrice(r.price)}</div>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === "requests" && (
          <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "clamp(16px, 3vw, 24px) clamp(18px, 3.5vw, 28px)", borderBottom: "1px solid #1a1a1a" }}>
              <h3 style={{ fontWeight: 800, fontSize: "clamp(16px, 2.5vw, 20px)" }}>All Buy Requests ({requests.length})</h3>
            </div>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                <thead>
                  <tr style={{ background: "#0d0d0d" }}>
                    {["Customer", "Product", "Price", "Phone", "Date", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#555", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} style={{ borderTop: "1px solid #1a1a1a" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{r.user}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>{r.email}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#ccc", fontSize: 13, whiteSpace: "nowrap" }}>{r.product}</td>
                      <td style={{ padding: "14px 16px", color: "#f0a500", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{formatPrice(r.price)}</td>
                      <td style={{ padding: "14px 16px", color: "#888", fontSize: 13, whiteSpace: "nowrap" }}>{r.phone}</td>
                      <td style={{ padding: "14px 16px", color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{r.date}</td>
                      <td style={{ padding: "14px 16px" }}><StatusBadge status={r.status} /></td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          {["Pending", "Contacted", "Closed"].map(s => (
                            <button key={s} onClick={() => updateStatus(r.id, s)} disabled={r.status === s}
                              style={{ background: r.status === s ? "#1a1a1a" : "#0d0d0d", border: "1px solid #333", color: r.status === s ? "#555" : "#aaa", borderRadius: 8, padding: "6px 8px", fontSize: 11, cursor: r.status === s ? "default" : "pointer", fontWeight: 600, whiteSpace: "nowrap", minHeight: 34, WebkitTapHighlightColor: "transparent" }}>{s}</button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <button onClick={() => setActiveTab("add product")} style={{ background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", minHeight: 46, WebkitTapHighlightColor: "transparent" }}>+ Add New Product</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "clamp(12px, 2vw, 20px)" }}>
              {products.map(p => (
                <div key={p.id} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "clamp(140px, 18vw, 180px)", objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "clamp(14px, 2.5vw, 20px)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#f0a500", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</div>
                        <div style={{ fontWeight: 800, color: "#fff", fontSize: "clamp(13px, 1.6vw, 15px)" }}>{p.name}</div>
                      </div>
                      <div style={{ fontWeight: 800, color: "#f0a500", flexShrink: 0, fontSize: "clamp(13px, 1.6vw, 15px)" }}>{formatPrice(p.price)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                      <button onClick={() => setEditProduct(p)} style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", color: "#aaa", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", minHeight: 42, WebkitTapHighlightColor: "transparent" }}>Edit</button>
                      <button onClick={() => deleteProduct(p.id)} style={{ background: "#1a0a0a", border: "1px solid #ff4444", color: "#ff4444", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", minHeight: 42, WebkitTapHighlightColor: "transparent" }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT */}
        {activeTab === "add product" && (
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: 2, marginBottom: "clamp(20px, 3vw, 32px)" }}>ADD NEW PRODUCT</h2>
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: "clamp(20px, 5vw, 40px)" }}>
              <div className="mh-add-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 2vw, 20px)", marginBottom: "clamp(12px, 2vw, 20px)" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Product Name *</label>
                  <input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} placeholder="e.g. HydroPress X900" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, cursor: "pointer", WebkitAppearance: "none" }}>
                    <option value="machines">Machines</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Price (₹) *</label>
                  <input value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 450000" type="number" style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Tag</label>
                  <input value={newProduct.tag} onChange={e => setNewProduct(p => ({ ...p, tag: e.target.value }))} placeholder="e.g. Bestseller" style={inputStyle} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Description</label>
                  <textarea value={newProduct.desc} onChange={e => setNewProduct(p => ({ ...p, desc: e.target.value }))} placeholder="Product description..." rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: "unset" }} />
                </div>
              </div>
              <button onClick={addProduct} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>ADD PRODUCT →</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={!!editProduct} onClose={() => setEditProduct(null)}>
        {editProduct && (
          <div>
            <h2 style={{ fontSize: "clamp(18px, 3.5vw, 24px)", fontWeight: 900, color: "#fff", marginBottom: 22 }}>Edit Product</h2>
            {[
              { label: "Product Name", key: "name" },
              { label: "Price (₹)", key: "price", type: "number" },
              { label: "Tag", key: "tag" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                <input type={f.type || "text"} value={editProduct[f.key]} onChange={e => setEditProduct(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Description</label>
              <textarea value={editProduct.desc} rows={3} onChange={e => setEditProduct(p => ({ ...p, desc: e.target.value }))}
                style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <button onClick={() => {
              setProducts(p => p.map(x => x.id === editProduct.id ? { ...editProduct, price: parseInt(editProduct.price) } : x));
              setEditProduct(null);
              addToast("Product updated!", "success");
            }} style={{ width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000", border: "none", borderRadius: 12, padding: 16, fontSize: "clamp(14px, 1.8vw, 16px)", fontWeight: 800, cursor: "pointer", minHeight: 52, WebkitTapHighlightColor: "transparent" }}>SAVE CHANGES ✓</button>
          </div>
        )}
      </Modal>

      <style>{`
        @media (max-width: 480px) { .mh-add-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .mh-add-grid > div[style*="1 / -1"] { grid-column: 1 !important; } }
      `}</style>
    </div>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const { toasts, add: addToast, remove } = useToast();
  const isAdmin = user?.role === "admin";

  const addRequest = ({ product, user: u, form }) => {
    const newReq = {
      id: Date.now(),
      user: form.name || u?.name,
      email: u?.email || "",
      phone: form.phone,
      product: product.name,
      price: product.price,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      message: form.message,
    };
    setRequests(p => [newReq, ...p]);
    console.log("📧 EMAIL SENT TO ADMIN:", newReq.user, "for", newReq.product);
  };

  const pageMap = {
    home:     <HomePage setPage={setPage} />,
    catalog:  <CatalogPage user={user} setPage={setPage} addToast={addToast} addRequest={addRequest} />,
    query:    <QueryPage addToast={addToast} />,
    login:    <LoginPage setUser={setUser} setPage={setPage} addToast={addToast} />,
    register: <RegisterPage setPage={setPage} addToast={addToast} />,
    admin:    isAdmin
      ? <AdminPage requests={requests} setRequests={setRequests} addToast={addToast} />
      : <LoginPage setUser={setUser} setPage={setPage} addToast={addToast} />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { -webkit-text-size-adjust: 100%; }
        body { font-family: 'DM Sans', sans-serif; background: #060606; color: #fff; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #f0a500; border-radius: 3px; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        input:focus, textarea:focus, select:focus { border-color: #f0a500 !important; }
        img { max-width: 100%; }

        /* Responsive hero grid */
        @media (max-width: 768px) {
          .mh-hero-card { display: none !important; }
        }
      `}</style>
      <Toast toasts={toasts} remove={remove} />
      <Nav page={page} setPage={setPage} user={user} setUser={setUser} isAdmin={isAdmin} />
      {pageMap[page] || pageMap.home}
    </>
  );
}
