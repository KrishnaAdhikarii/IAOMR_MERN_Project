import { useEffect, useState, useRef } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import wave from '../images/wave.jpeg'
import { useNavigate } from 'react-router-dom';
import photo from "../images/OIP.jpeg";
import placeholder from "../images/img.jpg";
import hod from "../images/hod.png"
import { OfficeCard } from '../components/OfficeCard.jsx';


import { useIsVisible } from "../components/isVisible.jsx";


import v1 from "../images/vizag/v1.jpg"
import v4 from "../images/vizag/v4.jpg"
import v5 from "../images/vizag/v5.jpg"
import v6 from "../images/vizag/v6.jpg"
import v7 from "../images/vizag/v7.jpg"
import v8 from "../images/vizag/v8.jpg"
import v9 from "../images/vizag/v9.jpg"
import v10 from "../images/vizag/v10.jpg"
import v11 from "../images/vizag/v11.jpg"
import v12 from "../images/vizag/v12.jpg"
import v13 from "../images/vizag/v13.jpg"
import v14 from "../images/vizag/v14.jpg"
import v15 from "../images/vizag/v15.jpg"
import v16 from "../images/vizag/v16.jpg"
import v17 from "../images/vizag/v17.jpg"
import v18 from "../images/vizag/v18.jpg"
import v19 from "../images/vizag/v19.jpg"

import conv from "../images/conv.jpg"



// ── SCHEDULE PAGE ──
export function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0)
  const [schedule, setSchedule] = useState({})

  const [loading, setLoading] = useState(true)





  const defaultSchedule = {
    1: [
      { startTime: '9:00 am', endTime: '9:30 am', title: 'Inauguration of Pre-Conference Course', type: 'inauguration' },
      { startTime: '9:30 am', endTime: '1:00 pm', title: 'Pre-Conference Courses', type: 'session' },
      { startTime: '1:00 pm', endTime: '2:00 pm', title: 'Lunch', type: 'break' },
      { startTime: '2:00 pm', endTime: '4:00 pm', title: 'Scientific Sessions', type: 'session' },
    ],
    2: [
      { startTime: '8:00 am', endTime: '10:00 am', title: 'Registration / Breakfast / Scientific Sessions', type: 'registration' },
      { startTime: '10:00 am', endTime: '10:45 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '10:45 am', endTime: '11:30 am', title: 'Keynote Lecture', type: 'lecture' },
      { startTime: '11:30 am', endTime: '12:30 pm', title: 'Inauguration Ceremony', type: 'inauguration' },
      { startTime: '12:30 pm', endTime: '1:30 pm', title: 'Lunch', type: 'break' },
      { startTime: '1:30 pm', endTime: '2:15 pm', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '2:15 pm', endTime: '5:30 pm', title: 'Scientific Sessions – Papers / Posters', type: 'session' },
      { startTime: '7:00 pm', endTime: '', title: '🎊 Gala Banquet', type: 'social' },
    ],
    3: [
      { startTime: '8:00 am', endTime: '9:00 am', title: 'Breakfast / Scientific Sessions', type: 'session' },
      { startTime: '9:00 am', endTime: '10:00 am', title: 'Scientific Sessions – Papers / Posters', type: 'session' },
      { startTime: '10:00 am', endTime: '10:45 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '10:45 am', endTime: '11:30 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '11:30 am', endTime: '11:45 am', title: '☕ Tea Break', type: 'break' },
      { startTime: '11:45 am', endTime: '12:30 pm', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '12:30 pm', endTime: '1:30 pm', title: 'Panel Discussion', type: 'session' },
      { startTime: '1:30 pm', endTime: '2:30 pm', title: 'Lunch', type: 'break' },
      { startTime: '2:30 pm', endTime: '', title: 'Valedictory Ceremony', type: 'valedictory' },
    ],
  }

  useEffect(() => {
    api.get('/schedule')
      .then(r => { const d = r.data.data; if (Object.values(d).some(a => a.length > 0)) setSchedule(d); else setSchedule(defaultSchedule) })
      .catch(() => setSchedule(defaultSchedule))
      .finally(() => setLoading(false))
  }, [])

  const days = [
    { label: 'Day 1', sub: 'Pre-Convention', date: '6th August 2026' },
    { label: 'Day 2', sub: 'Convention', date: '7th August 2026' },
    { label: 'Day 3', sub: 'Convention', date: '8th August 2026' },
  ]
  const typeColor = { session: 'var(--card-box)', lecture: '#2e8b7a', break: '#856404', inauguration: 'var(--gold)', social: '#8e44ad', valedictory: '#e74c3c', registration: '#2980b9' }

  return (
    <><div className='schedule page'>
      Schedule Will be updated shortly
    </div></>
  )
}

