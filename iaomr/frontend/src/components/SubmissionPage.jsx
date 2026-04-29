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
    <SubmissionLayout
      title="Abstract Submission Guidelines"
      guidelines={[
        "Abstract must be original and unpublished work.",
        "Maximum 300 words allowed.",
        "Use structured format: Background, Methods, Results, Conclusion.",
        "English language only.",
        "Include author name(s) and affiliation."
      ]}
    />
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