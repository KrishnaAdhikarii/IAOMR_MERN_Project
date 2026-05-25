import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiClock,
  FiX,
  FiFileText,
} from 'react-icons/fi'

export default function AdminAbstracts() {
  const [abstracts, setAbstracts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [selectedAbstract,
    setSelectedAbstract] =
    useState(null)

  const [filters, setFilters] =
    useState({
      search: '',
      status: '',
      presentationType: '',
    })

  // =========================
  // FETCH ABSTRACTS
  // =========================

  const fetchAbstracts = async () => {
    try {
      setLoading(true)

      const query =
        new URLSearchParams(
          filters
        ).toString()

      const res = await api.get(
        `/abstracts/all?${query}`
      )

      setAbstracts(
        res.data.abstracts || []
      )
    } catch (error) {
      console.log(error)

      toast.error(
        'Failed to fetch abstracts'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAbstracts()
  }, [])

  // =========================
  // UPDATE STATUS
  // =========================

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
      )

      toast.success(
        `Abstract ${status}`
      )

      fetchAbstracts()

      setSelectedAbstract(null)
    } catch (error) {
      console.log(error)

      toast.error(
        'Failed to update status'
      )
    }
  }

  // =========================
  // FILTER CHANGE
  // =========================

  const handleFilterChange = (
    e
  ) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.value,
    })
  }

  const applyFilters = () => {
    fetchAbstracts()
  }

  // =========================
  // STATUS BADGE
  // =========================

  const statusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700'

      case 'Rejected':
        return 'bg-red-100 text-red-700'

      case 'Corrections Required':
        return 'bg-yellow-100 text-yellow-700'

      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <AdminLayout title="Abstract Review">
      {/* HERO */}
      <div className="bg-[rgb(27,46,87)] rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-blue-100 text-xs font-semibold">
              IAOMR 2026
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Abstract Review
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl">
              Review submitted
              abstracts, evaluate
              scientific quality, and
              manage presentation
              approvals for IAOMR 2026.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 min-w-[220px]">
            <p className="text-blue-100 text-sm">
              Total Abstracts
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {abstracts.length}
            </h2>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="search"
              placeholder="Search abstracts..."
              value={filters.search}
              onChange={
                handleFilterChange
              }
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* STATUS */}
          <select
            name="status"
            value={filters.status}
            onChange={
              handleFilterChange
            }
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
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
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
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
            className="h-12 rounded-2xl bg-[rgb(27,46,87)] text-white font-semibold hover:opacity-90 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-14 w-14 border-4 border-slate-200 border-t-[rgb(27,46,87)] rounded-full animate-spin" />
          </div>
        ) : abstracts.length === 0 ? (
          <div className="p-16 text-center">
            <FiFileText className="mx-auto text-5xl text-slate-300 mb-4" />

            <h2 className="text-2xl font-bold text-slate-700">
              No Abstracts Found
            </h2>

            <p className="text-slate-500 mt-2">
              No submissions match
              your current filters.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP */}
            <div className="hidden xl:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {[
                      'ID',
                      'Title',
                      'Author',
                      'Type',
                      'Status',
                      'Action',
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {abstracts.map(
                    (abstract) => (
                      <tr
                        key={
                          abstract._id
                        }
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-5 font-bold text-[rgb(27,46,87)] whitespace-nowrap">
                          {
                            abstract.abstractId
                          }
                        </td>

                        <td className="px-6 py-5">
                          <div className="max-w-[350px]">
                            <h3 className="font-semibold text-slate-800 truncate">
                              {
                                abstract.title
                              }
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                              {
                                abstract.category
                              }
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-medium text-slate-800">
                              {
                                abstract.author
                              }
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                              {
                                abstract.institution
                              }
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {
                              abstract.presentationType
                            }
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(
                              abstract.status
                            )}`}
                          >
                            {
                              abstract.status
                            }
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              setSelectedAbstract(
                                abstract
                              )
                            }
                            className="h-10 px-4 rounded-xl bg-[rgb(27,46,87)] text-white hover:opacity-90 transition flex items-center gap-2"
                          >
                            <FiEye />
                            Review
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="xl:hidden space-y-4 p-4">
              {abstracts.map(
                (abstract) => (
                  <div
                    key={abstract._id}
                    className="border border-slate-200 rounded-3xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">
                          {
                            abstract.title
                          }
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {
                            abstract.abstractId
                          }
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                          abstract.status
                        )}`}
                      >
                        {
                          abstract.status
                        }
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Author
                        </p>

                        <p className="font-medium mt-1">
                          {
                            abstract.author
                          }
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Type
                        </p>

                        <p className="font-medium mt-1">
                          {
                            abstract.presentationType
                          }
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedAbstract(
                          abstract
                        )
                      }
                      className="w-full mt-5 h-12 rounded-2xl bg-[rgb(27,46,87)] text-white font-medium"
                    >
                      Review Abstract
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedAbstract && (
        <div
          onClick={() =>
            setSelectedAbstract(null)
          }
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Review Abstract
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {
                    selectedAbstract.abstractId
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedAbstract(
                    null
                  )
                }
                className="h-11 w-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800">
                  {
                    selectedAbstract.title
                  }
                </h3>

                <p className="text-slate-500 mt-2">
                  By{' '}
                  {
                    selectedAbstract.author
                  }{' '}
                  •{' '}
                  {
                    selectedAbstract.institution
                  }
                </p>
              </div>

              {/* STRUCTURED */}
              {selectedAbstract.abstractFormat ===
              'Structured' ? (
                <div className="space-y-5">
                  {Object.entries(
                    selectedAbstract.structuredAbstract
                  ).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-50 rounded-2xl p-5 border border-slate-200"
                      >
                        <h3 className="font-bold capitalize text-slate-800 mb-3">
                          {key}
                        </h3>

                        <p className="text-slate-600 leading-7">
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">
                    Abstract
                  </h3>

                  <p className="text-slate-600 leading-7">
                    {
                      selectedAbstract.unstructuredAbstract
                    }
                  </p>
                </div>
              )}

              {/* REMARKS */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Reviewer Remarks
                </label>

                <textarea
                  rows={5}
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none"
                />
              </div>

              {/* ACTIONS */}
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      'Accepted',
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="h-14 rounded-2xl bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <FiCheckCircle />
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      'Rejected',
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="h-14 rounded-2xl bg-red-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <FiXCircle />
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      selectedAbstract._id,
                      'Corrections Required',
                      selectedAbstract.reviewerRemarks
                    )
                  }
                  className="h-14 rounded-2xl bg-yellow-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <FiAlertCircle />
                  Corrections
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}