import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

import {
  FiSearch,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from 'react-icons/fi'

export default function AdminRegistrations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatus] = useState('')
  const [catFilter, setCat] = useState('')

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [selected, setSelected] = useState(null)
  const [verifyStatus, setVerifyStatus] =
    useState('PAID')

  const LIMIT = 15

  const fetchData = async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams({
        page,
        limit: LIMIT,
      })

      if (search)
        params.set('search', search)

      if (statusFilter)
        params.set('status', statusFilter)

      if (catFilter)
        params.set('category', catFilter)

      const res = await api.get(
        `/registration?${params}`
      )

      setData(res.data.data || [])
      setTotal(res.data.total || 0)
    } catch (err) {
      console.error(err)
      toast.error(
        'Failed to fetch registrations'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, search, statusFilter, catFilter])

  const handleVerify = async (id) => {
    try {
      await api.put(
        `/registration/${id}/verify`,
        {
          status: verifyStatus,
        }
      )

      toast.success(
        `Status updated to ${verifyStatus}`
      )

      setSelected(null)
      fetchData()
    } catch (err) {
      console.error(err)
      toast.error('Update failed')
    }
  }

  const statusColors = {
    PAID: 'bg-green-100 text-green-700',
    PENDING:
      'bg-yellow-100 text-yellow-700',
    FAILED: 'bg-red-100 text-red-700',
  }

  return (
    <AdminLayout title="Registrations">
      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search registrations..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
          >
            <option value="">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="PAID">
              Paid
            </option>

            <option value="FAILED">
              Failed
            </option>
          </select>

          {/* Category */}
          <select
            value={catFilter}
            onChange={(e) => {
              setCat(e.target.value)
              setPage(1)
            }}
            className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
          >
            <option value="">
              All Categories
            </option>

            <option value="Faculty">
              Faculty
            </option>

            <option value="Practitioner">
              Practitioner
            </option>

            <option value="Post Graduate">
              Post Graduate
            </option>

            <option value="Foreign Delegate">
              Foreign Delegate
            </option>
          </select>

          {/* Total */}
          <div className="bg-[rgb(27,46,87)] text-white rounded-2xl px-5 py-4">
            <p className="text-blue-100 text-sm uppercase tracking-wide">
              Total Registrations
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {total}
            </h3>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-14 w-14 border-4 border-slate-200 border-t-[rgb(27,46,87)] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden xl:block bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {[
                      'Reg ID',
                      'Name',
                      'Category',
                      'Amount',
                      'Status',
                      'Date',
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
                  {data.map((r) => (
                    <tr
                      key={r._id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-5 font-bold text-[rgb(27,46,87)]">
                        {r.regNumber}
                      </td>

                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {r.name}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {r.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                          {r.category}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-semibold">
                        ₹
                        {r.amount?.toLocaleString()}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusColors[
                              r.status
                            ]
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500 whitespace-nowrap">
                        {new Date(
                          r.createdAt
                        ).toLocaleDateString(
                          'en-IN'
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            setSelected(r)
                          }
                          className="h-10 px-4 rounded-xl bg-[rgb(27,46,87)] text-white hover:opacity-90 transition flex items-center gap-2"
                        >
                          <FiEye />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}

                  {data.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-16 text-slate-500"
                      >
                        No registrations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="xl:hidden space-y-4">
            {data.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">
                      {r.name}
                    </h3>

                    <p className="text-sm text-slate-500 break-all">
                      {r.email}
                    </p>

                    <p className="text-xs mt-1 text-slate-400">
                      {r.institution}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {r.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Amount
                    </p>

                    <p className="font-bold text-lg mt-1">
                      ₹
                      {r.amount?.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Date
                    </p>

                    <p className="font-medium mt-1 text-sm">
                      {new Date(
                        r.createdAt
                      ).toLocaleDateString(
                        'en-IN'
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[r.status]
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setSelected(r)
                  }
                  className="w-full mt-5 h-12 rounded-2xl bg-[rgb(27,46,87)] text-white font-medium hover:opacity-90 transition"
                >
                  Review Registration
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {total > LIMIT && (
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
              <button
                onClick={() =>
                  setPage((p) => p - 1)
                }
                disabled={page === 1}
                className="h-11 px-5 rounded-2xl border border-slate-200 bg-white disabled:opacity-40 flex items-center gap-2"
              >
                <FiChevronLeft />
                Prev
              </button>

              <div className="px-5 h-11 rounded-2xl bg-[rgb(27,46,87)] text-white flex items-center font-medium">
                Page {page} of{' '}
                {Math.ceil(total / LIMIT)}
              </div>

              <button
                onClick={() =>
                  setPage((p) => p + 1)
                }
                disabled={
                  page >=
                  Math.ceil(total / LIMIT)
                }
                className="h-11 px-5 rounded-2xl border border-slate-200 bg-white disabled:opacity-40 flex items-center gap-2"
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Review Registration
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Verify registration
                </p>
              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="h-11 w-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  [
                    'Reg Number',
                    selected.regNumber,
                  ],
                  ['Name', selected.name],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  [
                    'Category',
                    selected.category,
                  ],
                  [
                    'Institution',
                    selected.institution,
                  ],
                  [
                    'City / State',
                    `${selected.city}, ${selected.state}`,
                  ],
                  [
                    'Amount',
                    `₹${selected.amount?.toLocaleString()}`,
                  ],
                  [
                    'Payment ID',
                    selected.paymentId,
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
                  >
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                      {k}
                    </p>

                    <p className="font-medium text-slate-800 break-words">
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Update Status
                </label>

                <select
                  value={verifyStatus}
                  onChange={(e) =>
                    setVerifyStatus(
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
                >
                  <option value="PAID">
                    PAID
                  </option>

                  <option value="PENDING">
                    PENDING
                  </option>

                  <option value="FAILED">
                    FAILED
                  </option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() =>
                  setSelected(null)
                }
                className="h-12 px-6 rounded-2xl border border-slate-200 bg-white font-medium"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleVerify(selected._id)
                }
                className="h-12 px-6 rounded-2xl bg-[rgb(27,46,87)] text-white font-medium hover:opacity-90 transition"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}