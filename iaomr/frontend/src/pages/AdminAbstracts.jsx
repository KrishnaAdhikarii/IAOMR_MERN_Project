import React, {
  useEffect,
  useState,
} from "react";

import api from "../utils/api";

export default function AdminAbstracts() {

  const [abstracts, setAbstracts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedAbstract,
    setSelectedAbstract] =
    useState(null);

  const [filters, setFilters] =
    useState({
      search: "",
      status: "",
      presentationType: "",
    });

  // ==========================
  // FETCH ABSTRACTS
  // ==========================

  const fetchAbstracts = async () => {
    try {

      setLoading(true);

      const query =
        new URLSearchParams(filters)
          .toString();

      const res = await api.get(
        `/abstracts/all?${query}`
      );

      setAbstracts(
        res.data.abstracts
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to fetch abstracts"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbstracts();
  }, []);

  // ==========================
  // UPDATE STATUS
  // ==========================

  const updateStatus = async (
    id,
    status,
    reviewerRemarks
  ) => {
    try {

      await api.put(
        `/abstracts/review/${id}`,
        {
          status,
          reviewerRemarks,
        }
      );

      alert(
        "Status updated successfully"
      );

      fetchAbstracts();

      setSelectedAbstract(null);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update status"
      );
    }
  };

  // ==========================
  // FILTER CHANGE
  // ==========================

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.value,
    });
  };

  // ==========================
  // APPLY FILTERS
  // ==========================

  const applyFilters = () => {
    fetchAbstracts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Abstract Review Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          IAOMR 2026
        </p>

      </div>

      {/* FILTERS */}

      <div className="bg-white p-5 rounded-2xl shadow mb-8">

        <div className="grid md:grid-cols-4 gap-4">

          {/* SEARCH */}

          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={filters.search}
            onChange={
              handleFilterChange
            }
            className="border rounded-xl px-4 py-3"
          />

          {/* STATUS */}

          <select
            name="status"
            value={filters.status}
            onChange={
              handleFilterChange
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Status
            </option>

            <option>
              Under Review
            </option>

            <option>
              Accepted
            </option>

            <option>
              Rejected
            </option>

            <option>
              Corrections Required
            </option>

          </select>

          {/* TYPE */}

          <select
            name="presentationType"
            value={
              filters.presentationType
            }
            onChange={
              handleFilterChange
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Types
            </option>

            <option>
              Paper
            </option>

            <option>
              Poster
            </option>

          </select>

          {/* BUTTON */}

          <button
            onClick={applyFilters}
            className="bg-black text-white rounded-xl"
          >
            Apply Filters
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {loading ? (

          <div className="p-10 text-center">
            Loading...
          </div>

        ) : abstracts.length === 0 ? (

          <div className="p-10 text-center">
            No abstracts found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-black text-white">

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Author
                  </th>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {abstracts.map(
                  (abstract) => (

                    <tr
                      key={abstract._id}
                      className="border-b"
                    >

                      <td className="p-4">
                        {
                          abstract.abstractId
                        }
                      </td>

                      <td className="p-4">
                        {abstract.title}
                      </td>

                      <td className="p-4">
                        {abstract.author}
                      </td>

                      <td className="p-4">
                        {
                          abstract.presentationType
                        }
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            abstract.status ===
                            "Accepted"
                              ? "bg-green-100 text-green-700"
                              : abstract.status ===
                                "Rejected"
                              ? "bg-red-100 text-red-700"
                              : abstract.status ===
                                "Corrections Required"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {
                            abstract.status
                          }
                        </span>

                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            setSelectedAbstract(
                              abstract
                            )
                          }
                          className="bg-black text-white px-4 py-2 rounded-lg"
                        >
                          Review
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* MODAL */}

      {selectedAbstract && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Review Abstract
              </h2>

              <button
                onClick={() =>
                  setSelectedAbstract(
                    null
                  )
                }
                className="text-2xl"
              >
                ×
              </button>

            </div>

            {/* DETAILS */}

            <div className="space-y-6">

              <div>

                <h3 className="font-bold">
                  Abstract ID
                </h3>

                <p>
                  {
                    selectedAbstract.abstractId
                  }
                </p>

              </div>

              <div>

                <h3 className="font-bold">
                  Title
                </h3>

                <p>
                  {
                    selectedAbstract.title
                  }
                </p>

              </div>

              <div>

                <h3 className="font-bold">
                  Author
                </h3>

                <p>
                  {
                    selectedAbstract.author
                  }
                </p>

              </div>

              {/* STRUCTURED */}

              {selectedAbstract
                .abstractFormat ===
                "Structured" ? (

                <div className="space-y-5">

                  {Object.entries(
                    selectedAbstract
                      .structuredAbstract
                  ).map(
                    ([key, value]) => (

                      <div key={key}>

                        <h3 className="font-bold capitalize mb-2">
                          {key}
                        </h3>

                        <p className="bg-gray-100 p-4 rounded-xl">
                          {value}
                        </p>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <div>

                  <h3 className="font-bold mb-2">
                    Abstract
                  </h3>

                  <p className="bg-gray-100 p-4 rounded-xl">
                    {
                      selectedAbstract.unstructuredAbstract
                    }
                  </p>

                </div>
              )}

              {/* REMARKS */}

              <div>

                <h3 className="font-bold mb-2">
                  Reviewer Remarks
                </h3>

                <textarea
                  rows={4}
                  defaultValue={
                    selectedAbstract.reviewerRemarks
                  }
                  onChange={(e) =>
                    setSelectedAbstract({
                      ...selectedAbstract,
                      reviewerRemarks:
                        e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>

              {/* ACTIONS */}

              <div className="grid md:grid-cols-3 gap-4">

                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      "Accepted",
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="bg-green-600 text-white py-3 rounded-xl font-semibold"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      "Rejected",
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="bg-red-600 text-white py-3 rounded-xl font-semibold"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      "Corrections Required",
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="bg-yellow-500 text-white py-3 rounded-xl font-semibold"
                >
                  Corrections
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}