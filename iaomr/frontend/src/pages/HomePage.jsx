import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import SchedulePage, { RegisterationInfo, Office_bearers, AboutPage, VenuePage, AbstractInfo, ContactPage } from "./SchedulePage";
import CommitteePage from "./CommitteePage";
// import Office_bearers from "./SchedulePage";
import ImageSlider from "../components/ImageSlider";
import { useIsVisible } from "../components/isVisible";
import logo from "../images/event.png"
import araku from "../images/Araku_valley_view.jpg"
import kailashgiri from "../images/kailashgiri.jpeg"
import borra from "../images/borra.jpg"
import rushikonda from "../images/rushikonda.jpg"
import placeholder from "../images/img.jpg";

import hero from "../images/hero.png"




import v1 from "../images/vizag/v1.jpg"
import v2 from "../images/vizag/v2.jpeg"
import wave from "../images/beach.gif"
import college2 from "../images/college3.jpeg"


import v7 from "../images/vizag/v7.jpg"
import v8 from "../images/vizag/v8.jpg"
import v9 from "../images/vizag/v9.jpg"
import v10 from "../images/vizag/v10.jpg"
import v12 from "../images/vizag/v12.jpg"
import v13 from "../images/vizag/v13.jpg"
import v15 from "../images/vizag/v15.jpg"
import v16 from "../images/vizag/v16.jpg"
import v17 from "../images/vizag/v17.jpg"
import v18 from "../images/vizag/v18.jpg"
import v19 from "../images/vizag/v19.jpg"





// Countdown Component
function Countdown() {
  const eventDate = new Date("August 6, 2026 09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown_banner">
      <div className="countdown_content">

        {/* LEFT SIDE */}
        <div className="countdown_left">
          <h2>
            <i className="fa-regular fa-alarm-clock"></i>{" "}
            Remaining Time <br />
            For The Event
          </h2>
        </div>

        {/* CENTER TIMER */}
        <div className="countdown_timer">

          <div className="time_box">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>

          <span className="colon">:</span>

          <div className="time_box">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>

          <span className="colon">:</span>

          <div className="time_box">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>

          <span className="colon">:</span>

          <div className="time_box">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>

        </div>

      </div>
    </div >

  );
}

export default function HomePage() {
  const [announcements, setAnnouncements] = useState([]);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);




  const collegeContentRef = useRef(null);
  const isCollegeContentVisible = useIsVisible(collegeContentRef);

  const heroRef = useRef(null)
  const isHeroVisible = useIsVisible(heroRef)

  const exploreRef = useRef(null);
  const isExploreVisible = useIsVisible(exploreRef);




  const highlights = [
    { icon: <i class="fa-solid fa-file-pen"></i>, title: "Guest & Keynote Lectures", desc: "Eminent national faculty across oral medicine & radiology" },
    { icon: <i class="fa-solid fa-person-chalkboard"></i>, title: "Paper & Poster Presentations", desc: "Present your research to a national audience" },
    { icon: <i class="fa-solid fa-trophy"></i>, title: "Best Paper / Poster Awards", desc: "Compete for prestigious awards at national level" },
    { icon: <i class="fa-solid fa-hands-clapping"></i>, title: "Gala Banquet", desc: "An evening of celebration at the City of Destiny" },
    { icon: <i class="fa-solid fa-microscope"></i>, title: "Pre-Convention Courses", desc: "Hands-on workshops on day 1 for in-depth learning" },
    { icon: <i class="fa-solid fa-handshake"></i>, title: "Professional Networking", desc: "Connect with peers and stalwarts from across India" },
  ];

  return (
    <div>
      <section id="home" className="hero-section">
        <div className="hero-container">
          {/* LEFT SIDE */}
          <div className="hero-left">

            {/* 🎥 Background Video */}
            {/* <video className="hero-bg-video" autoPlay muted loop playsInline>
              <source src="wave" type="video/mp4" />
            </video> */}

            <div className="hero-left-inner">
              <div
                ref={heroRef}
                className={`tille ${isHeroVisible ? 'slide-up-in' : 'slide-down-out'}`}
                style={{ display: "flex", alignItems: "center", gap: "30px" }}
              >
                <div className="hero-logo-container">
                  <img src={logo} alt="logo" />
                </div>

                <div className="hero-title">
                  <h1>
                    24<sup>th</sup> IAOMR
                    <br />
                    NATIONAL
                    <br />
                    PG CONVENTION

                    2026
                  </h1>
                </div>
              </div>

              <p ref={heroRef} className={`hero-location ${isHeroVisible ? 'slide-up-in' : 'slide-down-out'}`}>
                Visakhapatanam, Andhra Pradesh
              </p>

              <div className="hero-divider" />
              <div style={{ paddingLeft: '50px' }}>
                <p ref={heroRef} className={`hero-quote ${isHeroVisible ? 'slide-up-in' : 'slide-down-out'}`}>
                  "Imagine - Innovate - Illuminate"
                </p>
              </div>



              <div ref={heroRef} className={`hero-date ${isHeroVisible ? 'slide-left-in' : 'slide-right-out'}`}>
                <span><i class="fa-solid fa-calendar"></i></span>
                <span>
                  06<sup>th</sup> – 08<sup>th</sup> AUGUST 2026
                </span>
              </div>
              <p className="hero-hosted">

              </p>
              <div ref={heroRef} className={`hero-location-info ${isHeroVisible ? 'slide-left-in' : 'slide-right-out'}`}>
                <span><i class="fa-solid fa-location-dot"></i></span>
                <div>
                  <p> Hosted by <br />
                    Department of Oral Medicine and Radiology <br />
                    ANIL NEERUKONDA INSTITUTE OF DENTAL SCIENCES</p>
                  {/* <p>VISAKHAPATNAM, ANDHRA PRADESH</p> */}
                </div>
              </div>
              <div style={{ display: 'flex', marginLeft: '150px' }}>
                <button
                  className={`hero-button ${hover ? "hover" : ""} ${active ? "active" : ""}`}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => {
                    setHover(false);
                    setActive(false);
                  }}
                  onMouseDown={() => setActive(true)}
                  onMouseUp={() => setActive(false)}
                >
                  <svg className="left-arrow" viewBox="0 0 24 24">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>

                  <span className="text">REGISTER NOW</span>
                  <span className="circle"></span>

                  <svg className="right-arrow" viewBox="0 0 24 24">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="hero-wave-text">
  Join us for a memorable 2026 convention!
