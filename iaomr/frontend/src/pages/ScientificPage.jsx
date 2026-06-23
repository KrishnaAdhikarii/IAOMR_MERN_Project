import React from "react";

const courses = [
  {
    id: 1,
    title:
      "Unlocking the Third Dimension: A One-Day Workshop on CBCT in Clinical Dentistry",
    speakers: [
      {
        name: "Dr. V. Jayanth Kumar",
        designation:
          "MDS, Ph.D, Professor, Saveetha Dental College, Chennai",
        image: "/speakers/jayanth.jpg",
      },
      {
        name: "Dr. S. Prasanthi",
        designation:
          "MDS (Ph.D), Senior Lecturer, Saveetha Dental College, Chennai",
        image: "/speakers/prasanthi.jpg",
      },
    ],
    highlights: [
      "Fundamentals of CBCT",
      "CBCT-guided implant planning",
      "Digital workflow integration",
      "Advanced endodontic applications",
      "TMJ and airway imaging",
      "Clinical practice applications",
    ],
    coordinator: "Dr. Y. Madhu Sudhan Rao",
    phone: "9160743909",
  },
  {
    id: 2,
    title:
      "Clinical Tips to Manage Temporomandibular Disorders and Orofacial Pain",
    speakers: [
      {
        name: "Dr. Upasana Sethi Ahuja",
        designation: "Professor and Head, IDST Modinagar",
        image: "/speakers/upasana.jpg",
      },
      {
        name: "Dr. Vinay Mohan",
        designation: "Professor and Head, KD Dental College",
        image: "/speakers/vinay.jpg",
      },
    ],
    highlights: [
      "Muscle examination",
      "TMJ diagnosis",
      "Trigger point injections",
      "Myofascial pain management",
      "TENS and Ultrasound therapy",
      "Stabilization appliance",
    ],
    coordinator: "Dr. Samruth",
    phone: "6304905152",
  },
  {
    id: 3,
    title:
      "Clinical Guide and Protocol for Diode Laser in Dentistry",
    speakers: [
      {
        name: "Dr. Peeyush Shivahare",
        designation: "Associate Professor",
        image: "/speakers/peeyush.jpg",
      },
      {
        name: "Dr. Tarun Vyas",
        designation: "Associate Professor",
        image: "/speakers/tarun.jpg",
      },
    ],
    highlights: [
      "Laser dentistry fundamentals",
      "Oral mucosal lesion management",
      "Photobiomodulation",
      "Clinical videos",
      "TMD management",
      "Hands-on training",
    ],
    coordinator: "Dr. Sharon",
    phone: "9502085963",
  },
  {
    id: 4,
    title:
      "3D Printing in Dentistry: From Digital Design to Clinical Application",
    speakers: [
      {
        name: "Dr. Deepankar Bhatnagar",
        designation: "Professor and Head",
        image: "/speakers/deepankar.jpg",
      },
      {
        name: "Dr. Dipti Bhatnagar",
        designation: "Professor",
        image: "/speakers/dipti.jpg",
      },
    ],
    highlights: [
      "Introduction to 3D Printing",
      "Printing technologies",
      "Digital workflow",
      "Applications in dentistry",
      "Materials used",
      "Hands-on demonstration",
    ],
    coordinator: "Dr. Samruth",
    phone: "6304905152",
  },
];

export default function ConventionPage() {
  return (
    <div className="bg-sky-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            24th National IAOMR PG Convention 2026
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            August 6, 7 & 8 • Visakhapatnam
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="bg-[#0F2854] text-white p-5">
                <h2 className="text-2xl font-bold">
                  Pre-Convention Course {course.id}
                </h2>
                <p className="mt-2 text-lg">{course.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 p-6">
                {course.speakers.map((speaker, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-[#0F2854]"
                    />
                    <h3 className="font-bold mt-4 text-lg">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {speaker.designation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-6">
                <h4 className="font-bold text-xl mb-3">
                  Course Highlights
                </h4>

                <ul className="space-y-2">
                  {course.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-600">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 mt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Fee: ₹1500</p>
                    <p>Date: 06-08-2026</p>
                    <p>Seats: 25</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {course.coordinator}
                    </p>
                    <p>{course.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-[#0F2854] text-white py-3 rounded-xl hover:bg-sky-800">
                    Register
                  </button>

                  <button className="flex-1 border border-sky-600 text-sky-600 py-3 rounded-xl hover:bg-sky-50">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold">
            Department of Oral Medicine & Radiology
          </h3>
          <p className="text-gray-600">
            Anil Neerukonda Institute of Dental Sciences
          </p>
        </div>
      </div>
    </div>
  );
}