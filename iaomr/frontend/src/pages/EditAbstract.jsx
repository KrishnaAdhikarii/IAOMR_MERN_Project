import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAbstract = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

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

                <h1 className="text-2xl font-bold text-[#0F2854] mb-6">
                    Edit Abstract
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ================= TITLE ================= */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            Basic Details
                        </h2>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full border p-3 rounded"
                            required
                        />

                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="w-full border p-3 rounded mt-3"
                        />

                        <input
                            name="reviewCategory"
                            value={formData.reviewCategory}
                            onChange={handleChange}
                            placeholder="Review Category"
                            className="w-full border p-3 rounded mt-3"
                        />
                    </div>

                    {/* ================= STRUCTURED ================= */}
                    {formData.abstractFormat === "Structured" && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Structured Abstract
                            </h2>

                            <textarea name="introduction" value={formData.introduction} onChange={handleChange} placeholder="Introduction" className="w-full border p-3 rounded mb-3" />

                            <textarea name="aimsObjectives" value={formData.aimsObjectives} onChange={handleChange} placeholder="Aims & Objectives" className="w-full border p-3 rounded mb-3" />

                            <textarea name="materialsMethods" value={formData.materialsMethods} onChange={handleChange} placeholder="Materials & Methods" className="w-full border p-3 rounded mb-3" />

                            <textarea name="results" value={formData.results} onChange={handleChange} placeholder="Results" className="w-full border p-3 rounded mb-3" />

                            <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} placeholder="Conclusion" className="w-full border p-3 rounded" />
                        </div>
                    )}

                    {/* ================= UNSTRUCTURED ================= */}
                    {formData.abstractFormat === "Unstructured" && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Full Abstract
                            </h2>

                            <textarea
                                name="unstructuredAbstract"
                                value={formData.unstructuredAbstract}
                                onChange={handleChange}
                                className="w-full border p-3 rounded min-h-[200px]"
                            />
                        </div>
                    )}

                    {/* ================= PDF UPLOAD ================= */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            Upload Updated Abstract PDF 
                        </h2>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full border p-3 rounded bg-white"
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