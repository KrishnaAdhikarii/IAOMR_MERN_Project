import { Link } from 'react-router-dom'
import {
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi'

export default function Footer() {

  const quickLinks = [
    { to: '/about', label: 'About Convention' },
    { to: '/schedule', label: 'Scientific Schedule' },
    { to: '/committee', label: 'Committee' },
    { to: '/venue', label: 'Venue & Tourism' },
    { to: '/register-delegate', label: 'Register Now' },
    { to: '/submit-abstract', label: 'Submit Abstract' },
    { to: '/contact', label: 'Contact Us' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0c1a34] via-[#1b2e57] to-[#0f2040] text-white mt-20">

      {/* GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.18),transparent_40%)] pointer-events-none" />

      {/* CONTAINER */}
      <div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-10 xl:px-16 py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-extrabold tracking-wide">
            IAOMR 2026
          </h2>

          <p className="mt-3 text-[#c9a84c] uppercase tracking-[0.18em] text-sm font-bold">
            24th National PG Convention
          </p>

          <p className="mt-6 text-white/70 leading-8 text-[15px]">
            Department of Oral Medicine & Radiology
            <br />
            ANIDS, Visakhapatnam
            <br />
            Andhra Pradesh
          </p>

          <div className="mt-8 w-fit rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-4 font-bold tracking-wider text-[#c9a84c]">
            Imagine · Innovate · Illuminate
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-bold relative pb-4 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-12 after:rounded-full after:bg-[#c9a84c]">
            Quick Links
          </h3>

          <div className="mt-8 flex flex-col gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* STUDENT COORDINATORS */}
        <div>
          <h3 className="text-xl font-bold relative pb-4 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-12 after:rounded-full after:bg-[#c9a84c]">
            Student Coordinators
          </h3>

          <div className="mt-8 space-y-5">

            {/* CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
              <span className="block font-bold text-lg">
                Dr. Samruth Unnisa
              </span>

              <a
                href="tel:+916304905152"
                className="mt-3 flex items-center gap-3 text-white/70 hover:text-[#c9a84c] transition"
              >
                <FiPhone />

                +91 6304905152
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
              <span className="block font-bold text-lg">
                Dr. K. Sharon
              </span>

              <a
                href="tel:+919502085963"
                className="mt-3 flex items-center gap-3 text-white/70 hover:text-[#c9a84c] transition"
              >
                <FiPhone />

                +91 9502085963
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
              <span className="block font-bold text-lg">
                Dr. Y. Madhusudhan Rao
              </span>

              <a
                href="tel:+919160743909"
                className="mt-3 flex items-center gap-3 text-white/70 hover:text-[#c9a84c] transition"
              >
                <FiPhone />

                +91 9160743909
              </a>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-bold relative pb-4 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-12 after:rounded-full after:bg-[#c9a84c]">
            Contact
          </h3>

          <div className="mt-8 space-y-5">

            {/* CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
              <h4 className="font-bold text-lg">
                Dr. B. Badari Ramakrishna
              </h4>

              <p className="mt-1 text-white/60 text-sm">
                Organizing Chairman
              </p>

              <a
                href="tel:+919885426232"
                className="mt-4 flex items-center gap-3 text-white/75 hover:text-[#c9a84c] transition"
              >
                <FiPhone />

                +91 9885426232
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
              <h4 className="font-bold text-lg">
                Dr. V. Rahul Marshal
              </h4>

              <p className="mt-1 text-white/60 text-sm">
                Organizing Secretary
              </p>

              <a
                href="tel:+919848720046"
                className="mt-4 flex items-center gap-3 text-white/75 hover:text-[#c9a84c] transition"
              >
                <FiPhone />

                +91 9848720046
              </a>
            </div>

            {/* LOCATION */}
            <div className="flex items-start gap-3 text-white/70 leading-7 pt-2">
              <FiMapPin className="mt-1" />

              <span>
                Sangivalasa,
                Visakhapatnam,
                Andhra Pradesh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 border-t border-white/10 bg-black/15 backdrop-blur-md px-4 py-6 text-center text-sm tracking-wide text-white/65">
        © 2026 IAOMR PG Convention · All Rights Reserved
      </div>
    </footer>
  )
}