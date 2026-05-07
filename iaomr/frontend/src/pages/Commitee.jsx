import React from "react";

// 👉 import your images properly
import princi from "../images/princi.png";
import badari from "../images/hod.png";
import rahul from "../images/rahul.png";
import rajesh from "../images/rajesh.png";
import lokesh from "../images/lokesh.png";
import upendra from "../images/upendra.png";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px clamp(12px, 3vw, 40px)",
    fontFamily: "system-ui, Arial, sans-serif",
    background: "linear-gradient(180deg, #f6f9fc, #eef4f8)",
    color: "#1f2d3d",
    justifyContent: "center"
  },

  sectionDivider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "40px 0 20px",
  },

  line: {
    flex: 1,
    height: "1px",
    background: "#c7d3dd",
  },

  pill: {
    padding: "8px 18px",
    background: "#0f4c75",
    color: "#fff",
    borderRadius: "999px",
    fontSize: "13px",
    letterSpacing: "1.5px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  // Chief Patron
  chiefRow: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "600px",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f4c75, #3282b8)",
    padding: "20px",
    borderRadius: "16px",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    alignSelf: "center",
    margin: "0 auto",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
    },
  },

  chiefText: {
    flex: 1,
    minWidth: "220px",
  },

  chiefImg: {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "50%",
    backgroundColor:'beige',
    border: "3px solid #fff",
  },

  // Team
  teamRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },

  member: {
    textAlign: "center",
  },

  avatar: {
    width: "110px",
    height: "110px",
    borderRadius: "18px",
    objectFit: "cover",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },

  // Advisors
  advisorBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    padding: "18px",
    borderRadius: "14px",
    background: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "1px solid #e6eef5",
  },

  // Cards
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #e6eef5",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
};

const Card = ({ title, members }) => (
  <div style={styles.card}>
    <h4>{title}</h4>
    {members.map((m, i) => (
      <div key={i}>{m}</div>
    ))}
  </div>
);

export default function FullCommitteePage() {
  return (
    <div style={styles.page}>

      {/* CHIEF PATRON */}
      <div style={styles.sectionDivider}>
        <div style={styles.line}></div>
        <div style={styles.pill}>CHIEF PATRON</div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.chiefRow}>
        <div style={styles.chiefText}>
          <h3>Dr. L. Vamsi Krishna Reddy</h3>
          <p>Principal</p>
          <p>Anil Neerukonda Institute of Dental Sciences</p>
        </div>
        <img src={princi} style={styles.chiefImg} />
      </div>

      {/* ORGANIZING TEAM */}
      <div style={styles.sectionDivider}>
        <div style={styles.line}></div>
        <div style={styles.pill}>ORGANIZING COMMITTEE</div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.teamRow}>
        {[
          { name: "Dr. B. Badari Ramakrishna", role: "Chairman", img: badari },
          { name: "Dr. V. Rahul Marshal", role: "Secretary", img: rahul },
          { name: "Dr. N. Rajesh", role: "Scientific Chairman", img: rajesh },
          { name: "Dr. K. V. Lokesh", role: "Treasurer", img: lokesh },
          { name: "Dr. G. Upendra", role: "Joint Secretary", img: upendra },
        ].map((m, i) => (
          <div key={i} style={styles.member}>
            <img src={m.img} style={styles.avatar} />
            <div>{m.name}</div>
            <small>{m.role}</small>
          </div>
        ))}
      </div>

      {/* REGIONAL ADVISORS */}
      <div style={styles.sectionDivider}>
        <div style={styles.line}></div>
        <div style={styles.pill}>REGIONAL ADVISORS</div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.advisorBox}>
        <div>
          Dr. A. Ravi Kiran<br />
          Dr. K. Sri Krishna<br />
          Dr. R. Sudhakara Reddy<br />
          Dr. T. Rama Swamy
        </div>
        <div>
          Dr. K. Vinay Kumar Reddy<br />
          Dr. D. Ramaraju<br />
          Dr. V. Nagalakshmi<br />
          Dr. P. Aruna
        </div>
        <div>
          Dr. N. Kannan<br />
          Dr. B. Vamsi Pavani<br />
          Dr. M. Manjula<br />
          Dr. N. Venkateswarlu
        </div>
      </div>

      {/* COMMITTEES */}
      <div style={styles.sectionDivider}>
        <div style={styles.line}></div>
        <div style={styles.pill}>COMMITTEES</div>
        <div style={styles.line}></div>
      </div>

      <div style={styles.grid}>
        <Card title="Registration Committee" members={[
          "Dr. Y. Pavan Kumar", "Dr. P. Suresh Kumar", "Dr. Purna Chandar Rao",
          "Dr. B. Swapana Sridevi", "Dr. C. Vani", "Dr. B. Anupama"
        ]} />
        <Card title="Pre-Convention Committee" members={[
          "Dr. K. Sridevi", "Dr. T. Ramesh", "Dr. G. Komali",
          "Dr. Mallikamahalakshmi", "Dr. N. S. V. Santhosh", "Dr. E. Sumalatha"
        ]} />
        <Card title="Scientific Committee" members={[
          "Dr. Y. Samata", "Dr. K. Jyothirmai", "Dr. P. V. Sarat",
          "Dr. M. Rakesh", "Dr. M. Mary Sujatha", "Dr. R. Sruthi"
        ]} />
        <Card title="Reception Committee" members={[
          "Dr. K. Ramya", "Dr. B. Krishnaveni", "Dr. Bharani Devi",
          "Dr. Y. Alekya", "Dr. Rupa Chandini", "Dr. Sethu Manjusha"
        ]} />
        <Card title="Banquet Committee" members={[
          "Dr. R. C. Jagat Reddy", "Dr. G. Ramlal", "Dr. N. Mahesh",
          "Dr. Sanjay Reddy", "Dr. Kotya Naik Maloth", "Dr. K. Sharon Leela"
        ]} />
        <Card title="Hospitality Committee" members={[
          "Dr. Ramesh", "Dr. Santan Reddy", "Dr. K. Aravind",
          "Dr. D. Ajit", "Dr. S. Sailaja", "Dr. M. Jasmine"
        ]} />
        <Card title="Trade Fair Committee" members={[
          "Dr. K. Ramesh Kumar", "Dr. T. Harsha Vardhan Reddy", "Dr. B. Raj Kumar",
          "Dr. B. Kalyan Chakravarthy", "Dr. B. Mamatha", "Dr. Reddy Lavanya"
        ]} />
        <Card title="Accommodation Committee" members={[
          "Dr. V. Sairam", "Dr. M. P. V. Prabath", "Dr. E. Shiva Prasad Reddy",
          "Dr. M. Dayanand", "Dr. A. D. N. Deepika", "Dr. K. N. V. Sai Praveen"
        ]} />
        <Card title="Travel Committee" members={[
          "Dr. Suman", "Dr. E. Venkatesh", "Dr. Balaji Babu",
          "Dr. Sameeulla Shaik", "Dr. P. B. S. Srinivas"
        ]} />
        <Card title="Food Committee" members={[
          "Dr. M. Srinivas Raju", "Dr. Niranjan Reddy", "Dr. Gautam Srivastava",
          "Dr. Ch. Sai Kiran", "Dr. P. Srinivasa Rao"
        ]} />
        <Card title="E Souvenir Committee" members={[
          "Dr. Ch. Lalitha", "Dr. Faizal", "Dr. Seema Ashwin Bhogte",
          "Dr. Shefali Waghray", "Dr. Praveen", "Dr. Yehoshuva Reddy", "Dr. Ch V Raman"
        ]} />
      </div>

    </div>
  );
}