// ── ABOUT PAGE ──
export function AboutPage() {
  const textRef = useRef(null);
  const messageRef = useRef(null);
  const welcome_textRef = useRef(null);






  const textVisible = useIsVisible(textRef);
  const messageVisible = useIsVisible(messageRef);
  const welcome_textVisible = useIsVisible(welcome_textRef);



  return (
    <>
      <div className="welcome">
        <div className="welcome_content">

          {/* Left Side Images */}
          <div ref={welcome_textRef} className={`welcome_images ${ welcome_textVisible ? 'slide-up-in': 'slide-down-out'}`}>
            <img src={placeholder} alt="Oval 1" className="welcome_image img_left" />
            <img src={placeholder} alt="Oval 2" className="welcome_image img_right" />
          </div>

          {/* Right Side Text */}
          <div
            ref={welcome_textRef}
            className={`welcome_textRef ${welcome_textVisible ? "slide_left_in" : "slide_right_out"}`}
          >
            <h1 className="welcome_title">
              Welcome to 24th IAOMR National PG Convention
            </h1>

            <p className="welcome_description">
              The IAOMR National PG Convention brings together Oral Medicine and Radiology professionals for a dynamic exchange of scientific knowledge, clinical excellence, and technological advancement.
              <br /><br />
              Join leading clinicians, researchers, practitioners, and industry innovators as we explore emerging technologies, advanced treatment methodologies, and the future of patient-centered dentistry.
            </p>

            <h4 className="welcome_subtitle">Networking & Professional Exchange</h4>
            <p className="welcome_text_small">
              Connect with peers, senior clinicians, and faculty members to exchange ideas and strengthen professional relationships.
            </p>

            <h4 className="welcome_subtitle">Renowned Faculty & Speakers</h4>
            <p className="welcome_text_small">
              Field-leading experts supporting innovation, research, and education in Oral Medicine & Radiology.
            </p>
          </div>

        </div>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          <div className="ticker-item">
            IAOMR * National PG Convention * 2026 *
          </div>
          <div className="ticker-item">
            IAOMR * National PG Convention * 2026 *
          </div>
        </div>
      </div>

      <div className="message">
        <div
          ref={messageRef}
          className={`message-content ${messageVisible ? "slide-up-in" : "slide-down-out"}`}
        >
          <h2 className="message-title">
            A Message from the Organizing Chairman
          </h2>

          <p className="bold">Dear Delegates,</p>

          <p>
            It is my great pleasure and honor to welcome you to the National Convention of Oral Medicine and Radiology, themed <strong>"Imagine, Innovate and Illuminate"</strong>. This year's convention offers a vibrant academic programme designed to enrich delegates' knowledge and promote collaborative research.
            <br /><br />
            The convention provides an excellent forum to update your knowledge, explore recent research advances, innovations, and evolving treatment modalities, while enjoying meaningful professional networking. Your visit to the City of Destiny will be professionally rewarding and memorable.
          </p>
          <br />
          <p className="bold">With Warm Regards</p>

          <p className="signature">
            Dr. B. Badari Ramakrishna<br />
            Organizing Chairman<br />
            24th IAOMR National PG Convention
          </p>
        </div>

        <div className="message-img">
          <img
            src={hod}
            alt="Chairman"
          />
        </div>
      </div>
    </>
  )
}
//---Office Bearers Page ---
import prasanth from "../images/Dr-Prasanth-Shenoy.png"
import avinash from "../images/dr-Avinash.png"
import ajay from "../images/Dr-Ajay-Parihar.png"
import shiva from "../images/Dr-Shiva-Prasad.png"
import sreenivas from "../images/Dr-Sreenivasan.png"
import krishna from "../images/Dr-Sri-Krishna.png"
export function Office_bearers() {

  const officeRef = useRef(null)
  const officeVisible = useIsVisible(officeRef)

  const members = [
    {
      name: "Dr Prashanth Shenoy",
      designation: "President",
      // img: photo,
      img: prasanth,
    },
    {
      name: "Dr Avinash Tejasvi M L",
      designation: "Hon. Gen. Secretary",
      img: avinash

    },
    {
      name: "Dr Ajay Pratap Singh Parihar",
      designation: "Head Office Treasurer",
      img: ajay
    },
    {
      name: "Dr V Sreenivasan",
      designation: "President Elect",
      img: "../images/Dr-Ajay-Parihar.png",
      img: sreenivas

    },
    {
      name: "Dr Sri Krishna K",
      designation: "Imm. Past President",
      img: "/assets/images/teams/Krishna.png",
      img: krishna

    },
    {
      name: "Dr Shiva Prasad S",
      designation: "Imm. Past Secretary",
      img: "/assets/images/teams/Shiva.png",
      img: shiva

    },
  ];

  return (
    <div ref={officeRef} className={`office-page ${officeVisible ? "slide-up-in" : "slide-down-out"}`}>
      <h1 className="office-title">IAOMR Office Bearers</h1>

      <div className="office-grid">
        {members.map((m, i) => (
          <OfficeCard
            key={i}
            name={m.name}
            designation={m.designation}
            img={m.img}
          />
        ))}
      </div>

      <div className="btn-wrapper">
        <button className="read_more_btn" >
          View More <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  );
}




