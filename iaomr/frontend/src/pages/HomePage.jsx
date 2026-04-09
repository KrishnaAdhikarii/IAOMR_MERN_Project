import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import SchedulePage, { AboutPage, VenuePage, ContactPage } from "./SchedulePage";
import CommitteePage from "./CommitteePage";
import ImageSlider from "../components/ImageSlider";
import logo2 from '../images/event.png';
import logo from "../images/event.png"
// Countdown Component
function Countdown() {
  const target = new Date("2026-08-06T09:00:00");
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap", margin: "1.8rem 0" }}>
      {[
        ["Days", t.d],
        ["Hours", t.h],
        ["Minutes", t.m],
        ["Seconds", t.s],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{
            textAlign: "center",
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: 10,
            padding: "1rem 1.4rem",
            minWidth: 80,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#c9a84c",
              lineHeight: 1,
            }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,244,248,0.5)",
              marginTop: "0.3rem",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [announcements, setAnnouncements] = useState([]);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    api
      .get("/announcements")
      .then((r) => setAnnouncements(r.data.data || []))
      .catch(() => { });
  }, []);

  const stats = [
    { num: "3", label: "Days" },
    { num: "24th", label: "National Convention" },
    { num: "Aug 6–8", label: "2026" },
    { num: "Vizag", label: "City of Destiny" },
  ];

  const highlights = [
    { icon: "🎤", title: "Guest & Keynote Lectures", desc: "Eminent national faculty across oral medicine & radiology" },
    { icon: "📄", title: "Paper & Poster Presentations", desc: "Present your research to a national audience" },
    { icon: "🏆", title: "Best Paper / Poster Awards", desc: "Compete for prestigious awards at national level" },
    { icon: "🎊", title: "Gala Banquet", desc: "An evening of celebration at the City of Destiny" },
    { icon: "🔬", title: "Pre-Convention Courses", desc: "Hands-on workshops on day 1 for in-depth learning" },
    { icon: "🤝", title: "Professional Networking", desc: "Connect with peers and stalwarts from across India" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section id="home" style={{ minHeight: "90vh", width: "100%", display: "grid", backgroundColor: "#FFFDF6" }}>
        <div style={{
          height: "90vh", margin: 20, marginTop: 70, borderRadius: 12, display: "flex", overflow: "hidden", boxShadow: "0px 0px 20px rgba(0, 0, 0)", fontFamily: "sans-serif"
        }}>
          {/* LEFT SIDE */}
          <div
            style={{
              width: "40%",
              // height: "100%",
              padding: "20px",
              position: "sticky",
              borderRadius: "15",
              top: 0,
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // backgroundImage: `url(${bg})`,
              backgroundColor: "#FFF2E0",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#000000",
            }}
          >
            <div style={{
              marginLeft: '12%',
              marginTop: '10%',
            }}>
              <div style={{ display: 'flex',alignItems:'center',gap:'30px', }}>
                <div style={{
                  height:'100px',
                  width:'100px',
                  borderRadius:'50%'
                }}>
                  <img  style={{height:'100px',weight:'100px',borderRadius:'50%'}} src={logo} alt="logo" />
                </div>
                <div>
                  <p style={{
                    margin: "0 0 2px 0",
                    fontSize: "30px",
                    fontWeight: "600",
                    color: "#000000",
                    letterSpacing: "0.5px",
                    fontFamily: "'poppins',sans-serif",
                  }}>
                    24<sup style={{ fontSize: "19px" }}>th</sup> IAOMR
                  </p>
                  <h1 style={{
                    margin: "0 0 8px 0",
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    color: "#000000",
                    fontFamily: "'poppins',sans-serif",
                  }}>
                    National  PG Convention<br/>              2026
                  </h1>
                </div>
              </div>
              <p style={{
                margin: 0,
                fontSize: "23px",
                color: "#205295",
                fontWeight: "600",
                fontFamily: "'poppins',sans-serif",
              }}>
                Visakhapatanam, Andhra Pradesh
              </p>

              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #b7e4c7, transparent)",
                margin: "10px 0 20px 0",
              }} />

              <p style={{
                margin: "0 0 20px 0",
                fontSize: "24px",
                fontStyle: "italic",
                color: "#000000",
                textShadow: "0 0 2px rgb(255, 255, 255), 0 0 2px rgb(255, 255, 255), 0 0 10px rgb(255, 255, 255)",

                lineHeight: "1.6",
                fontFamily: "'poppins',sans-serif",
                borderLeft: "3px solid #ffffffc8",
                paddingLeft: "12px",
              }}>
                "Imagine - Innovate - Illuminate"
              </p>

              <p style={{
                margin: "0 0 20px 0",
                fontSize: "16px",
                color: "#000000",
                fontFamily: "'poppins',sans-serif",
              }}>
                Hosted by Dept. of OMR, ANIDS, Visakhapatnam.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "18px" }}>📅</span>
                <span style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#000000",
                  fontFamily: "'poppins',sans-serif",
                }}>
                  When: 06<sup style={{ fontSize: "18px" }}>th</sup> – 08<sup style={{ fontSize: "18px" }}>th</sup> August
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "28px" }}>
                <span style={{ fontSize: "16px", marginTop: "2px" }}>📍</span>
                <div style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#000000" }}>
                    ANIL NEERUKONDA INSTITUTE OF DENTAL SCIENCES

                  </p>
                  <p style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: "600", color: "#000000" }}>Visakhapatnam, Andhra Pradesh</p>
                </div>
              </div>

              {/* Buttons */}
              <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                  setHover(false);
                  setActive(false);
                }}
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "16px 36px",
                  border: "4px solid transparent",
                  fontSize: "16px",
                  backgroundColor: "white",
                  borderRadius: hover ? "12px" : "100px",
                  fontWeight: 600,
                  color: hover ? "#000" : "#1f387e",
                  boxShadow: active
                    ? "0 0 0 4px greenyellow"
                    : hover
                      ? "0 0 0 12px transparent"
                      : "0 0 0 2px #ffffff",
                  cursor: "pointer",
                  overflow: "hidden",
                  transform: active ? "scale(0.95)" : "scale(1)",
                  transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {/* Left Arrow */}
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    position: "absolute",
                    width: "24px",
                    fill: "#1f387e",
                    left: hover ? "16px" : "-25%",
                    transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>

                {/* Text */}
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    transform: hover ? "translateX(12px)" : "translateX(-12px)",
                    transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  REGISTER NOW
                </span>

                {/* Circle */}
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: hover ? "220px" : "20px",
                    height: hover ? "220px" : "20px",
                    backgroundColor: "#BDE8F5",
                    borderRadius: "50%",
                    opacity: hover ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
                  }}
                />

                {/* Right Arrow */}
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    position: "absolute",
                    width: "24px",
                    fill: "#1f387e",
                    right: hover ? "-25%" : "16px",
                    transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </button>
            </div>



            {/* <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Creative Studio</h1>
            <p style={{ fontSize: "18px", opacity: 0.7 }}>
              We design modern digital experiences that feel alive and interactive.
            </p> */}
          </div>

          {/* RIGHT SIDE - Image Slider */}
          <div style={{ height: "90vh", flex: 1, position: "relative" }}>
            <ImageSlider />
          </div>
        </div>
      </section >

      {/* Announcements */}
      {
        announcements.length > 0 && (
          <div style={{ background: "linear-gradient(90deg,#071120,#0f2235,#071120)", padding: "1rem 0", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
            <div className="container" style={{ display: "flex", gap: "1.5rem", overflowX: "auto" }}>
              {announcements.slice(0, 4).map((a) => (
                <div key={a._id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", whiteSpace: "nowrap", flexShrink: 0 }}>
                  <span
                    style={{
                      background: a.type === "important" ? "#e74c3c" : a.type === "deadline" ? "#c9a84c" : "#2e8b7a",
                      color: "#fff",
                      padding: "0.18rem 0.6rem",
                      borderRadius: 4,
                      fontSize: "0.65rem",
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {a.type}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(240,244,248,0.8)" }}>{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* About Page */}
      <section id="about">
        <AboutPage />
      </section>

      {/* Stats */}
      {/* <section className="light-section section-pad-sm">
        <div className="container">
          <div className="grid-4">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Highlights */}
      <section className="light-section section-pad" style={{backgroundColor:'#BDE8F5'}}>
        <div className="container">
          <div className="section-head" style={{ textAlign: "center" }}>
            <span className="section-tag">Convention Highlights</span>
            <h2 className="section-title">
              What to <em>Expect</em>
            </h2>
            <div className="gold-rule" style={{ margin: "0 auto 0" }} />
          </div>
          <div className="grid-3" style={{ marginTop: "2rem"}}>
            {highlights.map((h) => (
              <div key={h.title} className="card" style={{ padding: "1.8rem", textAlign: "center",backgroundColor:'#FFFDF6',boxShadow:'0 20 30px rgba(0, 0, 0, 0.76)' }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>{h.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--txt-dark)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {h.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--txt-mid)", lineHeight: 1.75 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule, Committee, Venue */}
      <section id="schedule">
        <SchedulePage />
      </section>
      <section id="committee">
        <CommitteePage />
      </section>
      <section id="venue">
        <VenuePage />
      </section>

      {/* CTA Banner */}
      <section className="dark-section" style={{ padding: "4rem 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: "0.5rem" }}>
            Ready to <em style={{ color: "#c9a84c" }}>Register</em>?
          </h2>
          <p style={{ color: "rgba(240,244,248,0.65)", marginBottom: "2rem", fontSize: "1rem" }}>
            Early bird rates available till 15th March 2026. Don't miss out!
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register-delegate" className="btn btn-primary">
              Register as Delegate
            </Link>
            <Link to="/submit-abstract" className="btn btn-gold">
              Submit Abstract
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ color: "rgba(240,244,248,0.8)", borderColor: "rgba(240,244,248,0.3)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
}