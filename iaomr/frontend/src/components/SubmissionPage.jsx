import React from 'react'
// import './SubmissionPages.css'

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
              submitting your abstract for the conference at
              Visakhapatnam.
            </p>
          </div>

          {/* Right Button */}
          <div className="flex lg:justify-end">
            <button
              disabled
              className="bg-white text-blue-700 px-7 py-4 rounded-2xl font-semibold text-lg shadow-md cursor-not-allowed"
            >
              Submissions Opening Soon
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
                "Should be approved and signed by Head of the Department / Guide."
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
                    "Materials and Methods / Methods",
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
                Formatting
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
    </div>
  )
}
/* ---------------- PAGE 2: POSTER ---------------- */
export function SubmitPosterPage() {
  return (
    <SubmissionLayout
      title="Poster Submission Guidelines"
      guidelines={[
        "Must present original research or case study.",
        "Recommended size: A0 portrait format.",
        "Text should be minimal with clear visuals.",
        "Include title, authors, and affiliations.",
        "Submission deadline will be announced soon."
      ]}
    />
  )
}

/* ---------------- PAGE 3: PRESENTATION (PPT) ---------------- */
export function SubmitPPTPage() {
  return (
    <SubmissionLayout
      title="Presentation Submission Guidelines"
      guidelines={[
        "Submit in PPT or PDF format.",
        "Recommended 10–12 slides only.",
        "Keep content concise and readable.",
        "Use graphs and visuals where possible.",
        "Presentation time limit will be shared later."
      ]}
    />
  )
}