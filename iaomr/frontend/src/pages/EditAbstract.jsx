import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAbstract = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

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
                    `${import.meta.env.VITE_API_URL}/api/abstract/${id}`
                );

                const data = res.data.abstract;

                // safety check
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
    // SUBMIT UPDATE
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/abstract/${id}/edit`,
                formData
            );

            alert("Abstract resubmitted successfully");
            navigate("/status");

        } catch (err) {
            setError(
                err.response?.data?.message || "Update failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // =========================
    // LOADING STATE
    // =========================
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

                <h1 className="text-2xl font-bold mb-6 text-[#0F2854]">
                    Edit Abstract
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* TITLE */}
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border p-3 rounded"
                        required
                    />

                    {/* CATEGORY */}
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border p-3 rounded"
                    />

                    {/* REVIEW CATEGORY */}
                    <input
                        name="reviewCategory"
                        value={formData.reviewCategory}
                        onChange={handleChange}
                        placeholder="Review Category"
                        className="w-full border p-3 rounded"
                    />

                    {/* STRUCTURED OR UNSTRUCTURED */}
                    {formData.abstractFormat === "Structured" ? (
                        <>
                            <textarea
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleChange}
                                placeholder="Introduction"
                                className="w-full border p-3 rounded"
                            />

                            <textarea
                                name="aimsObjectives"
                                value={formData.aimsObjectives}
                                onChange={handleChange}
                                placeholder="Aims & Objectives"
                                className="w-full border p-3 rounded"
                            />

                            <textarea
                                name="materialsMethods"
                                value={formData.materialsMethods}
                                onChange={handleChange}
                                placeholder="Materials & Methods"
                                className="w-full border p-3 rounded"
                            />

                            <textarea
                                name="results"
                                value={formData.results}
                                onChange={handleChange}
                                placeholder="Results"
                                className="w-full border p-3 rounded"
                            />

                            <textarea
                                name="conclusion"
                                value={formData.conclusion}
                                onChange={handleChange}
                                placeholder="Conclusion"
                                className="w-full border p-3 rounded"
                            />
                        </>
                    ) : (
                        <textarea
                            name="unstructuredAbstract"
                            value={formData.unstructuredAbstract}
                            onChange={handleChange}
                            placeholder="Full Abstract"
                            className="w-full border p-3 rounded min-h-[200px]"
                        />
                    )}

                    {/* BUTTON */}
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