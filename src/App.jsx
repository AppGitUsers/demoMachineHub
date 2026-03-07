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
    <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          background: t.type === "success" ? "#00ff88" : t.type === "error" ? "#ff4466" : "#f0a500",
          color: "#000", padding: "12px 20px", borderRadius: 10, fontWeight: 700,
          cursor: "pointer", minWidth: 240, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          animation: "slideIn 0.3s ease", fontFamily: "inherit"
        }}>
          {t.msg}
        </div>
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
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0d0d0d", border: "1px solid #333", borderRadius: 20,
        maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto",
        padding: 32, position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "#222", border: "none",
          color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18
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
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Machines", key: "catalog" },
    { label: "Accessories", key: "catalog" },
    { label: "Query", key: "query" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,6,6,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid #1a1a1a" : "none",
      transition: "all 0.4s ease", padding: "0 40px"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: "linear-gradient(135deg, #f0a500, #ff6b00)",
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: "#000"
          }}>M</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, color: "#fff" }}>MachineHub</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l.label} onClick={() => setPage(l.key)} style={{
              background: "none", border: "none", color: page === l.key ? "#f0a500" : "#aaa",
              fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: 1,
              textTransform: "uppercase", fontFamily: "inherit", transition: "color 0.2s"
            }}>{l.label}</button>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              {isAdmin && (
                <button onClick={() => setPage("admin")} style={{
                  background: "#f0a500", color: "#000", border: "none", borderRadius: 8,
                  padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: 13
                }}>Admin Panel</button>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #f0a500, #ff6b00)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 14, color: "#000"
                }}>{user.name?.[0]?.toUpperCase() || "U"}</div>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{user.name?.split(" ")[0]}</span>
                <button onClick={() => { setUser(null); setPage("home"); }} style={{
                  background: "#1a1a1a", color: "#aaa", border: "1px solid #333",
                  borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer"
                }}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setPage("login")} style={{
                background: "none", border: "1px solid #333", color: "#fff",
                borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer",
                fontFamily: "inherit", fontWeight: 600
              }}>Login</button>
              <button onClick={() => setPage("register")} style={{
                background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
                border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13,
                cursor: "pointer", fontFamily: "inherit", fontWeight: 700
              }}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [count, setCount] = useState({ machines: 0, clients: 0, years: 0 });

  useEffect(() => {
    const targets = { machines: 500, clients: 1200, years: 18 };
    const duration = 2000;
    const steps = 60;
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
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "radial-gradient(ellipse at 30% 50%, #1a0800 0%, #060606 60%)",
        position: "relative", overflow: "hidden", paddingTop: 80
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(240,165,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute", top: "20%", right: "-10%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(240,165,0,0.15) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(240,165,0,0.12)", border: "1px solid rgba(240,165,0,0.3)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 24
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#f0a500", letterSpacing: 2, textTransform: "uppercase" }}>Trusted Industrial Machines</span>
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px, 8vw, 96px)",
              lineHeight: 0.95, letterSpacing: 2, marginBottom: 24, color: "#fff"
            }}>
              POWER YOUR<br />
              <span style={{ color: "#f0a500" }}>FACTORY</span><br />
              FLOOR
            </h1>

            <p style={{ color: "#888", fontSize: 17, lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Premium industrial machines and accessories from ₹30,000 to ₹7 Lakhs. Engineered for Indian manufacturing excellence.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => setPage("catalog")} style={{
                background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
                border: "none", borderRadius: 12, padding: "16px 36px", fontSize: 15,
                fontWeight: 800, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
                boxShadow: "0 0 40px rgba(240,165,0,0.4)", transition: "transform 0.2s"
              }}>Explore Machines →</button>
              <button onClick={() => setPage("query")} style={{
                background: "none", color: "#fff", border: "1px solid #333",
                borderRadius: 12, padding: "16px 36px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", transition: "border-color 0.2s"
              }}>Get a Quote</button>
            </div>
          </div>

          {/* Hero Machine Card */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "linear-gradient(145deg, #111, #1a1a1a)",
              border: "1px solid #222", borderRadius: 24, overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)"
            }}>
              <img src={MACHINES[0].img} alt="machine" style={{ width: "100%", height: 340, objectFit: "cover", opacity: 0.85 }} />
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Featured</div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{MACHINES[0].name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#f0a500" }}>{formatPrice(MACHINES[0].price)}</div>
                    <div style={{ fontSize: 13, color: "#666", textDecoration: "line-through" }}>{formatPrice(MACHINES[0].originalPrice)}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div style={{
              position: "absolute", top: -16, right: -16, background: "#00ff88",
              color: "#000", borderRadius: 12, padding: "8px 16px", fontWeight: 800, fontSize: 13
            }}>Bestseller 🔥</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "80px 40px", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, textAlign: "center" }}>
          {[
            { val: count.machines + "+", label: "Machines Sold", sub: "Across India" },
            { val: count.clients + "+", label: "Happy Clients", sub: "SMEs to Large Industries" },
            { val: count.years + "yrs", label: "Experience", sub: "In Industrial Equipment" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "32px 20px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#f0a500", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Our Collection</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, color: "#fff" }}>FEATURED MACHINES</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
            {MACHINES.slice(0, 3).map(m => <ProductCard key={m.id} product={m} setPage={() => {}} featured />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => setPage("catalog")} style={{
              background: "none", color: "#f0a500", border: "1px solid #f0a500",
              borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
              cursor: "pointer", letterSpacing: 1
            }}>View All Machines & Accessories →</button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, color: "#fff" }}>WHY MACHINEHUB?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 28 }}>
            {[
              { icon: "⚙️", title: "Premium Quality", desc: "Every machine undergoes 47-point quality inspection before delivery" },
              { icon: "🚀", title: "Pan-India Delivery", desc: "Fast and safe logistics to your factory anywhere in India" },
              { icon: "🛡️", title: "2-Year Warranty", desc: "Comprehensive warranty with on-site service by certified engineers" },
              { icon: "💰", title: "Best Price", desc: "Competitive pricing with EMI and financing options available" },
            ].map((f, i) => (
              <div key={i} style={{
                background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: 32,
                transition: "border-color 0.3s", cursor: "default"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#f0a500"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: "#fff" }}>{f.title}</div>
                <div style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, color: "#fff" }}>WHAT CLIENTS SAY</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: 32 }}>
                <div style={{ color: "#f0a500", fontSize: 22, marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: "#ccc", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #f0a500, #ff6b00)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 16, color: "#000"
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{t.name}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "100px 40px",
        background: "linear-gradient(135deg, #1a0800, #0d0d0d)",
        borderTop: "1px solid #1a1a1a"
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 2, color: "#fff", marginBottom: 20 }}>
            READY TO POWER UP?
          </h2>
          <p style={{ color: "#888", fontSize: 17, marginBottom: 40 }}>Talk to our experts today. We'll help you find the perfect machine for your production line.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("query")} style={{
              background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
              border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 16,
              fontWeight: 800, cursor: "pointer"
            }}>Send Query Now</button>
            <button onClick={() => setPage("catalog")} style={{
              background: "none", color: "#fff", border: "1px solid #444",
              borderRadius: 12, padding: "16px 40px", fontSize: 16,
              fontWeight: 700, cursor: "pointer"
            }}>Browse Catalog</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060606", borderTop: "1px solid #111", padding: "40px", textAlign: "center" }}>
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
          background: "#111", border: `1px solid ${hovered ? "#f0a500" : "#1a1a1a"}`,
          borderRadius: 20, overflow: "hidden", transition: "all 0.3s ease",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 60px rgba(240,165,0,0.15)" : "none",
          display: "flex", flexDirection: "column"
        }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={product.img} alt={product.name} style={{
            width: "100%", height: 220, objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)"
          }} />
          <div style={{
            position: "absolute", top: 16, left: 16,
            background: "#f0a500", color: "#000", borderRadius: 8,
            padding: "4px 12px", fontSize: 12, fontWeight: 800
          }}>{product.badge} {product.tag}</div>
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: "#00ff88", color: "#000", borderRadius: 8,
            padding: "4px 10px", fontSize: 12, fontWeight: 800
          }}>-{discount}%</div>
        </div>

        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 12, color: "#f0a500", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            {product.category}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{product.name}</h3>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{product.desc}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
              <div key={k} style={{ background: "#0d0d0d", borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 13, color: "#ccc", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#f0a500" }}>{formatPrice(product.price)}</div>
              <div style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}>{formatPriceFull(product.originalPrice)}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setShowDetails(true)} style={{
              flex: 1, background: "#1a1a1a", color: "#fff", border: "1px solid #333",
              borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s"
            }}>View Details</button>
            <button onClick={() => {
              if (!user) { setPage("login"); return; }
              onBuy(product);
            }} style={{
              flex: 1, background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
              border: "none", borderRadius: 10, padding: "12px", fontSize: 14,
              fontWeight: 800, cursor: "pointer"
            }}>Request to Buy</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={showDetails} onClose={() => setShowDetails(false)}>
        <div>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 12, marginBottom: 24 }} />
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{product.category}</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>{product.name}</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginBottom: 24 }}>{product.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} style={{ background: "#111", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 600, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#f0a500" }}>{formatPriceFull(product.price)}</div>
              <div style={{ fontSize: 14, color: "#555", textDecoration: "line-through" }}>{formatPriceFull(product.originalPrice)}</div>
            </div>
            <div style={{ background: "#00ff88", color: "#000", borderRadius: 8, padding: "6px 14px", fontWeight: 800 }}>Save {formatPriceFull(product.originalPrice - product.price)}</div>
          </div>
          <button onClick={() => {
            setShowDetails(false);
            if (!user) { setPage("login"); return; }
            onBuy(product);
          }} style={{
            width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
            border: "none", borderRadius: 12, padding: "16px", fontSize: 16,
            fontWeight: 800, cursor: "pointer"
          }}>Request to Buy →</button>
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

  return (
    <div style={{ background: "#060606", minHeight: "100vh", paddingTop: 100, color: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Our Inventory</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 2, color: "#fff", marginBottom: 16 }}>MACHINES & ACCESSORIES</h1>
          <p style={{ color: "#666", fontSize: 16 }}>Find the perfect equipment for your production line. Premium quality, competitive pricing.</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search machines, accessories..."
              style={{
                width: "100%", background: "#111", border: "1px solid #222", borderRadius: 12,
                padding: "14px 20px 14px 48px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box"
              }} />
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#555" }}>🔍</span>
          </div>

          {["all", "machines", "accessories"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#f0a500" : "#111", color: filter === f ? "#000" : "#aaa",
              border: "1px solid", borderColor: filter === f ? "#f0a500" : "#222",
              borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", textTransform: "capitalize"
            }}>{f === "all" ? "All Products" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}

          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            background: "#111", border: "1px solid #222", color: "#aaa",
            borderRadius: 10, padding: "12px 20px", fontSize: 14, cursor: "pointer",
            fontFamily: "inherit", outline: "none"
          }}>
            <option value="default">Sort by Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div style={{ color: "#555", fontSize: 14, marginBottom: 28 }}>{filtered.length} products found</div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
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
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{buyProduct.name}</h2>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f0a500", marginBottom: 28 }}>{formatPriceFull(buyProduct.price)}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Your Name", key: "name", placeholder: "Full name" },
                { label: "Phone Number", key: "phone", placeholder: "+91 98765 43210" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                  <input
                    value={buyForm[f.key]} onChange={e => setBuyForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10,
                      padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box"
                    }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Message (optional)</label>
                <textarea
                  value={buyForm.message} onChange={e => setBuyForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Any specific requirements, quantity, delivery timeline..."
                  rows={3}
                  style={{
                    width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10,
                    padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none",
                    resize: "vertical", boxSizing: "border-box"
                  }} />
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: 16, margin: "20px 0", fontSize: 13, color: "#777" }}>
              📧 A confirmation will be sent to <strong style={{ color: "#f0a500" }}>{user?.email}</strong> and our team will call you within 24 hours.
            </div>

            <button onClick={handleBuySubmit} style={{
              width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
              border: "none", borderRadius: 12, padding: "16px", fontSize: 16,
              fontWeight: 800, cursor: "pointer"
            }}>Submit Request →</button>
          </div>
        )}
      </Modal>
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
    <div style={{ background: "#060606", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>✅</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#f0a500", marginBottom: 16 }}>QUERY RECEIVED!</h2>
        <p style={{ color: "#777", fontSize: 16, marginBottom: 32 }}>Our sales team will reach out to you within 4 business hours. Check your email for confirmation.</p>
        <button onClick={() => setSent(false)} style={{
          background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
          border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 15, fontWeight: 800, cursor: "pointer"
        }}>Send Another Query</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#060606", minHeight: "100vh", paddingTop: 100, color: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 2, marginBottom: 16 }}>SEND A QUERY</h1>
          <p style={{ color: "#666", fontSize: 16 }}>Tell us what you need and we'll get back to you with the best solution.</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            {[
              { label: "Full Name *", key: "name", placeholder: "Your full name" },
              { label: "Email Address *", key: "email", placeholder: "you@company.com", type: "email" },
              { label: "Phone Number *", key: "phone", placeholder: "+91 98765 43210" },
              { label: "Company Name", key: "company", placeholder: "Your company" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                <input type={f.type || "text"}
                  value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                    padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box"
                  }} />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Machine of Interest</label>
              <select value={form.interest} onChange={e => setForm(p => ({ ...p, interest: e.target.value }))} style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                padding: "14px 16px", color: form.interest ? "#fff" : "#555", fontSize: 15,
                fontFamily: "inherit", outline: "none", cursor: "pointer", boxSizing: "border-box"
              }}>
                <option value="">Select a machine</option>
                {ALL_PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                <option value="other">Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Budget Range</label>
              <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                padding: "14px 16px", color: form.budget ? "#fff" : "#555", fontSize: 15,
                fontFamily: "inherit", outline: "none", cursor: "pointer", boxSizing: "border-box"
              }}>
                <option value="">Select budget</option>
                <option>₹30K – ₹1L</option>
                <option>₹1L – ₹2.5L</option>
                <option>₹2.5L – ₹5L</option>
                <option>₹5L – ₹7L</option>
                <option>Above ₹7L</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Your Message *</label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Describe your requirements in detail – application, material, production volume, delivery timeline, etc."
              rows={5}
              style={{
                width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit",
                outline: "none", resize: "vertical", boxSizing: "border-box"
              }} />
          </div>

          <button onClick={handleSubmit} style={{
            width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
            border: "none", borderRadius: 12, padding: "18px", fontSize: 16, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1
          }}>SEND QUERY →</button>
        </div>

        {/* Contact Info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 32 }}>
          {[
            { icon: "📞", label: "Call Us", val: "+91 98765 43210" },
            { icon: "📧", label: "Email", val: "sales@machinehub.in" },
            { icon: "📍", label: "Location", val: "Mumbai, Maharashtra" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: "#555", fontWeight: 600, marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 14, color: "#ccc", fontWeight: 600 }}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>
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
        // Check local registered users
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

  return (
    <div style={{
      background: "#060606", minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20,
      backgroundImage: "radial-gradient(ellipse at 50% 50%, #1a0800 0%, #060606 60%)"
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#f0a500", letterSpacing: 3, marginBottom: 8 }}>MachineHub</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#fff", letterSpacing: 2 }}>WELCOME BACK</h1>
          <p style={{ color: "#666", fontSize: 15 }}>Sign in to request machines and track orders</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: 40 }}>
          {[
            { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
            { label: "Password", key: "password", type: "password", placeholder: "Your password" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
              <input type={f.type}
                value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder={f.placeholder}
                style={{
                  width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                  padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit",
                  outline: "none", boxSizing: "border-box"
                }} />
            </div>
          ))}

          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #f0a500, #ff6b00)",
            color: loading ? "#777" : "#000", border: "none", borderRadius: 12, padding: "16px",
            fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: 8
          }}>
            {loading ? "Signing in..." : "SIGN IN →"}
          </button>

          <div style={{ textAlign: "center", marginTop: 24, color: "#555", fontSize: 14 }}>
            Don't have an account?{" "}
            <button onClick={() => setPage("register")} style={{
              background: "none", border: "none", color: "#f0a500", fontWeight: 700,
              cursor: "pointer", fontSize: 14
            }}>Register here</button>
          </div>

          <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 10, padding: 16, marginTop: 20, fontSize: 12, color: "#555" }}>
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
    const newUser = { name: form.name, email: form.email, phone: form.phone, company: form.company, password: form.password, role: "user" };
    users.push(newUser);
    localStorage.setItem("mh_users", JSON.stringify(users));
    addToast("Account created! Please login.", "success");
    setPage("login");
  };

  return (
    <div style={{
      background: "#060606", minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20,
      backgroundImage: "radial-gradient(ellipse at 50% 50%, #1a0800 0%, #060606 60%)"
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#f0a500", letterSpacing: 3, marginBottom: 8 }}>MachineHub</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#fff", letterSpacing: 2 }}>CREATE ACCOUNT</h1>
          <p style={{ color: "#666", fontSize: 15 }}>Join thousands of manufacturers across India</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32, padding: "0 20px" }}>
          {[1, 2].map((s, i) => (
            <>
              <div key={s} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= s ? "linear-gradient(135deg, #f0a500, #ff6b00)" : "#1a1a1a",
                border: `2px solid ${step >= s ? "#f0a500" : "#333"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, color: step >= s ? "#000" : "#555"
              }}>{s}</div>
              {i === 0 && <div style={{ flex: 1, height: 2, background: step >= 2 ? "#f0a500" : "#1a1a1a", margin: "0 12px" }} />}
            </>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginBottom: 32, fontSize: 12, color: "#555" }}>
          <span style={{ color: step >= 1 ? "#f0a500" : "#555" }}>Personal Info</span>
          <span style={{ color: step >= 2 ? "#f0a500" : "#555" }}>OTP Verification</span>
        </div>

        <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: 40 }}>
          {step === 1 ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { label: "Full Name *", key: "name", placeholder: "Your full name" },
                  { label: "Email *", key: "email", type: "email", placeholder: "you@company.com" },
                  { label: "Phone *", key: "phone", placeholder: "+91 98765 43210" },
                  { label: "Company", key: "company", placeholder: "Your company name" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6, display: "block" }}>{f.label}</label>
                    <input type={f.type || "text"}
                      value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                        padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit",
                        outline: "none", boxSizing: "border-box"
                      }} />
                  </div>
                ))}
              </div>
              {[
                { label: "Password *", key: "password", placeholder: "Min. 8 characters" },
                { label: "Confirm Password *", key: "confirmPassword", placeholder: "Repeat password" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 6, display: "block" }}>{f.label}</label>
                  <input type="password"
                    value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10,
                      padding: "12px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit",
                      outline: "none", boxSizing: "border-box"
                    }} />
                </div>
              ))}
              <button onClick={handleSendOtp} disabled={loading} style={{
                width: "100%", background: loading ? "#333" : "linear-gradient(135deg, #f0a500, #ff6b00)",
                color: loading ? "#777" : "#000", border: "none", borderRadius: 12, padding: "16px",
                fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", marginTop: 8
              }}>
                {loading ? "Sending OTP..." : "SEND OTP →"}
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Check Your Email</h3>
                <p style={{ color: "#666", fontSize: 14 }}>We've sent a 6-digit OTP to <strong style={{ color: "#f0a500" }}>{form.email}</strong></p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Enter OTP</label>
                <input value={otp} onChange={e => setOtp(e.target.value)} maxLength={6}
                  placeholder="6-digit code"
                  style={{
                    width: "100%", background: "#0d0d0d", border: "1px solid #333", borderRadius: 10,
                    padding: "18px", color: "#fff", fontSize: 28, fontFamily: "monospace",
                    outline: "none", textAlign: "center", letterSpacing: 16, boxSizing: "border-box"
                  }} />
              </div>

              <button onClick={handleVerifyOtp} style={{
                width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
                border: "none", borderRadius: 12, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer"
              }}>VERIFY & CREATE ACCOUNT ✓</button>

              <button onClick={() => setStep(1)} style={{
                width: "100%", background: "none", color: "#666", border: "none",
                padding: "12px", fontSize: 14, cursor: "pointer", marginTop: 12
              }}>← Back to edit details</button>
            </>
          )}

          <div style={{ textAlign: "center", marginTop: 24, color: "#555", fontSize: 14 }}>
            Already have an account?{" "}
            <button onClick={() => setPage("login")} style={{
              background: "none", border: "none", color: "#f0a500", fontWeight: 700,
              cursor: "pointer", fontSize: 14
            }}>Login here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function AdminPage({ requests, setRequests, addToast }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", category: "machines", price: "", desc: "", tag: "New", badge: "✨" });

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
    const p = {
      ...newProduct, id: Date.now(),
      price: parseInt(newProduct.price),
      originalPrice: Math.round(parseInt(newProduct.price) * 1.15),
      specs: {}, img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80"
    };
    setProducts(prev => [...prev, p]);
    setShowAddProduct(false);
    setNewProduct({ name: "", category: "machines", price: "", desc: "", tag: "New", badge: "✨" });
    addToast("Product added successfully!", "success");
  };

  const StatusBadge = ({ status }) => {
    const colors = { Pending: "#f0a500", Contacted: "#4488ff", Closed: "#00ff88" };
    return (
      <span style={{
        background: colors[status] + "22", color: colors[status],
        borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700
      }}>{status}</span>
    );
  };

  const tabs = ["overview", "requests", "products", "add product"];

  return (
    <div style={{ background: "#060606", minHeight: "100vh", color: "#fff", paddingTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ color: "#f0a500", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Admin Panel</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, color: "#fff" }}>DASHBOARD</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 40, background: "#111", borderRadius: 14, padding: 6, width: "fit-content" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              background: activeTab === t ? "#f0a500" : "none",
              color: activeTab === t ? "#000" : "#666",
              border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13,
              fontWeight: 700, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s"
            }}>{t}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
              {[
                { label: "Total Requests", val: stats.totalRequests, icon: "📋", color: "#4488ff" },
                { label: "Pending", val: stats.pending, icon: "⏳", color: "#f0a500" },
                { label: "Contacted", val: stats.contacted, icon: "📞", color: "#aa88ff" },
                { label: "Closed Deals", val: stats.closed, icon: "✅", color: "#00ff88" },
                { label: "Total Value", val: formatPrice(stats.revenue || 1), icon: "💰", color: "#ff6b00" },
                { label: "Products Listed", val: products.length, icon: "🏭", color: "#ff4488" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, padding: 28 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Requests */}
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontWeight: 800, fontSize: 18 }}>Recent Requests</h3>
                <button onClick={() => setActiveTab("requests")} style={{ background: "none", border: "none", color: "#f0a500", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>View All →</button>
              </div>
              {requests.slice(0, 3).map(r => (
                <div key={r.id} style={{ padding: "20px 28px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{r.user}</div>
                    <div style={{ fontSize: 13, color: "#666" }}>{r.product} • {r.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ fontWeight: 700, color: "#f0a500" }}>{formatPrice(r.price)}</div>
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
            <div style={{ padding: "24px 28px", borderBottom: "1px solid #1a1a1a" }}>
              <h3 style={{ fontWeight: 800, fontSize: 20 }}>All Buy Requests ({requests.length})</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0d0d0d" }}>
                    {["Customer", "Product", "Price", "Phone", "Date", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 12, color: "#555", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} style={{ borderTop: "1px solid #1a1a1a" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 700, color: "#fff" }}>{r.user}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>{r.email}</div>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#ccc", fontSize: 14 }}>{r.product}</td>
                      <td style={{ padding: "16px 20px", color: "#f0a500", fontWeight: 700 }}>{formatPrice(r.price)}</td>
                      <td style={{ padding: "16px 20px", color: "#888", fontSize: 14 }}>{r.phone}</td>
                      <td style={{ padding: "16px 20px", color: "#888", fontSize: 13 }}>{r.date}</td>
                      <td style={{ padding: "16px 20px" }}><StatusBadge status={r.status} /></td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          {["Pending", "Contacted", "Closed"].map(s => (
                            <button key={s} onClick={() => updateStatus(r.id, s)}
                              disabled={r.status === s}
                              style={{
                                background: r.status === s ? "#1a1a1a" : "#0d0d0d",
                                border: "1px solid #333", color: r.status === s ? "#555" : "#aaa",
                                borderRadius: 8, padding: "6px 10px", fontSize: 11,
                                cursor: r.status === s ? "default" : "pointer", fontWeight: 600
                              }}>{s}</button>
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
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <button onClick={() => setActiveTab("add product")} style={{
                background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
                border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer"
              }}>+ Add New Product</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {products.map(p => (
                <div key={p.id} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 20, overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, color: "#f0a500", fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</div>
                        <div style={{ fontWeight: 800, color: "#fff" }}>{p.name}</div>
                      </div>
                      <div style={{ fontWeight: 800, color: "#f0a500" }}>{formatPrice(p.price)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button onClick={() => setEditProduct(p)} style={{
                        flex: 1, background: "#1a1a1a", border: "1px solid #333", color: "#aaa",
                        borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer"
                      }}>Edit</button>
                      <button onClick={() => deleteProduct(p.id)} style={{
                        background: "#1a0a0a", border: "1px solid #ff4444", color: "#ff4444",
                        borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer"
                      }}>Delete</button>
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
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 2, marginBottom: 32 }}>ADD NEW PRODUCT</h2>
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 24, padding: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Product Name *</label>
                  <input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. HydroPress X900"
                    style={{ width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}
                    style={{ width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", cursor: "pointer", boxSizing: "border-box" }}>
                    <option value="machines">Machines</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Price (₹) *</label>
                  <input value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))}
                    placeholder="e.g. 450000" type="number"
                    style={{ width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Tag</label>
                  <input value={newProduct.tag} onChange={e => setNewProduct(p => ({ ...p, tag: e.target.value }))}
                    placeholder="e.g. Bestseller"
                    style={{ width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Description</label>
                  <textarea value={newProduct.desc} onChange={e => setNewProduct(p => ({ ...p, desc: e.target.value }))}
                    placeholder="Product description..." rows={4}
                    style={{ width: "100%", background: "#0d0d0d", border: "1px solid #222", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
              </div>
              <button onClick={addProduct} style={{
                width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
                border: "none", borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 800, cursor: "pointer"
              }}>ADD PRODUCT →</button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={!!editProduct} onClose={() => setEditProduct(null)}>
        {editProduct && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 24 }}>Edit Product</h2>
            {[
              { label: "Product Name", key: "name" },
              { label: "Price (₹)", key: "price", type: "number" },
              { label: "Tag", key: "tag" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>{f.label}</label>
                <input type={f.type || "text"} value={editProduct[f.key]}
                  onChange={e => setEditProduct(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 8, display: "block" }}>Description</label>
              <textarea value={editProduct.desc} rows={3}
                onChange={e => setEditProduct(p => ({ ...p, desc: e.target.value }))}
                style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <button onClick={() => {
              setProducts(p => p.map(x => x.id === editProduct.id ? { ...editProduct, price: parseInt(editProduct.price) } : x));
              setEditProduct(null);
              addToast("Product updated!", "success");
            }} style={{
              width: "100%", background: "linear-gradient(135deg, #f0a500, #ff6b00)", color: "#000",
              border: "none", borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 800, cursor: "pointer"
            }}>SAVE CHANGES ✓</button>
          </div>
        )}
      </Modal>
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
    // Simulate email notification
    console.log("📧 EMAIL SENT TO ADMIN: New buy request from", newReq.user, "for", newReq.product);
  };

  const pageMap = {
    home: <HomePage setPage={setPage} />,
    catalog: <CatalogPage user={user} setPage={setPage} addToast={addToast} addRequest={addRequest} />,
    query: <QueryPage addToast={addToast} />,
    login: <LoginPage setUser={setUser} setPage={setPage} addToast={addToast} />,
    register: <RegisterPage setPage={setPage} addToast={addToast} />,
    admin: isAdmin ? <AdminPage requests={requests} setRequests={setRequests} addToast={addToast} /> : <LoginPage setUser={setUser} setPage={setPage} addToast={addToast} />,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #060606; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #f0a500; border-radius: 3px; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        button:hover { opacity: 0.9; }
        input:focus { border-color: #f0a500 !important; }
        textarea:focus { border-color: #f0a500 !important; }
      `}</style>
      <Toast toasts={toasts} remove={remove} />
      <Nav page={page} setPage={setPage} user={user} setUser={setUser} isAdmin={isAdmin} />
      {pageMap[page] || pageMap.home}
    </>
  );
}
