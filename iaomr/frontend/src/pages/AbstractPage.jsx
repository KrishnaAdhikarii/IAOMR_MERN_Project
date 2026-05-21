import React, { useState } from "react";
import api from "../utils/api";

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
            ? countWords(`
                ${formData.introduction}
                ${formData.aimsObjectives}
                ${formData.materialsMethods}
                ${formData.results}
                ${formData.conclusion}
            `)
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

            const res = await api.get(
                `/registration/check/${formData.registrationId}`
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

            const res = await api.post(
                "/abstracts/submit",
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
        <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-3 sm:px-6 font-[Kumbh_Sans]">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl p-4 sm:p-6 md:p-8">

                {/* HEADER */}

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
                    Abstract Submission
                </h1>

                <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-10">
                    IAOMR National PG Convention 2026
                </p>

                {/* GUIDELINES */}

                <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-2xl mb-8 sm:mb-10">
                    <h2 className="text-lg sm:text-xl font-bold mb-3">
                        Guidelines
                    </h2>

                    <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                        <li>• Word Limit: 250</li>
                        <li>• Format: MS Word</li>
                        <li>• Font: Times New Roman</li>
                        <li>• Font Size: 12</li>
                        <li>
                            • Heading: 14, Bold, Underline, CAPITAL
                        </li>
                    </ul>
                </div>

                {/* REGISTRATION VERIFY */}

                <div className="mb-5 sm:mb-6">

                    <label className="block font-semibold mb-2">
                        Registration ID
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                        <input
                            type="text"
                            name="registrationId"
                            value={formData.registrationId}
                            onChange={handleChange}
                            placeholder="Enter Registration ID"
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <button
                            onClick={verifyRegistration}
                            disabled={loading}
                            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition duration-300"
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>

                    </div>

                </div>

                {/* VERIFIED DETAILS */}

                {verified && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8">

                        <h2 className="text-lg sm:text-xl font-bold mb-4">
                            Participant Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="font-semibold text-gray-700">
                                    Name
                                </p>

                                <p>{registrationData.fullName}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-700">
                                    Email
                                </p>

                                <p>{registrationData.email}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-700">
                                    Phone
                                </p>

                                <p>{registrationData.phone}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-700">
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

                        <div className="mb-5 sm:mb-6">

                            <label className="block font-semibold mb-2">
                                Abstract Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                            />

                        </div>

                        {/* PRESENTATION TYPE */}

                        <div className="mb-5 sm:mb-6">

                            <label className="block font-semibold mb-3">
                                Presentation Type
                            </label>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                                <label className="flex items-center">
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

                                <label className="flex items-center">
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

                        {formData.presentationType === "Paper" && (
                            <div className="mb-5 sm:mb-6">

                                <label className="block font-semibold mb-3">
                                    Abstract Format
                                </label>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                                    <label className="flex items-center">
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

                                    <label className="flex items-center">
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

                        <div className="mb-5 sm:mb-6">

                            <label className="block font-semibold mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
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
                            <div className="mb-5 sm:mb-6">

                                <label className="block font-semibold mb-2">
                                    Review Topic
                                </label>

                                <select
                                    name="reviewCategory"
                                    value={formData.reviewCategory}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="">
                                        Select Topic
                                    </option>

                                    <option>TMJ</option>
                                    <option>OPMD/Malignancy</option>
                                    <option>Salivary Gland Disorders</option>
                                    <option>Geriatric</option>
                                    <option>Systemic & Oral Health</option>
                                    <option>Sleep Apnoea</option>
                                    <option>Forensic</option>
                                    <option>Investigatory Procedures</option>
                                    <option>Miscellaneous</option>

                                </select>

                            </div>
                        )}

                        {/* STRUCTURED */}

                        {formData.abstractFormat === "Structured" && (
                            <div className="space-y-5 sm:space-y-6">

                                {[
                                    {
                                        label: "Introduction",
                                        name: "introduction",
                                    },

                                    {
                                        label: "Aims & Objectives",
                                        name: "aimsObjectives",
                                    },

                                    {
                                        label: "Materials & Methods",
                                        name: "materialsMethods",
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
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                        />

                                    </div>
                                ))}

                            </div>
                        )}

                        {/* UNSTRUCTURED */}

                        {formData.abstractFormat === "Unstructured" && (
                            <div className="mb-5 sm:mb-6">

                                <label className="block font-semibold mb-2">
                                    Abstract
                                </label>

                                <textarea
                                    rows={10}
                                    name="unstructuredAbstract"
                                    value={formData.unstructuredAbstract}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                />

                            </div>
                        )}

                        {/* WORD COUNT */}

                        <div className="mt-8 mb-6">

                            <div
                                className={`text-base sm:text-lg font-bold ${
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
                            disabled={loading || totalWords > 250}
                            className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition duration-300 ${
                                loading || totalWords > 250
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-black hover:bg-gray-800 text-white"
                            }`}
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