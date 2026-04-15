import React, { useState } from "react";
import api from '../utils/api' ;


const PRICING = {
  student: { early: 7080, regular: 7670, late: 8850, spot: 9440 },
  faculty: { early: 7670, regular: 8260, late: 9440, spot: 10030 },
  accompanying: { early: 4720, regular: 5310, late: 6490, spot: 6490 },
  foreign: { early: 200, regular: 200, late: 225, spot: 225 },
};

const getType = () => {
  const now = new Date();
  if (now <= new Date("2026-03-15")) return "early";
  if (now <= new Date("2026-04-30")) return "regular";
  if (now <= new Date("2026-07-10")) return "late";
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
    accompanying: false,
    accompanyingName: "",
  });

  const pricingType = getType();

  const totalAmount = (() => {
    if (!form.category) return 0;

    let base =
      form.category === "Faculty"
        ? PRICING.faculty[pricingType]
        : PRICING.student[pricingType];

    let total = base;

    if (form.accompanying) {
      total += PRICING.accompanying[pricingType];
    }

    return total;
  })();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
    console.log("🔥 SUBMIT FIRED");
    console.log("8",import.meta.env.VITE_API_URL);
    console.log("RAZORPAY KEY:",'8', import.meta.env.VITE_RAZORPAY_KEY_ID);

  try {
    const { data: order } = await api.post("/registration/create-order", {
      amount: totalAmount,
      form,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Conference Registration",
      description: "Delegate Fee",
      order_id: order.id,

      handler: async function (response) {
        try {
          await api.post("/registration/verify-payment", {
            ...response,
            form,
            amount: totalAmount,
          });

          alert("Payment successful & receipt sent!");
        } catch (err) {
          alert("Payment done, but verification failed!");
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
    <div className="registration-form-container">
      <h1 className="registration-form-title">Delegate Registration</h1>

      <form className="registration-form-card" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="registration-form-group">
          <label className="registration-form-label">Email ID *</label>
          <input className="registration-form-input" name="email" required onChange={handleChange} />
        </div>

        {/* Name */}
        <div className="registration-form-group">
          <label className="registration-form-label">Name of Delegate *</label>
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
          <label className="registration-form-label">Gender *</label>
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
          <label className="registration-form-label">Upload Photo *</label>
          <input className="registration-form-input" type="file" name="photo" accept="image/*" required onChange={handleChange} />
        </div>

        {/* Phone */}
        <div className="registration-form-group">
          <label className="registration-form-label">Mobile Number *</label>
          <input className="registration-form-input" name="phone" required onChange={handleChange} />
        </div>

        {/* Category */}
        <div className="registration-form-group">
          <label className="registration-form-label">Category *</label>
          <select className="registration-form-select" name="category" required onChange={handleChange}>
            <option value="">Select</option>
            <option>Faculty</option>
            <option>Practitioner</option>
            <option>Post Graduate</option>
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
                <option>Assistant Professor</option>
              </select>
            </div>

            <div className="registration-form-group">
              <label className="registration-form-label">IAOMR Number</label>
              <input className="registration-form-input" name="iaomrNumber" onChange={handleChange} />
            </div>
          </>
        )}

        {/* PG */}
        {form.category === "Post Graduate" && (
          <div className="registration-form-group">
            <label className="registration-form-label">Year</label>
            <select className="registration-form-select" name="pgYear" onChange={handleChange}>
              <option>1st year</option>
              <option>2nd year</option>
              <option>3rd year</option>
            </select>
          </div>
        )}

        {/* DCI */}
        <div className="registration-form-group">
          <label className="registration-form-label">DCI Registration No.</label>
          <input className="registration-form-input" name="dciNumber" onChange={handleChange} />
        </div>

        {/* Location */}
        <div className="registration-form-group">
          <label className="registration-form-label">Country *</label>
          <input className="registration-form-input" name="country" required onChange={handleChange} />
        </div>

        <div className="registration-form-group">
          <label className="registration-form-label">State *</label>
          <input className="registration-form-input" name="state" required onChange={handleChange} />
        </div>

        <div className="registration-form-group">
          <label className="registration-form-label">City *</label>
          <input className="registration-form-input" name="city" required onChange={handleChange} />
        </div>

        {/* Institution */}
        <div className="registration-form-group">
          <label className="registration-form-label">Institution *</label>
          <input className="registration-form-input" name="institution" required onChange={handleChange} />
        </div>

        {/* Address */}
        <div className="registration-form-group">
          <label className="registration-form-label">Address *</label>
          <textarea className="registration-form-textarea" name="address" required onChange={handleChange} />
        </div>

        {/* Accompanying */}
        <div className="registration-form-group">
          <label>
            <input type="checkbox" name="accompanying" onChange={handleChange} />
            Add Accompanying Person
          </label>
        </div>

        {form.accompanying && (
          <div className="registration-form-group">
            <label className="registration-form-label">Accompanying Name</label>
            <input className="registration-form-input" name="accompanyingName" onChange={handleChange} />
          </div>
        )}

        {/* Pricing */}
        <div className="registration-form-pricing">
          <div className="registration-form-tier">{pricingType.toUpperCase()} FEE</div>
          <div className="registration-form-amount">₹{totalAmount}</div>
        </div>

        <button className="registration-form-submit" type="submit">
          Submit & Pay
        </button>
      </form>
    </div>
  );
}

// export default RegistrationForm