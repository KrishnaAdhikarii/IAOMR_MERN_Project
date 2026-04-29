import React, { useRef } from "react";
import { useIsVisible } from "../components/isVisible.jsx";
import { OfficeCard } from '../components/OfficeCard.jsx';


import photo from "../images/OIP.jpeg"

import prasanth from "../images/Dr-Prasanth-Shenoy.png"
import avinash from "../images/dr-Avinash.png"
import ajay from "../images/Dr-Ajay-Parihar.png"
import shiva from "../images/Dr-Shiva-Prasad.png"
import sreenivas from "../images/Dr-Sreenivasan.png"
import krishna from "../images/Dr-Sri-Krishna.png"

import hemant from "../images/hemant.png";
import manisha from "../images/manisha.png";
import shilpa from "../images/shilpa.png";
import appaji from "../images/appaji.png";
import venkatesh from "../images/venkatesh.png";

import dipti from "../images/dipti.png";
import pramod from "../images/pramod.png";

import prashanthi from "../images/prashanthi.png";

import deepak from "../images/deepak.png";
import shambulingappa from "../images/shambulingappa.png";
import shivu from "../images/shivu.png";

import mohit from "../images/mohit.png";
import saravanan from "../images/saravanan.png";
import pavan from "../images/pavan.png";
import rachana from "../images/rachana.png";
import uthkal from "../images/uthkal.png";
import satyapal from "../images/satyapal.png";
import nikhil from "../images/nikhil.png";
import deepa from "../images/deepa.png";
import ashik from "../images/ashik.png";
import amol from "../images/amol.png";
import amita from "../images/amita.png";
import bhuvaneshwari from "../images/bhuvaneshwari.png";
import pallavi from "../images/pallavi.png";
import praveen from "../images/praveen.png";
import raghunand from "../images/raghunand.png";

const imageMap = {
  "Dr Prashanth Shenoy": prasanth,
  "Dr Avinash Tejasvi M L": avinash,
  "Dr Ajay Pratap Singh Parihar": ajay,
  "Dr V Sreenivasan": sreenivas,
  "Dr Sri Krishna K": krishna,
  "Dr Shiva Prasad S": shiva,

  "Dr Hemant Mathur": hemant,
  "Dr Manisha Khorate": manisha,
  "Dr Shilpa Patil": shilpa,
  "Dr Appaji Athota": appaji,
  "Dr J Venkatesh": venkatesh,

  "Dr Dipti Bhatnagar": dipti,
  "Dr G V Pramod": pramod,

  "Dr Prashanthi Reddy": prashanthi,

  "Dr Deepak T A": deepak,
  "Dr Shambulingappa P": shambulingappa,
  "Dr Shivu M E": shivu,

  "Dr Mohit Pal Singh": mohit,
  "Dr T Saravanan": saravanan,
  "Dr Y Pavan Kumar": pavan,
  "Dr Rachana Prabhu": rachana,
  "Dr Uthkal M P": uthkal,
  "Dr Satya Pal Yadav": satyapal,
  "Dr Nikhil Raj": nikhil,
  "Dr M S Deepa": deepa,
  "Dr Ashik S Hegde": ashik,
  "Dr Amol Ashok Dhokar": amol,
  "Dr Amita Aditya": amita,
  "Dr S Bhuvaneshwari": bhuvaneshwari,
  "Dr Pallavi Prakash Ch": pallavi,
  "Dr Praveen Kumar R": praveen,
  "Dr Raghunand Sinde J": raghunand,
};


export default function OfficeCommittee() {
  const officeRef = useRef(null);
  const officeVisible = useIsVisible(officeRef);

  const sections = [
    {
      title: "IAOMR Office Bearers",
      members: [
        { name: "Dr Prashanth Shenoy", designation: "President", img: photo },
        { name: "Dr Avinash Tejasvi M L", designation: "Hon. Gen. Secretary", img: photo },
        { name: "Dr Ajay Pratap Singh Parihar", designation: "Head Office Treasurer", img: photo },
        { name: "Dr V Sreenivasan", designation: "President Elect", img: photo },
        { name: "Dr Sri Krishna K", designation: "Imm. Past President", img: photo },
        { name: "Dr Shiva Prasad S", designation: "Imm. Past Secretary", img: photo },
      ],
    },

    {
      title: "Vice Presidents",
      members: [
        { name: "Dr Hemant Mathur", img: photo },
        { name: "Dr Manisha Khorate", img: photo },
        { name: "Dr Shilpa Patil", img: photo },
        { name: "Dr Appaji Athota", img: photo },
        { name: "Dr J Venkatesh", img: photo },
      ],
    },

    {
      title: "Head Office Joint Secretaries",
      members: [
        { name: "Dr Dipti Bhatnagar", img: photo },
        { name: "Dr G V Pramod", img: photo },
      ],
    },

    {
      title: "Editor-in-Chief",
      members: [{ name: "Dr Prashanthi Reddy", img: photo }],
    },

    {
      title: "Registered Office",
      members: [
        { name: "Dr Deepak T A", designation: "Secretary", img: photo },
        { name: "Dr Shambulingappa P", designation: "Joint Secretary", img: photo },
        { name: "Dr Shivu M E", designation: "Treasurer", img: photo },
      ],
    },

    {
      title: "Executive Members",
      members: [
        { name: "Dr Mohit Pal Singh", img: photo },
        { name: "Dr T Saravanan", img: photo },
        { name: "Dr Y Pavan Kumar", img: photo },
        { name: "Dr Rachana Prabhu", img: photo },
        { name: "Dr Uthkal M P", img: photo },
        { name: "Dr Satya Pal Yadav", img: photo },
        { name: "Dr Nikhil Raj", img: photo },
        { name: "Dr M S Deepa", img: photo },
        { name: "Dr Ashik S Hegde", img: photo },
        { name: "Dr Amol Ashok Dhokar", img: photo },
        { name: "Dr Amita Aditya", img: photo },
        { name: "Dr S Bhuvaneshwari", img: photo },
        { name: "Dr Pallavi Prakash Ch", img: photo },
        { name: "Dr Praveen Kumar R", img: photo },
        { name: "Dr Raghunand Sinde J", img: photo },
      ],
    },
  ];

  return (
    // <div
    //   ref={officeRef}
    //   className={`office-page ${
    //     officeVisible ? "slide-up-in" : "slide-down-out"
    //   }`}
    // >
    <div className="office-page">
      {sections.map((section, idx) => (
        <div key={idx} className="office-section" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '100px', marginTop: '100px', fontFamily: "'Kumbh Sans',sans-serrif" }}>{section.title}</h2>

          <div className="office-grid">
            {section.members.map((m, i) => (
              <OfficeCard
                key={i}
                name={m.name}
                designation={m.designation}
                img={imageMap[m.name]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}