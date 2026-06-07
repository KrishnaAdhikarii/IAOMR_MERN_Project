import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAbstract = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [remarks, setRemarks] = useState("");

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        reviewCategory: "",
        abstractFormat: "Structured",

        introduction: "",
        aimsObjectives: "",
        materialsMethods: "",
        results: "",
        conclusion: "",

        unstructuredAbstract: "",
    });

    // =========================
    // FETCH ABSTRACT
    // =========================
    useEffect(() => {
        const fetchAbstract = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/abstracts/${id}`
                );

                const data = res.data.abstract;

                setRemarks(data.reviewerRemarks || "g");


                if (data.status !== "Corrections Required") {
                    setError("Editing not allowed at this stage.");
                    return;
                }

                setFormData({
                    title: data.title || "",
                    category: data.category || "",
                    reviewCategory: data.reviewCategory || "",
                    abstractFormat: data.abstractFormat || "Structured",

                    introduction: data.structuredAbstract?.introduction || "",
                    aimsObjectives: data.structuredAbstract?.aimsObjectives || "",
                    materialsMethods: data.structuredAbstract?.materialsMethods || "",
                    results: data.structuredAbstract?.results || "",
                    conclusion: data.structuredAbstract?.conclusion || "",

                    unstructuredAbstract: data.unstructuredAbstract || "",
                });

            } catch (err) {
                setError("Failed to load abstract");
            } finally {
                setLoading(false);
            }
        };

        fetchAbstract();
    }, [id]);

    // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // HANDLE FILE
    // =========================
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // =========================
    // SUBMIT UPDATE
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const data = new FormData();

            // text fields
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // pdf file (optional)
            if (file) {
                data.append("abstractFile", file);
            }

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/abstracts/edit/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Abstract resubmitted successfully");
            navigate("/status");

        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-[#0F2854] mb-2">
                    Edit Abstract
                </h1>

                {remarks && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded mb-6">
                        <p className="text-sm font-medium">Remarks:</p>
                        <p className="mt-1">{remarks}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ================= BASIC DETAILS ================= */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            Basic Details
                        </h2>

                        <label className="text-sm font-medium text-gray-600">
                            Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="w-full border p-3 rounded mt-1 mb-3"
                            required
                        />

                        <label className="text-sm font-medium text-gray-600">
                            Category
                        </label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            className="w-full border p-3 rounded mt-1 mb-3"
                        />

                        <label className="text-sm font-medium text-gray-600">
                            Review Category
                        </label>
                        <input
                            name="reviewCategory"
                            value={formData.reviewCategory}
                            onChange={handleChange}
                            placeholder="Enter review category"
                            className="w-full border p-3 rounded mt-1"
                        />
                    </div>

                    {/* ================= STRUCTURED ================= */}
                    {formData.abstractFormat === "Structured" && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Structured Abstract
                            </h2>

                            <label className="text-sm font-medium text-gray-600">Introduction</label>
                            <textarea
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1 mb-3"
                            />

                            <label className="text-sm font-medium text-gray-600">Aims & Objectives</label>
                            <textarea
                                name="aimsObjectives"
                                value={formData.aimsObjectives}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1 mb-3"
                            />

                            <label className="text-sm font-medium text-gray-600">Materials & Methods</label>
                            <textarea
                                name="materialsMethods"
                                value={formData.materialsMethods}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1 mb-3"
                            />

                            <label className="text-sm font-medium text-gray-600">Results</label>
                            <textarea
                                name="results"
                                value={formData.results}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1 mb-3"
                            />

                            <label className="text-sm font-medium text-gray-600">Conclusion</label>
                            <textarea
                                name="conclusion"
                                value={formData.conclusion}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1"
                            />
                        </div>
                    )}

                    {/* ================= UNSTRUCTURED ================= */}
                    {formData.abstractFormat === "Unstructured" && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Full Abstract
                            </h2>

                            <label className="text-sm font-medium text-gray-600">
                                Abstract Content
                            </label>

                            <textarea
                                name="unstructuredAbstract"
                                value={formData.unstructuredAbstract}
                                onChange={handleChange}
                                className="w-full border p-3 rounded mt-1 min-h-[200px]"
                            />
                        </div>
                    )}

                    {/* ================= FILE UPLOAD ================= */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            Upload Updated PDF / Word File
                        </h2>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full border p-3 rounded bg-white mt-1"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            Upload only if you want to replace previous PDF
                        </p>
                    </div>

                    {/* ================= SUBMIT ================= */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#0F2854] text-white py-3 rounded-lg font-medium"
                    >
                        {submitting ? "Submitting..." : "Resubmit Abstract"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditAbstract;