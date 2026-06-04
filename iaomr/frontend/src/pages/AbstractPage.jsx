import React, { useState } from "react";
import api from "../utils/api";

export default function AbstractSubmission() {
    const [loading, setLoading] = useState(false);

    const [abstractFile, setAbstractFile] =
        useState(null);

    const [verified, setVerified] = useState(false);

    const [registrationData, setRegistrationData] = useState({});

    const [formData, setFormData] = useState({
        registrationId: "",
        title: "",
        presentationType: "",
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
    const isStructured =
        formData.category === "Original Research";

    const totalWords =
        isStructured
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

            const payload = new FormData();

            Object.keys(formData).forEach((key) => {
                payload.append(key, formData[key]);
            });

            payload.append(
                "abstractFormat",
                isStructured
                    ? "Structured"
                    : "Unstructured"
            );

            payload.append(
                "abstractFile",
                abstractFile
            );

            const res = await api.post(
                "/abstracts/submit",
                payload,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
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

                {/* GUIDELINES */}

                <div className="bg-blue-50 border border-blue-200 p-4 sm:p-6 rounded-2xl mb-8 sm:mb-10">

                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-5">
                        24th IAOMR NATIONAL PG CONVENTION – VISAKHAPATNAM
                    </h2>

                    {/* GENERAL INSTRUCTIONS */}

                    <div className="mb-6">

                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                            General Instructions
                        </h3>

                        <ul className="space-y-2 text-sm sm:text-base text-gray-700 leading-relaxed">

                            <li>
                                1. Abstract must be original and unpublished work.
                            </li>

                            <li>
                                2. Abstract should be written in English language only.
                            </li>

                            <li>
                                3. Maximum word limit: 250 words.
                            </li>

                            <li>
                                4. Submit the abstract in MS Word format (.doc/.docx).
                            </li>

                            <li>
                                5. Include author name(s) and institutional affiliation.
                            </li>

                            <li>
                                6. Should be approved & signed by Head of the Department / Guide.
                            </li>
                            <li>7. A Postgraduate delegate may present either a paper or a poster, but not both.
                            </li>

                            <li>
                                8. Faculty delegates can only present papers.
                            </li>

                        </ul>

                    </div>

                    {/* TYPES OF ABSTRACTS */}

                    <div className="mb-6">

                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                            Type of Abstracts
                        </h3>

                        {/* STRUCTURED */}

                        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">

                            <h4 className="font-bold text-base sm:text-lg text-black mb-2">
                                1. Structured Abstracts
                            </h4>

                            <p className="text-sm sm:text-base text-gray-700 mb-3">
                                (For Original Research)
                            </p>

                            <p className="text-sm sm:text-base font-medium mb-2">
                                The abstract should include:
                            </p>

                            <ul className="space-y-1 text-sm sm:text-base text-gray-700 ml-2">

                                <li>• Introduction / Background</li>

                                <li>• Aims & Objectives</li>

                                <li>• Materials and Methods</li>

                                <li>• Results</li>

                                <li>• Conclusion</li>

                            </ul>

                        </div>

                        {/* UNSTRUCTURED */}

                        <div className="bg-white rounded-xl p-4 border border-gray-200">

                            <h4 className="font-bold text-base sm:text-lg text-black mb-2">
                                2. Unstructured Abstracts
                            </h4>

                            <p className="text-sm sm:text-base text-gray-700 mb-3">
                                (For Case Reports, Innovative / AI Ideas, Review Articles)
                            </p>

                            <ul className="space-y-1 text-sm sm:text-base text-gray-700 ml-2">

                                <li>
                                    • Should be written in a single coherent paragraph.
                                </li>

                                <li>
                                    • Must provide a clear narration of the case/review content.
                                </li>

                            </ul>

                        </div>

                    </div>

                    {/* FORMATTING GUIDELINES */}

                    <div>

                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                            Formatting Guidelines
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="font-semibold text-gray-800">
                                    Font
                                </p>

                                <p className="text-gray-700">
                                    Times New Roman
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="font-semibold text-gray-800">
                                    Font Size
                                </p>

                                <p className="text-gray-700">
                                    12
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="font-semibold text-gray-800">
                                    Heading Size
                                </p>

                                <p className="text-gray-700">
                                    14
                                </p>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-4">
                                <p className="font-semibold text-gray-800">
                                    Heading Format
                                </p>

                                <p className="text-gray-700">
                                    Bold, CAPITAL, Underlined
                                </p>
                            </div>

                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">

                            <p className="text-sm sm:text-base text-gray-800 font-medium">
                                Maintain proper spacing and alignment throughout the document.
                            </p>

                        </div>

                    </div>

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
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> Paper Presentation is for both Faculty and Postgraduate delegates.<br />
                                Poster Presentation is only for Postgraduate delegates.
                            </p>
                        </div>


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

                        {isStructured && (

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

                        {!isStructured && formData.category && (
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
                                className={`text-base sm:text-lg font-bold ${totalWords > 250
                                    ? "text-red-500"
                                    : "text-green-600"
                                    }`}
                            >
                                Word Count: {totalWords}/250
                            </div>

                        </div>
                        {/* Upload Abstract File */}
                        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 mt-8">
                            <div className="flex items-center gap-4 mb-6">


                                <h2 className="text-2xl font-bold uppercase text-slate-800">
                                    Upload Abstract
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Upload Word / PDF File
                                    </label>

                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) =>
                                            setAbstractFile(e.target.files[0])
                                        }
                                        className="w-full border border-slate-300 rounded-2xl px-4 py-3 file:mr-4 file:py-2 file:px-4
        file:rounded-xl file:border-0 file:bg-[rgb(27,46,87)] file:text-white
        file:font-medium hover:file:opacity-90 cursor-pointer"
                                    />

                                    <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                        Accepted formats: PDF, DOC, DOCX <br />
                                        Maximum file size: 10 MB
                                    </p>
                                </div>

                                {/* Guidelines Box */}
                                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                                    <h3 className="font-semibold text-slate-800 mb-3">
                                        Upload Guidelines
                                    </h3>

                                    <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc pl-5">
                                        <li>Only PDF or MS Word documents are allowed.</li>
                                        <li>File size must not exceed 10 MB.</li>
                                        <li>Filename should be "NAME_Reg.ID".</li>
                                        <li>Ensure the uploaded file is final and properly formatted.</li>
                                        <li>Scanned approval/signature pages Should be included in the same PDF.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading || totalWords > 250}
                            className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition duration-300 ${loading || totalWords > 250
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