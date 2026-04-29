import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RegistrationIdStatus() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  try {
    setLoading(true);
    setRegId(null);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/status/registration-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    console.log("API RESPONSE:", data);

    if (!res.ok) throw new Error(data.message || "Request failed");

    setRegId(data.registrationId);
    toast.success("Fetched successfully");
  } catch (err) {
    toast.error(err.message || "Error");
  } finally {
    setLoading(false);
  }
};

// Styles
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
    background: "#f5f7fa",
  },
  card: {
    width: isMobile ? "100%" : "400px",
    padding: isMobile ? "20px" : "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    fontFamily: "'Kumbh Sans', sans-serif",
    marginBottom: "20px",
    fontSize: isMobile ? "20px" : "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
    background: "#eef3ff",
  },
  resultText: {
    margin: 0,
    fontSize: "14px",
  },
  resultId: {
    marginTop: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007bff",
  },
};

return (
  <div style={styles.page}>
    <div style={styles.card}>
      <h2 style={styles.heading}>Find Your Registration ID</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>

      {regId && (
        <div style={styles.resultBox}>
          <p style={styles.resultText}>Your Registration ID:</p>
          <h3 style={styles.resultId}>{regId}</h3>
        </div>
      )}
    </div>
  </div>
);
}