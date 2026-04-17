import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function PaymentSuccess() {
  const { regNumber } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/registration/${regNumber}`)
      .then(res => setData(res.data))
      .catch(() => alert("Failed to load data"));
  }, [regNumber]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>✅ Payment Successful</h1>
      <h2>Thank you for registering!</h2>

      <p><b>Name:</b> {data.name}</p>
      <p><b>Registration No:</b> {data.regNumber}</p>
      <p><b>Amount Paid:</b> ₹{data.amount}</p>

      <img src={data.qrCode} alt="QR Code" style={{ width: 200 }} />

      <p>📩 Receipt sent to your email</p>
    </div>
  );
}