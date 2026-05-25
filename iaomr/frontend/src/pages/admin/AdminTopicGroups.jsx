import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

import {
  FiUsers,
  FiPlus,
  FiTrash2,
  FiSearch,
  FiFolder,
} from 'react-icons/fi'

export default function AdminTopicGroups() {
  const [groups, setGroups] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [showForm, setShowForm] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [form, setForm] =
    useState({
      topic: '',
      moderator: '',
      venue: '',
      maxParticipants: 20,
      description: '',
    })

  // =========================
  // FETCH GROUPS
  // =========================

  const fetchGroups = async () => {
    try {
      setLoading(true)

      const res = await api.get(
        `/topic-groups?search=${search}`
      )

      setGroups(res.data.data || [])
    } catch (err) {
      console.log(err)

      toast.error(
        'Failed to fetch groups'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [search])

  // =========================
  // HANDLE FORM
  // =========================

  const f = (k, v) => {
    setForm((p) => ({
      ...p,
      [k]: v,
    }))
  }

  // =========================
  // CREATE GROUP
  // =========================

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      await api.post(
        '/topic-groups',
        form
      )

      toast.success(
        'Topic group created'
      )

      setForm({
        topic: '',
        moderator: '',
        venue: '',
        maxParticipants: 20,
        description: '',
      })

      setShowForm(false)

      fetchGroups()
    } catch (err) {
      console.log(err)

      toast.error(
        'Failed to create group'
      )
    }
  }

  // =========================
  // DELETE GROUP
  // =========================

  const handleDelete = async (
    id
  ) => {
    if (
      !confirm(
        'Delete this topic group?'
      )
    )
      return

    try {
      await api.delete(
        `/topic-groups/${id}`
      )

      toast.success('Deleted')

      fetchGroups()
    } catch (err) {
      console.log(err)

      toast.error(
        'Delete failed'
      )
    }
  }

  return (
    <AdminLayout title="Topic Groups">
      {/* HERO */}
      <div className="bg-[rgb(27,46,87)] rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.25em] text-blue-100 text-xs font-semibold">
              IAOMR 2026
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Topic Groups
            </h1>

            <p className="mt-4 text-blue-100 max-w-2xl">
              Organize delegates into
              focused discussion groups
              based on research topics,
              interests, and presentation
              themes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 min-w-[220px]">
            <p className="text-blue-100 text-sm">
              Total Groups
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {groups.length}
            </h2>
          </div>
        </div>
      </div>

      {/* TOP ACTIONS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* SEARCH */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search topic groups..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="h-12 px-6 rounded-2xl bg-[rgb(27,46,87)] text-white font-semibold flex items-center justify-center gap-2"
        >
          <FiPlus />

          {showForm
            ? 'Cancel'
            : 'Create Group'}
        </button>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Create Topic Group
          </h2>

          <form
            onSubmit={handleAdd}
            className="space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Topic Name
                </label>

                <input
                  type="text"
                  required
                  value={form.topic}
                  onChange={(e) =>
                    f(
                      'topic',
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
                  placeholder="AI in Oral Pathology"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Moderator
                </label>

                <input
                  type="text"
                  value={form.moderator}
                  onChange={(e) =>
                    f(
                      'moderator',
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
                  placeholder="Dr. John Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Venue
                </label>

                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) =>
                    f(
                      'venue',
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
                  placeholder="Hall A"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max Participants
                </label>

                <input
                  type="number"
                  value={
                    form.maxParticipants
                  }
                  onChange={(e) =>
                    f(
                      'maxParticipants',
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  f(
                    'description',
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none"
                placeholder="Describe the discussion topic..."
              />
            </div>

            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-[rgb(27,46,87)] text-white font-semibold"
            >
              Create Topic Group
            </button>
          </form>
        </div>
      )}

      {/* GROUPS */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-14 w-14 border-4 border-slate-200 border-t-[rgb(27,46,87)] rounded-full animate-spin" />
        </div>
      ) : groups.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center">
          <FiFolder className="mx-auto text-6xl text-slate-300 mb-4" />

          <h2 className="text-2xl font-bold text-slate-700">
            No Topic Groups
          </h2>

          <p className="text-slate-500 mt-2">
            Create your first topic
            discussion group.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {group.topic}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    {group.description}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(
                      group._id
                    )
                  }
                  className="h-11 w-11 rounded-2xl bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Moderator
                  </p>

                  <p className="font-semibold mt-2 text-slate-800">
                    {group.moderator ||
                      '—'}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Venue
                  </p>

                  <p className="font-semibold mt-2 text-slate-800">
                    {group.venue ||
                      '—'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <FiUsers />

                  <span className="font-medium">
                    {group.participants
                      ?.length || 0}
                    {' / '}
                    {
                      group.maxParticipants
                    }{' '}
                    participants
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}