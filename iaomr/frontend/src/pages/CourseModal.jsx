import { X, Calendar, Users, IndianRupee, Phone } from "lucide-react";

export default function CourseModal({ course, close }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">

        <div className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl relative">

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 bg-red-500 text-white p-2 rounded-full"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-[#0F2854] text-white p-8 rounded-t-3xl">
            <p className="text-sm uppercase tracking-wider">
              {course.courseNo}
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-3">
              {course.title}
            </h1>
          </div>

          {/* Speakers */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {course.speakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 text-center shadow"
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-[#0F2854]"
                />

                <h2 className="font-bold text-xl mt-4 text-[#0F2854]">
                  {speaker.name}
                </h2>

                <p className="font-semibold mt-2">
                  {speaker.qualification}
                </p>

                <p className="text-gray-600 mt-2">
                  {speaker.department}
                </p>

                <p className="text-gray-700 mt-2">
                  {speaker.college}
                </p>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="px-8">
            <h2 className="text-2xl font-bold text-[#0F2854] mb-4">
              Course Highlights
            </h2>

            <ul className="space-y-3">
              {course.highlights.map((item, index) => (
                <li
                  key={index}
                  className="bg-blue-50 p-4 rounded-xl"
                >
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Information Cards */}
          <div className="grid md:grid-cols-3 gap-4 p-8">

            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <IndianRupee className="mx-auto text-[#0F2854]" />
              <p className="font-semibold mt-2">Fee</p>
              <p>{course.fee}</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <Calendar className="mx-auto text-[#0F2854]" />
              <p className="font-semibold mt-2">Date</p>
              <p>{course.date}</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <Users className="mx-auto text-[#0F2854]" />
              <p className="font-semibold mt-2">Seats</p>
              <p>{course.seats}</p>
            </div>

          </div>

          {/* Coordinator */}
          <div className="mx-8 mb-8 bg-[#0F2854] text-white rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              Course Coordinator
            </h3>

            <p className="mt-3 text-lg">
              {course.coordinator}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Phone size={18} />
              {course.phone}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 p-8 pt-0">
            <button className="flex-1 bg-[#0F2854] text-white py-4 rounded-xl font-semibold hover:bg-[#183b75]">
              Register Now
            </button>

            <button
              onClick={close}
              className="flex-1 border-2 border-[#0F2854] text-[#0F2854] py-4 rounded-xl font-semibold"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}