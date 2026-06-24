import React from "react";

import prasanti from "./speakers/prasanthi.jpeg";
import peeyush from "./speakers/peeyush.jpeg";
import tarun from "./speakers/tarun.jpeg";
import deepankar from "./speakers/deepankar.jpeg";
import dipti from "./speakers/dipti.jpeg";
import jayanth from "./speakers/jayanth.jpeg";
import upasana from "./speakers/upasana.jpeg";
import vinay from "./speakers/vinay.jpeg";

import qr from "./speakers/qr.jpeg";

const courses = [
    {
        id: 1,
        title:
            "Unlocking the Third Dimension: A One-Day Workshop on CBCT in Clinical Dentistry",
        formLink: "https://forms.gle/5RY23fFcr4a8J12V6",
        speakers: [
            {
                name: "Dr. V. Jayanth Kumar",
                designation: [
                    "MDS, Ph.D",
                    "Professor",
                    "Oral Medicine & Radiology",
                    "Saveetha Dental College, Chennai"
                ],
                image: jayanth,
            },
            {
                name: "Dr. S. Prasanthi",
                designation: [
                    "MDS (Ph.D)",
                    "Senior Lecturer",
                    "Oral Medicine & Radiology",
                    "Saveetha Dental College, Chennai"
                ],
                image: prasanti,
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
        formLink: "https://forms.gle/KCpfavd14Ws4NpXu7",
        speakers: [
            {
                name: "Dr. Upasana Sethi Ahuja",
                designation: [
                    "MDS",
                    "Diplomate American Board of Orofacial Pain",
                    "Fellowship & Mastership (Roseman University, USA)",
                    "Professor and Head, Oral Medicine & Radiology, IDST Modinagar"
                ],
                image: upasana,
            },
            {
                name: "Dr. Vinay Mohan",
                designation: [
                    "MDS",
                    "Professor and Head, Oral Medicine & Radiology, KD Dental College and Hospital, Mathura"
                ],
                image: vinay,
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
        title: "Clinical Guide and Protocol for Diode Laser in Dentistry",
        formLink: "https://forms.gle/MsJNnWgGHPw7vZtDA",
        speakers: [
            {
                name: "Dr. Peeyush Shivahare",
                designation: [
                    "MDS, Fellowship in Orofacial Pain, TMD & Sleep Apnea (Roseman University, USA)",
                    "Associate Professor & Head",
                    "Oral Medicine & Radiology",
                    "Baba Kinaram Autonomous State Medical College, Chandauli"
                ],
                image: peeyush,
            },
            {
                name: "Dr. Tarun Vyas",
                designation: [
                    "MDS",
                    "Associate Professor, Oral Medicine & Radiology",
                    "College of Dental Science and Hospital, Amargadh, Gujarat"
                ],
                image: tarun,
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
        formLink: "https://forms.gle/15sGLTwAKsGrr8gZ6",
        speakers: [
            {
                name: "Dr. Deepankar Bhatnagar",
                designation: [
                    "MDS",
                    "Professor and Head, Ph.D Guide, Department of Orthodontics and Dentofacial Orthopaedics, M.M. College of Dental Sciences and Research, Haryana"
                ],
                image: deepankar,
            },
            {
                name: "Dr. Dipti Bhatnagar",
                designation: [
                    "MDS",
                    "Professor, Oral Physician and Maxillofacial Radiologist",
                    "Masters in Orofacial Pain and Sleep Medicine",
                    "Editor in Chief, JIAOMR"
                ],
                image: dipti,
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

                <div className="bg-sky-100 grid lg:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-sky-100 rounded-3xl shadow-xl overflow-hidden"
                        >
                            <div className="bg-[#0F2854] text-white p-5">
                                <h2 className="text-2xl font-bold">
                                    Pre-Convention Course {course.id}
                                </h2>
                                <p className="mt-2 text-lg">{course.title}</p>
                            </div>

                            <div className="bg-sky-100 grid grid-cols-2 gap-6 p-6">
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
                                        <div className="text-gray-600 text-sm space-y-1">
                                            {speaker.designation.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-sky-100 px-6">
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

                            <div className="bg-sky-100 p-6 mt-0.5 border-t">
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
                                    <button
                                        onClick={() =>
                                            window.open(course.formLink, "_blank")
                                        }
                                        className="flex-1 bg-[#0F2854] text-white py-3 rounded-xl hover:bg-sky-800"
                                    >
                                        Register
                                    </button>

                                    <button
                                        onClick={() => window.open(qr, "_blank")}
                                        className="flex-1 border border-sky-600 text-sky-600 py-3 rounded-xl hover:bg-sky-50"
                                    >
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