// ── COMMITTEE PAGE ──
export function CommitteePage() {
  const committeeRef = useRef(null)
  const committeeVisible = useIsVisible(committeeRef)

  const orgTeam = [
    {
      name: "Dr. B. Badari Ramakrishna",
      role: "Organizing Chairman",
      img: "/assets/team/badari.png",
      img: photo
    },
    {
      name: "Dr. V. Rahul Marshal",
      role: "Organizing Secretary",
      img: "/assets/team/rahul.png",
      img: photo

    },
    {
      name: "Dr. N. Rajesh",
      role: "Scientific Chairman",
      img: "/assets/team/rajesh.png",
      img: photo

    },
    {
      name: "Dr. K. V. Lokesh",
      role: "Treasurer",
      img: "/assets/team/lokesh.png",
      img: photo

    },
    {
      name: "Dr. G. Upendra",
      role: "Joint Secretary",
      img: "/assets/team/upendra.png",
      img: photo

    },
  ];

  return (
    <div ref={committeeRef} className={`committee-page ${committeeVisible ? "slide-up-in" : "slide-down-out"}`}>
      <section className="chief_patron">

        {/* HEADING */}
        <h2 className="chief_heading">Chief Patron</h2>

        {/* CONTENT ROW */}
        <div className="chief_row">

          {/* LEFT TEXT */}
          <div className="chief_text">
            <h3>Dr. L. Vamsi Krishna Reddy</h3>
            <p>Principal</p>
            <span>
              Anil Neerukonda Institute of Dental Sciences
            </span>
          </div>

          {/* RIGHT IMAGE */}
          <div className="chief_photo">
            <img src={photo} alt="Chief Patron" />
          </div>

        </div>

      </section>
      <h1 className="committee-title">Organizing Committee 2026</h1>


      {/* ORGANIZING TEAM */}
      <section>

        <div className="committee-grid">
          {orgTeam.map((m, i) => (
            <OfficeCard
              key={i}
              name={m.name}
              designation={m.role}   // same prop reused
              img={m.img}
            />
          ))}
        </div>
      </section>
      <div className="btn-wrapper">
        <button className="read_more_btn" >
          View More <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  );
}
export function RegisterationInfo() {
  const registrationInfoRef = useRef(null);
  const registrationInfoVisible = useIsVisible(registrationInfoRef);

  return (
    <div ref={registrationInfoRef} className={`registration_info ${registrationInfoVisible ? "slide-up-in" : "slide-down-out"}`}>

      <h2 className="registration_info_title">
        Registration Charges
      </h2>

      <p className="registration_info_subtitle">
        Choose your category and secure your participation at IAOMR 2026.
      </p>

      <div className="registration_info_table_wrapper">
        <div className="registration_info_table_glass">
          <table className="registration_info_table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Till 15 March 2026</th>
                <th>Till 30 April 2026</th>
                <th>Till 10 July 2026</th>
                <th>Spot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Student Delegate</td>
                <td>7080/-</td>
                <td>7670/-</td>
                <td>8850/-</td>
                <td>9440/-</td>
              </tr>
              <tr>
                <td>Faculty Delegate</td>
                <td>7670/-</td>
                <td>8260/-</td>
                <td>9440/-</td>
                <td>10030/-</td>
              </tr>
              <tr>
                <td>Accompanying Person</td>
                <td>4720/-</td>
                <td>5310/-</td>
                <td>6490/-</td>
                <td>6490/-</td>
              </tr>
              <tr>
                <td>Foreign Delegate</td>
                <td>$200</td>
                <td>$200</td>
                <td>$225</td>
                <td>$225</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="registration_info_note">
        *All registration charges mentioned above are inclusive of applicable GST
        <span style={{ display: 'block', marginTop: 4, fontSize: '1.3 rem', fontWeight: 600, opacity: 1, }}>Registration includes</span>
        2 breakfasts, 2 lunches,  1 Gala banquet, registration kit,<br />
        gift and attendance certificate
      </p>

      <div className="registration_info_points">

        <p></p>
        <p>*Fees are non-refundable and non-transferable.</p>
        <p>Spot registrations are not eligible for gifts.</p>
        <p>Accommodation & transportation are not included.</p>

      </div>

    </div>

  )
}

