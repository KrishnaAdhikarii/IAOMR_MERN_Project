import React, { useState } from "react";
import axios from "axios";
import api from '../utils/api';


const API_URL = "http://localhost:5000";

export default function AbstractSubmission() {
  const [loading, setLoading] = useState(false);

  const [verified, setVerified] = useState(false);

  const [registrationData, setRegistrationData] = useState({});

  const [formData, setFormData] = useState({
    registrationId: "",

    title: "",

    presentationType: "",

    abstractFormat: "",

    category: "",

    reviewCategory: "",

    introduction: "",

    aimsObjectives: "",

    materialsMethods: "",

    results: "",

    conclusion: "",

    unstructuredAbstract: "",
  });

  // WORD COUNT

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  };

  // TOTAL WORD COUNT

  const totalWords =
    formData.abstractFormat === "Structured"
      ? countWords(
          `
        ${formData.introduction}
        ${formData.aimsObjectives}
        ${formData.materialsMethods}
        ${formData.results}
        ${formData.conclusion}
      `
        )
      : countWords(formData.unstructuredAbstract);

  // HANDLE CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // VERIFY REGISTRATION

  const verifyRegistration = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/registration/check/${formData.registrationId}`
      );

      setRegistrationData(res.data.registration);

      setVerified(true);

      alert("Registration Verified");
    } catch (error) {
      alert("Invalid Registration ID");
    } finally {
      setLoading(false);
    }
  };

  // SUBMIT ABSTRACT

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalWords > 250) {
      return alert("Abstract exceeds 250 words");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/abstracts/submit`,
        formData
      );

      alert(
        `Abstract Submitted Successfully\nAbstract ID: ${res.data.abstract.abstractId}`
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Submission Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}

        <h1 className="text-4xl font-bold text-center mb-3">
          Abstract Submission
        </h1>

        <p className="text-center text-gray-600 mb-10">
          IAOMR National PG Convention 2026
        </p>

        {/* GUIDELINES */}

        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-10">
          <h2 className="text-xl font-bold mb-3">
            Guidelines
          </h2>

          <ul className="space-y-2 text-gray-700">
            <li>• Word Limit: 250</li>
            <li>• Format: MS Word</li>
            <li>• Font: Times New Roman</li>
            <li>• Font Size: 12</li>
            <li>
              • Heading: 14, Bold, Underline,
              CAPITAL
            </li>
          </ul>
        </div>

        {/* REGISTRATION VERIFY */}

        <div className="mb-8">

          <label className="block font-semibold mb-2">
            Registration ID
          </label>

          <div className="flex gap-4">

            <input
              type="text"
              name="registrationId"
              value={formData.registrationId}
              onChange={handleChange}
              placeholder="Enter Registration ID"
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={verifyRegistration}
              disabled={loading}
              className="bg-black text-white px-6 rounded-xl"
            >
              Verify
            </button>

          </div>

        </div>

        {/* VERIFIED DETAILS */}

        {verified && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">

            <h2 className="text-xl font-bold mb-4">
              Participant Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <p className="font-semibold">
                  Name
                </p>

                <p>{registrationData.fullName}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Email
                </p>

                <p>{registrationData.email}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Phone
                </p>

                <p>{registrationData.phone}</p>
              </div>

              <div>
                <p className="font-semibold">
                  Institution
                </p>

                <p>
                  {registrationData.institution}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* FORM */}

        {verified && (
          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Abstract Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            {/* PRESENTATION TYPE */}

            <div className="mb-6">

              <label className="block font-semibold mb-3">
                Presentation Type
              </label>

              <div className="flex gap-6">

                <label>
                  <input
                    type="radio"
                    name="presentationType"
                    value="Paper"
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Paper
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="presentationType"
                    value="Poster"
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Poster
                  </span>
                </label>

              </div>

            </div>

            {/* FORMAT */}

            {formData.presentationType ===
              "Paper" && (
              <div className="mb-6">

                <label className="block font-semibold mb-3">
                  Abstract Format
                </label>

                <div className="flex gap-6">

                  <label>
                    <input
                      type="radio"
                      name="abstractFormat"
                      value="Structured"
                      onChange={handleChange}
                    />

                    <span className="ml-2">
                      Structured
                    </span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="abstractFormat"
                      value="Unstructured"
                      onChange={handleChange}
                    />

                    <span className="ml-2">
                      Unstructured
                    </span>
                  </label>

                </div>

              </div>
            )}

            {/* CATEGORY */}

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Original Research">
                  Original Research
                </option>

                <option value="Case Report">
                  Case Report
                </option>

                <option value="Innovative Ideas/AI">
                  Innovative Ideas / AI
                </option>

                <option value="Review">
                  Review
                </option>

              </select>

            </div>

            {/* REVIEW CATEGORY */}

            {formData.category === "Review" && (
              <div className="mb-6">

                <label className="block font-semibold mb-2">
                  Review Topic
                </label>

                <select
                  name="reviewCategory"
                  value={
                    formData.reviewCategory
                  }
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">
                    Select Topic
                  </option>

                  <option>TMJ</option>

                  <option>
                    OPMD/Malignancy
                  </option>

                  <option>
                    Salivary Gland Disorders
                  </option>

                  <option>Geriatric</option>

                  <option>
                    Systemic & Oral Health
                  </option>

                  <option>
                    Sleep Apnoea
                  </option>

                  <option>Forensic</option>

                  <option>
                    Investigatory Procedures
                  </option>

                  <option>
                    Miscellaneous
                  </option>

                </select>

              </div>
            )}

            {/* STRUCTURED */}

            {formData.abstractFormat ===
              "Structured" && (
              <div className="space-y-6">

                {[
                  {
                    label: "Introduction",
                    name: "introduction",
                  },

                  {
                    label:
                      "Aims & Objectives",
                    name: "aimsObjectives",
                  },

                  {
                    label:
                      "Materials & Methods",
                    name:
                      "materialsMethods",
                  },

                  {
                    label: "Results",
                    name: "results",
                  },

                  {
                    label: "Conclusion",
                    name: "conclusion",
                  },
                ].map((field) => (
                  <div key={field.name}>

                    <label className="block font-semibold mb-2">
                      {field.label}
                    </label>

                    <textarea
                      rows={4}
                      name={field.name}
                      value={
                        formData[field.name]
                      }
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3"
                    />

                  </div>
                ))}

              </div>
            )}

            {/* UNSTRUCTURED */}

            {formData.abstractFormat ===
              "Unstructured" && (
              <div className="mb-6">

                <label className="block font-semibold mb-2">
                  Abstract
                </label>

                <textarea
                  rows={10}
                  name="unstructuredAbstract"
                  value={
                    formData.unstructuredAbstract
                  }
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>
            )}

            {/* WORD COUNT */}

            <div className="mt-8 mb-6">

              <div
                className={`text-lg font-bold ${
                  totalWords > 250
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                Word Count: {totalWords}/250
              </div>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={
                loading || totalWords > 250
              }
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
            >
              {loading
                ? "Submitting..."
                : "Submit Abstract"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}