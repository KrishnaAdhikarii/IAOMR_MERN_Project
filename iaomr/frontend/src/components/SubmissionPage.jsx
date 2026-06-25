import React from 'react'
import { useNavigate } from "react-router-dom";

/* ---------------- SHARED LAYOUT ---------------- */
function SubmissionLayout({ title, guidelines }) {
  return (
    <div className="submission_page">
      <div className="submission_container">

        {/* LEFT SIDE */}
        <div className="submission_guidelines">
          <h2>{title}</h2>
          <ul>
            {guidelines.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="submission_cta">
          <button className="coming_soon_btn">
            🚧 Submissions Opening Soon
          </button>
        </div>

      </div>
    </div>
  )
}

/* ---------------- PAGE 1: ABSTRACT ---------------- */
export function SubmitAbstractPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="bg-[rgb(27,46,87)] text-white rounded-3xl p-8 md:p-10 shadow-lg mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.2em] text-blue-100 text-sm font-semibold">
              24th IAOMR National PG Convention
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              Abstract Submission Guidelines
            </h1>

            <p className="mt-5 text-lg text-blue-100 leading-relaxed">
              Please read all the instructions carefully before
              submitting your abstract for the convention at
              Visakhapatnam.
            </p>
          </div>

          {/* Right Button */}
          <div className="flex lg:justify-end">
            <button
              onClick={() => navigate("/submit-abstract")}
              className="bg-white text-blue-700 px-7 py-4 rounded-2xl font-semibold text-lg shadow-md hover:bg-blue-50 transition"
            >
              Submit Abstract
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Instructions */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white text-white flex items-center justify-center font-bold">
                1
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                General Instructions
              </h2>
            </div>

            <ol className="space-y-4">
              {[
                "Abstract must be original and unpublished work.",
                "Abstract should be written in English language only.",
                "Maximum word limit: 250–300 words.",
                "Submit the abstract in MS Word format (.doc/.docx).",
                "Include author name(s) and institutional affiliation.",
                "Should be approved and signed by Head of the Department / Guide.",
                "A Postgraduate delegate may present either a paper or a poster, but not both.",
                "Faculty delegates can only present papers."
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 border border-slate-100 rounded-2xl p-4 bg-slate-50"
                >
                  <div className="h-7 w-7 rounded-full bg-[rgb(27,46,87)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {index + 1}
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Types of Abstracts */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                2
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Types of Abstracts
              </h2>
            </div>

            <div className="space-y-8">
              {/* Structured */}
              <div className="border border-slate-200 rounded-3xl p-8 bg-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold uppercase text-blue-700">
                      Structured Abstracts
                    </h3>

                    <p className="italic text-slate-500 mt-2">
                      (For Original Research)
                    </p>
                  </div>

                  <span className="bg-bg-[rgb(27,46,87)] text-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    Research
                  </span>
                </div>

                <p className="mt-6 text-slate-700">
                  The abstract should be divided into the following
                  sections in order:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {[
                    "Introduction / Background",
                    "Aims & Objectives",
                    "Materials and Methods ",
                    "Results",
                    "Conclusion"
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3"
                    >
                      <div className="h-3 w-3 rounded-full bg--bg-[rgb(27,46,87)] text-white" />

                      <p className="font-medium text-slate-800">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unstructured */}
              <div className="border border-slate-200 rounded-3xl p-8 bg-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold uppercase text-blue-700">
                      Unstructured Abstracts
                    </h3>

                    <p className="italic text-slate-500 mt-2">
                      (For Case Reports, Innovative / AI Ideas,
                      Review Articles)
                    </p>
                  </div>

                  <span className="bg-[rgb(27,46,87)] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Case Reports
                  </span>
                </div>

                <div className="space-y-4 mt-6">
                  {[
                    "Should be written in a single coherent paragraph.",
                    "Must provide a clear narration of the case/review content."
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3"
                    >
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[rgb(27,46,87)]shrink-0" />

                      <p className="text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>


        {/* Right Sidebar */}
        <div>
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sticky top-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                3
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Formatting Guidelines
              </h2>
            </div>

            <div className="space-y-4">
              {[
                ["Font", "Times New Roman"],
                ["Font Size", "12"],
                ["Heading Size", "14"],
                [
                  "Heading Format",
                  "Bold, CAPITAL letters, Underlined"
                ]
              ].map(([title, value], index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                >
                  <p className="text-sm uppercase tracking-wide font-semibold text-slate-500">
                    {title}
                  </p>

                  <p className="mt-2 text-slate-800 font-medium">
                    {value}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl bg-[rgb(27,46,87)] text-white p-5">
                <p className="font-medium leading-relaxed">
                  Maintain proper spacing and alignment throughout
                  the document.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div >
  )
}
/* ---------------- PAGE 2: POSTER ---------------- */
export function SubmitPosterPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="bg-[rgb(27,46,87)] text-white rounded-3xl p-8 md:p-10 shadow-lg mb-10">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* LEFT TEXT */}
    <div className="max-w-3xl">
      <p className="uppercase tracking-[0.2em] text-blue-100 text-sm font-semibold">
        24th IAOMR National PG Convention
      </p>

      <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
        Poster Presentation Guidelines
      </h1>

      <p className="mt-5 text-lg text-blue-100 leading-relaxed">
        Please read all instructions carefully before submitting your E-Poster.
      </p>
    </div>

    {/* RIGHT BUTTONS */}
    <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">

      <button
        onClick={() => { 
          window.location.href = "/templates/poster_template.pptx";  
          alert("Template Downloaded! Please check your downloads folder.");
        }}
        className="bg-white text-[rgb(27,46,87)] px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-50 transition whitespace-nowrap"
      >
        📥 Download Template
      </button>

      <button
      disabled
        onClick={() => window.location.href = "/submit-poster"}
        className="bg-transparent border border-white text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-[rgb(27,46,87)] cursor-not-allowed opacity-75 transition whitespace-nowrap"
      >
        🚀 Submit Poster
      </button>

    </div>

  </div>
</div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* GENERAL RULES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                1
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Poster Guidelines
              </h2>
            </div>

            <ol className="space-y-4">
              {[
                "Only postgraduate students are allowed for poster presentation.",
                "Maximum 2 postgraduate students per poster.",
                "E-poster must be in JPEG landscape format (16:9 ratio, 300 dpi).",
                "Title should be at top center of the poster.",
                "Registration ID must be on top-right corner.",
                "No personal identity or affiliation should be displayed.",
                "Minimum font size should be 22 (Times New Roman or equivalent).",
                "Poster must be readable from 1.5–2 meters distance."
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border border-slate-100 rounded-2xl p-4 bg-slate-50"
                >
                  <div className="h-7 w-7 rounded-full bg-[rgb(27,46,87)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ol>

          </section>

          {/* SUBMISSION RULES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                2
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Submission & Timing
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">

              {[
                "Presentation time: 3 minutes + 1 minute Q&A",
                "Strict time adherence required (no extension allowed)",
                "Final upload deadline: 10 July 2026",
                "Upload only via official website link",
                "Multiple submissions are not allowed"
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="h-3 w-3 rounded-full bg-[rgb(27,46,87)] mt-2 shrink-0" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}

            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sticky top-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                3
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Important Dates
              </h2>
            </div>

            <div className="space-y-4">

              {[
                ["Template Available", "22 June 2026"],
                ["Upload Window", "1–10 July 2026"],
                ["Last Date", "10 July 2026"],
                ["Event Dates", "6–8 August 2026"]
              ].map(([title, value], i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                >
                  <p className="text-sm uppercase tracking-wide font-semibold text-slate-500">
                    {title}
                  </p>
                  <p className="mt-2 text-slate-800 font-medium">
                    {value}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl bg-[rgb(27,46,87)] text-white p-5">
                <p className="font-medium leading-relaxed">
                  Ensure all posters follow the JPEG 16:9 format strictly before submission.
                </p>
              </div>

            </div>

          </section>
        </div>

      </div>
    </div>
  );
}

/* ---------------- PAGE 3: PRESENTATION (PPT) ---------------- */
export function SubmitPPTPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="bg-[rgb(27,46,87)] text-white rounded-3xl p-8 md:p-10 shadow-lg mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* LEFT TEXT */}
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.2em] text-blue-100 text-sm font-semibold">
              24th IAOMR National PG Convention
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-white">
              Paper Presentation Guidelines
            </h1>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">

            <button
              onClick={() => {
                window.location.href = "/templates/paper_template.pptx";
                alert("Template Downloaded! Please check your downloads folder.");
              }}
              className="bg-white text-[rgb(27,46,87)] px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-blue-50 transition whitespace-nowrap"
            >
              📥 Download Template
            </button>

            <button
            disabled
              onClick={() => window.location.href = "/submit-ppt"}
              
              className="bg-transparent border border-white text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-[rgb(27,46,87)] cursor-not-allowed opacity-50 transition whitespace-nowrap"
            >
              🚀 Submit PPT
            </button>

          </div>


        </div>
        <p className="mt-5 text-lg text-blue-100 leading-relaxed">
          Please follow all instructions carefully before uploading your final PowerPoint presentation.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* GENERAL RULES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                1
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Presentation Rules
              </h2>
            </div>

            <ol className="space-y-4">
              {[
                "Only one registered delegate (Faculty/Postgraduate) is allowed per presentation.",
                "Presentation must be in MS PowerPoint format only.",
                "Maximum 15–20 slides including title and thank you slide.",
                "Maximum duration: 6 minutes + 2 minutes Q&A.",
                "Strict time adherence is mandatory.",
                "Multiple submissions are not allowed."
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border border-slate-100 rounded-2xl p-4 bg-slate-50"
                >
                  <div className="h-7 w-7 rounded-full bg-[rgb(27,46,87)] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>

                  <p className="text-slate-700">{item}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* SLIDE GUIDELINES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                2
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Slide Formatting Guidelines
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Title slide must include topic & registration ID",
                "Registration ID must appear on top-right of all slides",
                "Avoid heavy text — use visuals & graphs",
                "Single-line spacing recommended",
                "No identity of presenter/guide/affiliation",
                "Use clean and readable templates"
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="h-3 w-3 rounded-full bg-[rgb(27,46,87)] mt-2 shrink-0" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 sticky top-8">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-11 w-11 rounded-xl bg-[rgb(27,46,87)] text-white flex items-center justify-center font-bold">
                3
              </div>

              <h2 className="text-2xl font-bold uppercase text-slate-800">
                Important Dates
              </h2>
            </div>

            <div className="space-y-4">

              {[
                ["Template Available", "21 June 2026"],
                ["Upload Window", "1–10 July 2026"],
                ["Last Date", "10 July 2026"],
                ["Event Dates", "6–8 August 2026"]
              ].map(([title, value], i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl p-5 bg-slate-50"
                >
                  <p className="text-sm uppercase tracking-wide font-semibold text-slate-500">
                    {title}
                  </p>
                  <p className="mt-2 text-slate-800 font-medium">
                    {value}
                  </p>
                </div>
              ))}

              <div className="rounded-2xl bg-[rgb(27,46,87)] text-white p-5">
                <p className="font-medium leading-relaxed">
                  Ensure final submission is uploaded only via official portal.
                </p>
              </div>

            </div>
          </section>
        </div>

      </div>
    </div>
  );
}