// ── VENUE PAGE ──
export function VenuePage() {
  const attractions = [
    { icon: '🏖️', name: 'RK Beach', desc: 'Iconic beach on the Bay of Bengal' },
    { icon: '⛰️', name: 'Kailasagiri', desc: 'Hill park with panoramic sea views' },
    { icon: '🚡', name: 'Rope Way', desc: 'Cable car ride over the city' },
    { icon: '🦁', name: 'Indira Gandhi Zoo', desc: 'Tiger reserve and zoo park' },
    { icon: '✈️', name: 'TU-142 Aircraft Museum', desc: 'Decommissioned naval aircraft on display' },
    { icon: '🚢', name: 'Submarine Museum', desc: 'INS Kursura submarine museum' },
    { icon: '🌉', name: 'Glass Bridge', desc: 'Sky walk with glass floor' },
    { icon: '🛕', name: 'Simhachalam Temple', desc: 'Ancient Vaishnavite shrine' },
    { icon: '🌄', name: 'Araku Valley', desc: 'Scenic hill station with coffee estates' },
    { icon: '🦇', name: 'Borra Caves', desc: 'Million-year-old limestone caves' },
    { icon: '❄️', name: 'Lambasingi', desc: 'The "Kashmir of Andhra Pradesh"' },
    { icon: '💧', name: 'Devarapalli Falls', desc: 'Scenic waterfall near the city' },
  ]
  const venueRef = useRef(null);
  const cityRef = useRef(null);
  const venue_Visible = useIsVisible(venueRef);
  const city_Visible = useIsVisible(cityRef);

  return (
    <><div className="Venue Page">
      <section className="venue-section">
        <div ref={venueRef}
          className={`venue-container ${venue_Visible ? "slide-up-in" : "slide-down-out"}`}>

          <div className="venue-head">
            <span className="venue-tag">Venue</span>

            <h1 className="venue-title">
              Anil Neerukonda Institute of Dental Sciences, Visakhapatnam
            </h1>
          </div>

          <div className="venue-content">

            <div className="venue-image">
              <img
                src={placeholder}
                alt="Venue"
              />
            </div>

            <div className="venue-map">
              <iframe
                title="Venue Location"
                src="https://www.google.com/maps?q=Anil+Neerukonda+Institute+of+Dental+Sciences+Visakhapatnam&output=embed"
                loading="lazy"
                allowFullScreen
              ></iframe>
              <div className='venue-name' style={{ textShadow: '0px 1px 02px #000' }}>
                <i className="fa-solid fa-location-arrow"></i>                Anil Neerukonda Institute of Dental Sciences, <br />Visakhapatnam <br />
                <button className="maps-button">Get Directions  ➜</button></div>
            </div>

          </div>

        </div>
      </section>

      <section className="City-section">
        <div ref={cityRef} className={`city-text ${city_Visible ? "slide-up-in" : "slide-down-out"}`}>
          <h2 className="city-title">
            Discover <br /><em>Visakhapatnam</em>
          </h2>
          <p className="city-description">
            Visakhapatnam, often called Vizag, is a vibrant coastal city on India’s eastern shoreline. Known for its calm beaches, green hills, and rapidly growing urban landscape, the city beautifully blends natural serenity with industrial and educational progress.

            <br /><br />As one of the most important cities in Andhra Pradesh, Visakhapatnam offers an inspiring environment where healthcare, education, research, and maritime excellence come together, making it an ideal destination for academic exchange, conferences, and professional collaboration.
          </p>
          <p className="city-description">
            <br /><span>🏛️ Coastal City with Rich Natural & Cultural Heritage<br /></span>

            Visakhapatnam is known for its scenic coastline, cultural diversity, and historical significance. The city is home to popular landmarks such as Ramakrishna Beach, a serene stretch of shore ideal for relaxation and sunrise views, and Kailasagiri, a hilltop park offering panoramic views of the Bay of Bengal.


            <br /><br /><span>🎓 Hub for Education, Industry & Growth<br /></span>

            Visakhapatnam is rapidly emerging as a centre for education, research, and industrial development. With reputed institutions, medical colleges, and expanding research facilities, the city plays a key role in advancing science, healthcare, and innovation in the region.


            <br /><br /><span>🚢 Strategic Port City with Global Connectivity<br /></span>

            A major strength of Visakhapatnam is its maritime importance, anchored by the Visakhapatnam Port Authority, one of India’s key seaports that supports trade and economic development.

            The city is well-connected through roadways, railways, and the Visakhapatnam International Airport, ensuring smooth access for national and international visitors. </p>
        </div>

        <div ref={cityRef} className={`city-images ${city_Visible ? "slide-left-in" : "slide-right-out"}`}>
          <div className="photos_row1">
            <div>
              <img style={{height:'380px'}} src={v11} alt="City 1" />
            </div>
            <div>
              <img src={v4} alt="City 2" />
              <img src={v14} alt="City 3" />
            </div>
          </div>

          <div className="photos_row2">
            <img src={v6} alt="City 4" />
            <img src={v5} alt="City 5" />
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
    </div>
    </>
  )
}
export function AbstractInfo() {
  const abstractInfoRef = useRef(null);
  const abstractInfoVisible = useIsVisible(abstractInfoRef);

  return (
    <section className="abstract_info">
      <div className="abstract_info_image">
        <img src={conv} alt="IAOMR Abstract Submission Illustration" />
      </div>

      <div ref={abstractInfoRef} className={`abstract_info_text ${abstractInfoVisible ? "slide-left-in" : "slide-right-out"}`}>
        <h2 className="abstract_info_title">
          Abstract Submission
        </h2>

        <p>
          We invite you to submit your research abstracts for the 24th IAOMR National PG Convention, 2026. This is a fantastic opportunity to share your work with leading experts in Oral Medicine and Radiology.
        </p>

        <p>
          Accepted abstracts will be presented as oral or poster presentations during the convention, providing a platform for networking and collaboration.
        </p>

        <p>
          Join us in making this convention a hub of scientific exchange and professional growth. We look forward to welcoming you to Visakhapatnam in August 2026!
        </p>

        <button className="abstractInfo_button" disabled>
          Submissions Opening Soon
        </button>
      </div>
    </section>
  )
}




