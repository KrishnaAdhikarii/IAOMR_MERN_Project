import { useState } from "react";
import axios from "axios";

const AbstractStatus = () => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [abstractData, setAbstractData] = useState(null);
    const [error, setError] = useState("");

    const handleCheckStatus = async (e) => {
        e.preventDefault();

        if (!searchValue.trim()) {
            setError("Please enter your Email or Registration Number");
            return;
        }

        setLoading(true);
        setError("");
        setAbstractData(null);

        try {
            const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/status/abstract`,
  {
    searchValue: searchValue.trim(),
  }
);

            setAbstractData(response.data.data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "No abstract found with the provided details."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Accepted":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            case "Corrections Required":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl">
                {/* Search Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div
                        className="px-6 py-4"
                        style={{ backgroundColor: "#0F2854" }}
                    >
                        <h1 className="text-2xl font-bold text-white">
                            Check Abstract Status
                        </h1>
                        <p className="text-gray-200 text-sm mt-1">
                            Enter your Email Address or Registration Number
                        </p>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleCheckStatus} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email / Registration Number
                                </label>

                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Enter Email or Registration Number"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none"
                                    style={{
                                        borderColor: "#D1D5DB",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
                                style={{ backgroundColor: "#0F2854" }}
                            >
                                {loading ? "Checking Status..." : "Check Status"}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Result Card */}
                {abstractData && (
                    <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Abstract Details
                            </h2>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    abstractData.status
                                )}`}
                            >
                                {abstractData.status}
                            </span>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Abstract ID</p>
                                <p className="font-medium">{abstractData.abstractId}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Title</p>
                                <p className="font-medium">{abstractData.title}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Author</p>
                                    <p className="font-medium">{abstractData.author}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium">{abstractData.category}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Presentation Type
                                    </p>
                                    <p className="font-medium">
                                        {abstractData.presentationType}
                                    </p>
                                </div>
                            </div>

                            {abstractData.reviewerRemarks && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-2">
                                        Reviewer Remarks
                                    </h3>
                                    <p className="text-blue-800">
                                        {abstractData.reviewerRemarks}
                                    </p>
                                </div>
                            )}

                            {abstractData.updatedAt && (
                                <div className="text-sm text-gray-500">
                                    Last Updated:{" "}
                                    {new Date(
                                        abstractData.updatedAt
                                    ).toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AbstractStatus;