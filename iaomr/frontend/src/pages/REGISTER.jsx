import React, { useState } from "react";
import api from '../utils/api';


import placeholder from "../images/Banner.png";


const PRICING = {
  student: { early: 7080, regular: 7670, late: 8850, spot: 9440 },
  faculty: { early: 7670, regular: 8260, late: 9440, spot: 10030 },
  accompanying: { early: 4720, regular: 5310, late: 6490, spot: 6490 },
  foreign: { early: 200, regular: 200, late: 225, spot: 225 },
};

const getType = () => {
  const now = new Date();
  if (now <= new Date("2026-03-15T23:59:59")) return "early";
  if (now <= new Date("2026-04-30T23:59:59")) return "regular";
  if (now <= new Date("2026-07-15T23:59:59")) return "late";
  return "spot";
};

export default function RegistrationForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    gender: "",
    photo: null,
    phone: "",
    category: "",
    designation: "",
    iaomrNumber: "",
    pgYear: "",
    dciNumber: "",
    country: "",
    state: "",
    city: "",
    institution: "",
    address: "",
    foodPreference: "",
    accompanying: false,
    accompanyingCount: 1,
    accompanyingNames: [""],
  });

  const pricingType = getType();

  const totalData = (() => {
    if (!form.category) return { amount: 0, currency: "INR" };

    // const isForeign =
    //   form.country && form.country.toLowerCase() !== "india";

    // ✅ Category mapping
    const categoryMap = {
      Faculty: "faculty",
      Practitioner: "faculty",
      "Post Graduate": "student",
      "Foreign Delegate": "foreign",
    };
    const USD_TO_INR = 93; // you can later replace with live API
    let pricingKey = categoryMap[form.category];

    if (!pricingKey) return { amount: 0, currency: "INR" };

    let amount = PRICING[pricingKey][pricingType];

    if (form.accompanying) {
      amount +=
        PRICING.accompanying[pricingType] *
        Number(form.accompanyingCount || 1);
    }

    return {
      amount,
      currency: pricingKey === "foreign" ? "USD" : "INR",
    };




  })();

  // Base amount from category pricing
  let baseAmount = totalData.amount;
  const currency = totalData.currency;

  const USD_TO_INR = 90;

  // Convert USD to INR for payment gateway
  if (currency === "USD") {
    baseAmount = baseAmount * USD_TO_INR;
  }

  // Convenience fee added silently in backend/payment
  const razorpayFee = Math.ceil(baseAmount * 0.0236);

  // Final amount sent to Razorpay
  const totalAmount = baseAmount + razorpayFee;

  // What user sees
  const displayAmount =
    currency === "USD"
      ? `₹${baseAmount} ($${totalData.amount})`
      : `₹${baseAmount}`;


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files?.[0]   // IMPORTANT
            : value,
    }));
  };

  const handleAccompanyingNameChange = (index, value) => {
    setForm((prev) => {
      const updatedNames = [...prev.accompanyingNames];
      updatedNames[index] = value;

      return {
        ...prev,
        accompanyingNames: updatedNames,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 SUBMIT FIRED");
    // console.log("8", import.meta.env.VITE_API_URL);
    // console.log("RAZORPAY KEY:", '8', import.meta.env.VITE_RAZORPAY_KEY);
    // console.log("KEY SECRET:", import.meta.env.VITE_RAZORPAY_SECRET);

    // console.log("PHOTO FILE:", form.photo);

    try {
      const { data: order } = await api.post("/registration/create-order", {
        amount: totalAmount,
        currency,
        form,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: currency,
        name: "Conference Registration",
        description: "Delegate Fee",
        order_id: order.id,

        handler: async function (response) {
          try {
            const formData = new FormData();

            formData.append("form", JSON.stringify(form));

            formData.append(
              "razorpay_order_id",
              response.razorpay_order_id
            );

            formData.append(
              "razorpay_payment_id",
              response.razorpay_payment_id
            );

            formData.append(
              "razorpay_signature",
              response.razorpay_signature
            );

            formData.append("amount", totalAmount);

            if (form.photo) {
              formData.append("photo", form.photo);
            }

            const verifyRes = await api.post(
              "/registration/verify-payment",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            console.log("VERIFY RESPONSE:", verifyRes.data);

            window.location.href =
              `/payment-success/${verifyRes.data.regNumber}`;

          } catch (err) {
            console.error("VERIFY ERROR:", err.response?.data || err);

            alert(
              err.response?.data?.message ||
              "Payment done, but verification failed!"
            );
          }
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#1976d2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Failed to start payment. Please try again.");
    }
  };

  return (
    <>
      <div className="registration-form-container">
        <div className="banner"><img src={placeholder}></img></div>

        <h1 className="registration-form-title">Delegate Registration</h1>

        <form className="registration-form-card" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="registration-form-group">
            <label className="registration-form-label">EMAIL ID *</label>
            <input className="registration-form-input" name="email" required onChange={handleChange} />
          </div>

          {/* Name */}
          <div className="registration-form-group">
            <label className="registration-form-label">NAME OF THE DELEGATE * ( Please Fill in Capital Letters )</label>
            <input
              className="registration-form-input"
              name="name"
              required
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value.toUpperCase(),
                }))
              }
            />
          </div>

          {/* Gender */}
          <div className="registration-form-group">
            <label className="registration-form-label">GENDER *</label>
            <div className="registration-form-radio-group">
              <label>
                <input type="radio" name="gender" value="Male" required onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" onChange={handleChange} />
                Female
              </label>
            </div>
          </div>

          {/* Photo */}
          <div className="registration-form-group">
            <label className="registration-form-label">UPLOAD PHOTO * <e style={{ fontSize: '9px', color: '#FF0000' }}> Upload 1 Supported file.Max 10MB</e></label>
            <input className="registration-form-input" type="file" name="photo" accept="image/*" required onChange={handleChange} />
          </div>

          {/* Phone */}
          <div className="registration-form-group">
            <label className="registration-form-label">MOBILE NUMBER *</label>
            <input className="registration-form-input" name="phone" required onChange={handleChange} />
          </div>

          {/* Category */}
          <div className="registration-form-group">
            <label className="registration-form-label">CATEGORY *</label>
            <select className="registration-form-select" name="category" required onChange={handleChange}>
              <option value="">Select</option>
              <option>Faculty</option>
              <option>Practitioner</option>
              <option>Post Graduate</option>
              <option>Foreign Delegate</option>

            </select>
          </div>

          {/* Faculty */}
          {form.category === "Faculty" && (
            <>
              <div className="registration-form-group">
                <label className="registration-form-label">Designation</label>
                <select className="registration-form-select" name="designation" onChange={handleChange}>
                  <option>Principal</option>
                  <option>Vice Principal</option>
                  <option>HOD</option>
                  <option>Professor</option>
                  <option>Associate Professor</option>
                  <option>Assistant Professor/Senior Lecturer</option>
                  <option>Tutor </option>

                </select>
              </div>
            </>
          )}

          {/* PG */}
          {form.category === "Post Graduate" && (
            <div className="registration-form-group">
              <label className="registration-form-label">YEAR</label>
              <select className="registration-form-select" name="pgYear" onChange={handleChange}>
                <option>1st year</option>
                <option>2nd year</option>
                <option>3rd year</option>
              </select>
            </div>
          )}

          {/* DCI */}
          <div className="registration-form-group">
            <label className="registration-form-label">DCI REGISTRATION NUMBER</label>
            <input className="registration-form-input" name="dciNumber" onChange={handleChange} />
          </div>


          <div className="registration-form-group">
            <label className="registration-form-label">IAOMR Number (LM/ALM)</label>
            <input className="registration-form-input" name="iaomrNumber" onChange={handleChange} />
          </div>

          {/* Location */}
          <div className="registration-form-group">
            <label className="registration-form-label">COUNTRY *</label>
            <input className="registration-form-input" name="country" required onChange={handleChange} />
          </div>

          <div className="registration-form-group">
            <label className="registration-form-label">STATE *</label>
            <input className="registration-form-input" name="state" required onChange={handleChange} />
          </div>

          <div className="registration-form-group">
            <label className="registration-form-label">CITY *</label>
            <input className="registration-form-input" name="city" required onChange={handleChange} />
          </div>

          {/* Institution */}
          <div className="registration-form-group">
            <label className="registration-form-label">INSTITUTION / CLINIC NAME / OTHERS *</label>
            <input className="registration-form-input" name="institution" required onChange={handleChange} />
          </div>

          {/* Address */}
          <div className="registration-form-group">
            <label className="registration-form-label">ADDRESS *</label>
            <textarea className="registration-form-textarea" name="address" required onChange={handleChange} />
          </div>

          <div className="registration-form-group">
            <label className="registration-form-label">
              FOOD PREFERENCES *
            </label>

            <div className="registration-form-radio-group">
              <label>
                <input
                  type="radio"
                  name="foodPreference"
                  value="NON-VEG"
                  required
                  onChange={handleChange}
                />
                NON-VEG
              </label>

              <label>
                <input
                  type="radio"
                  name="foodPreference"
                  value="VEG"
                  onChange={handleChange}
                />
                VEG
              </label>
            </div>
          </div>


          {/* Accompanying */}
          <div className="registration-form-group">
            <label>
              <input type="checkbox" name="accompanying" onChange={handleChange} />
              ADD ACCOMPANYING PERSON
            </label>
          </div>

          {form.accompanying && (
            <>
              <div className="registration-form-group">
                <label className="registration-form-label">
                  Number of Accompanying Persons
                </label>

                <input
                  className="registration-form-input"
                  name="accompanyingCount"
                  type="number"
                  min="1"
                  value={form.accompanyingCount}
                  onChange={(e) => {
                    const count = Number(e.target.value);

                    setForm((prev) => ({
                      ...prev,
                      accompanyingCount: count,
                      accompanyingNames: Array(count).fill("").map(
                        (_, i) => prev.accompanyingNames[i] || ""
                      ),
                    }));
                  }}
                />
              </div>

              {Array.from({
                length: Number(form.accompanyingCount || 0),
              }).map((_, index) => (
                <div
                  className="registration-form-group"
                  key={index}
                >
                  <label className="registration-form-label">
                    ACCOMPANYING PERSON {index + 1} NAME
                  </label>

                  <input
                    className="registration-form-input"
                    value={form.accompanyingNames[index] || ""}
                    onChange={(e) =>
                      handleAccompanyingNameChange(
                        index,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </>
          )}

          {/* Pricing */}
          <div className="registration-form-pricing">

            <div
              className="registration-form-tier"
              style={{ fontWeight: "bold" }}
            >
              TOTAL PAYABLE
            </div>

            <div
              className="registration-form-amount"
              style={{
                fontWeight: "bold",
                color: "#1976d2",
                fontSize: "24px",
              }}
            >
              {displayAmount}
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
              }}
            >
              * Convenience charges may apply during payment.
            </p>
          </div>

          <button className="registration-form-submit" type="submit">
            Submit & Pay
          </button>
        </form>
      </div>
    </>
  );
}

// export default RegistrationForm