// ── CONTACT PAGE ──


export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      number: "",
      message: "",
    });
  };

  return (
    <>
      <div className="contact_wrapper">
        <div className="contact_layout">

          {/* LEFT SIDE */}
          <div className="contact_left">
            <h1 className="contact_heading">Contact Us</h1>
            <p className="contact_subheading">
              Feel free to contact us at any time for any questions or inquiries you may have.
              We're always available to assist you.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="contact_right">
            <form className="contact_form" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="contact_input"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="contact_input"
                required
              />

              <input
                type="tel"
                name="number"
                placeholder="Your Phone Number"
                value={formData.number}
                onChange={handleChange}
                className="contact_input"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="contact_textarea"
                required
              />

              <button type="submit" className="contact_button">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      \    </>
  );
};

export function ContactPage2() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Message sent! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contacts = [
    { name: 'Dr. B. Badari Ramakrishna', role: 'Organizing Chairman', phone: '+91 9885426232' },
    { name: 'Dr. V. Rahul Marshal', role: 'Organizing Secretary', phone: '+91 9848720046' },
    { name: 'Dr. N. Rajesh', role: 'Scientific Chairman', phone: '+91 9885067499' },
    { name: 'Dr. K. V. Lokesh', role: 'Treasurer', phone: '+91 9885164196' },
  ]
  const students = [
    { name: 'Dr. Samruth Unnisa', phone: '6304905152' },
    { name: 'Dr. K. Sharon', phone: '9502085963' },
    { name: 'Dr. Y. Madhusudhan Rao', phone: '9160743909' },
  ]

  return (
    <div className="light-section" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title"><em>Contact</em> Us</h1>
          <div className="gold-rule" />
        </div>
        <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
          {/* Contact form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--card-box)', marginBottom: '1.5rem' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} required placeholder="Dr. Your Name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} required placeholder="you@email.com" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={form.subject} onChange={e => f('subject', e.target.value)} placeholder="Subject" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-textarea" value={form.message} onChange={e => f('message', e.target.value)} required rows={5} placeholder="Your message..." />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: 0 }}>
              <div className="card-header">Organizing Committee</div>
              <div className="card-body">
                {contacts.map(c => (
                  <div key={c.phone} style={{ paddingBottom: '0.9rem', marginBottom: '0.9rem', borderBottom: '1px solid rgba(88,131,163,0.1)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--txt-dark)' }}>{c.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.role}</div>
                    <a href={`tel:${c.phone}`} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.98rem', color: 'var(--card-box)', textDecoration: 'none' }}>{c.phone}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="card-header">Student Coordinators</div>
              <div className="card-body">
                {students.map(s => (
                  <div key={s.phone} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', marginBottom: '0.6rem', borderBottom: '1px solid rgba(88,131,163,0.08)' }}>
                    <span style={{ fontSize: '0.88rem', color: 'var(--txt-dark)' }}>{s.name}</span>
                    <a href={`tel:${s.phone}`} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--teal)', textDecoration: 'none' }}>{s.phone}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: '1.2rem', background: 'rgba(201,168,76,0.07)', borderColor: 'rgba(201,168,76,0.25)' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>Convention Venue</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--txt-dark)', lineHeight: 1.8 }}>
                Anil Neerukonda Institute of Dental Sciences<br />
                Sangivalasa, Visakhapatnam<br />
                Andhra Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