</p>
            <svg class="hero-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(56, 191, 248, 0.35)"
                d="M0,160 C240,240 480,80 720,160 C960,240 1200,80 1440,160 L1440,320 L0,320 Z">
              </path>
            </svg>

            <svg class="hero-wave hero-wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="rgba(37,99,235,0.35)"
                d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 L1440,320 L0,320 Z">
              </path>
            </svg>
          </div>
          {/* RIGHT SIDE */}
          <div className="hero-right">
            <ImageSlider />
          </div>
        </div>
      </section>



      {/* About Page */}
      <section id="about">
        <AboutPage />
      </section>

      <section className="highlights" aria-labelledby="highlights-title">
        <div className="highlights-container">

          <h2 id="highlights-title" className="highlights-title">
            Conference Highlights
          </h2>

          <div className="highlights-grid">
            {highlights.map((h, index) => (
              <article key={h.title ?? index} className="highlights-card">

                <div className="highlights-icon">
                  {h.icon}
                </div>

                <h3 className="highlights-card-title">
                  {h.title}
                </h3>

                <p className="highlights-card-desc">
                  {h.desc}
                </p>

              </article>
            ))}
          </div>

        </div>
      </section>


      <section className="college-section">

        <div className="college-left">
          <img
            src={college2}
            alt="College"
            className="college-image"
          />
        </div>

        <div className="college-right">
          <div
            ref={collegeContentRef}
            className={`college-content ${isCollegeContentVisible ? 'fade-in' : 'fade-out'}`}>
            <h1>About Anil Neerukonda Institute of Dental Sciences, <br />Vishakapatnam</h1>
            <p>
              Anil Neerukonda Institute of Dental Sciences, popularly known as ANIDS, is one of the emerging dental institutions in Visakhapatnam. Established in 2013, the institute is committed to delivering high-quality dental education, clinical training, and community-oriented healthcare.

              Affiliated with Dr. NTR University of Health Sciences and recognized by the Dental Council of India, ANIDS follows a structured curriculum designed to meet national academic and professional standards. It offers undergraduate (BDS) and postgraduate (MDS) programs across multiple dental specialties.

              <br /><br />The campus is equipped with modern infrastructure, well-established departments, advanced laboratories, and a fully functional dental hospital. Students receive extensive hands-on clinical training by treating patients under expert supervision, helping them build strong practical skills and clinical confidence.

              <br /><br />ANIDS also strongly emphasizes community service and preventive dentistry through regular dental camps and outreach programs, actively contributing to oral health awareness in surrounding rural and urban areas.
            </p>
          </div>
        </div>

      </section>


      <div className="ticker2">
        <div className="ticker2-track">
          <div className="ticker2-item">
            ✶  IAOMR National PG Convention, 2026
          </div>
          <div className="ticker2-item">
            ✶  6<sup>th</sup> - 8<sup>th</sup> August
          </div>
          <div className="ticker2-item">
            ✶  ANIDS, Visakhapatnam
          </div>
          <div className="ticker2-item">
            ✶  Register Now
          </div>
          <div className="ticker2-item">
            ✶  IAOMR National PG Convention, 2026
          </div>
          <div className="ticker2-item">
            ✶  6<sup>th</sup> - 8<sup>th</sup> August
          </div>
          <div className="ticker2-item">
            ✶  ANIDS, Visakhapatnam
          </div>
          <div className="ticker2-item">
            ✶  Register Now
          </div>
        </div>
      </div>


      <section id="Office_Bearers">
        <Office_bearers />

      </section>

      <section id="committee">
        <CommitteePage /></section>

      <section id="registration-info">
        <RegisterationInfo />
      </section>
      <section id="countdown">
        <Countdown />
      </section>


      <section id="abstract">
        <AbstractInfo />
      </section>



      <section id="venue">
        <VenuePage />
      </section>


      <section id="hotels" className="hotels">
        <h2 className="hotel_heading">Recommended Hotels in Visakhapatnam</h2>

        <div className="hotel_container">
          <div className="hotel_card">
            <img className="hotel_img" src={placeholder} alt="Hotel The Park" />
            <div className="hotel_description">Hotel The Park</div>
          </div>

          <div className="hotel_card">
            <img className="hotel_img" src={placeholder} alt="Novotel" />
            <div className="hotel_description">Novotel Varun Beach</div>
          </div>

          <div className="hotel_card">
            <img className="hotel_img" src={placeholder} alt="Dolphin Hotel" />
            <div className="hotel_description">Dolphin Hotel</div>
          </div>

          <div className="hotel_card">
            <img className="hotel_img" src={placeholder} alt="Radisson Blu" />
            <div className="hotel_description">Radisson Blu</div>
          </div>
        </div>
      </section>

      <section>
        <div ref={exploreRef} className={`explore ${isExploreVisible ? 'slide-up-in' : 'slide-down-out'}`}>

          {/* Heading */}
          <div className="explore_heading">
            <h2>Explore Visakhapatnam</h2>
            <p>Discover some of the most iconic and breathtaking destinations in and around Visakhapatnam.</p>
          </div>

          {/* Pinterest Grid */}
          <div className="pinterest_grid">

            <div className="pin_card tall">
              <img src={araku} alt="Araku Valley" />
              <span>Araku Valley</span>
            </div>

            <div className="pin_card medium">
              <img src={borra} alt="Borra Caves" />
              <span>Borra Caves</span>
            </div>

            <div className="pin_card medium">
              <img src={kailashgiri} alt="Kailasagiri" />
              <span>Kailasagiri</span>
            </div>

            <div className="pin_card tall">
              <img src={rushikonda} alt="Rishikonda Beach" />
              <span>Rishikonda Beach</span>
            </div>
            <div className="pin_card tall">
              <img src={v2} alt="Beach Road" />
              <span>Simhachalam</span>
            </div>

            <div className="pin_card medium">
              <img src={v1} alt="INS Kursura Museum" />
              <span>INS Kursura Museum</span>
            </div>



          </div>
        </div>
      </section>


      <div className="ticker2">
        <div className="ticker2-track">
          <div className="ticker2-item">
            ✶  IAOMR National PG Convention, 2026
          </div>
          <div className="ticker2-item">
            ✶  6<sup>th</sup> - 8<sup>th</sup> August
          </div>
          <div className="ticker2-item">
            ✶  ANIDS, Visakhapatnam
          </div>
          <div className="ticker2-item">
            ✶  Register Now
          </div>
          <div className="ticker2-item">
            ✶  IAOMR National PG Convention, 2026
          </div>
          <div className="ticker2-item">
            ✶  6<sup>th</sup> - 8<sup>th</sup> August
          </div>
          <div className="ticker2-item">
            ✶  ANIDS, Visakhapatnam
          </div>
          <div className="ticker2-item">
            ✶  Register Now
          </div>
        </div>
      </div>
    </div >
  );
}