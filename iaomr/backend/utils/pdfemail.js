const PDFDocument = require("pdfkit");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/* PDF */
function generatePDF(data) {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        doc.fontSize(18).text("Registration Receipt", { align: "center" });
        doc.moveDown();

        doc.text(`Name: ${data.name}`);
        doc.text(`Email: ${data.email}`);
        doc.text(`Phone: ${data.phone || "N/A"}`);
        doc.text(`Reg No: ${data.regNumber}`);
        doc.text(`Amount: ₹${data.amount}`);

        doc.end();
    });
}

/* EMAIL */
async function sendEmail(registration, pdfBuffer) {
    const whatsappLinks = {
        "Post Graduate":
            "https://chat.whatsapp.com/ECIKNDPyLPPLcjDrwPl8yG?mode=gi_t",
        Faculty: "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
        Practitioner: "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
        "Foreign Delegate": "https://chat.whatsapp.com/LeN7dANe12nJBtbkmdt8K3",
    };

    // fallback link if category not found
    const whatsappLink =
        whatsappLinks[registration.category] ||
        "https://chat.whatsapp.com/ECIKNDPyLPPLcjDrwPl8yG?mode=gi_t";
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2 style="color:#0b5394;">
      Registration Confirmed 
    </h2>

    <p>Dear Dr. <b>${registration.name}</b>,</p>

    <p>
      Thank you for registering for the 
      <b>24th NATIONAL IAOMR PG CONVENTION 2026</b>, 
      scheduled from <b>6th to 8th August 2026</b> at 
      <b>Anil Neerukonda Institute of Dental Sciences (ANIDS)</b>,
      Visakhapatnam, Andhra Pradesh.
    </p>

    <p>
      We are pleased to confirm that your registration has been
      successfully completed and your payment has been received.
    </p>

    <hr />

    <h3>📋 Registration Details</h3>

    <p>🪪 <b>Registration ID:</b> ${registration.regNumber}</p>
    <p>👤 <b>Registered Name:</b> ${registration.name}</p>
    <p>📧 <b>Email Address:</b> ${registration.email}</p>
    <p>📦 <b>Category:</b> ${registration.category}</p>

    <hr />

    <p>
      <b>Registration Includes:</b><br/>
      • 2 Breakfasts<br/>
      • 2 Lunches<br/>
      • 1 Gala Banquet<br/>
      • Delegate Gift<br/>
      • Attendance Certificate<br/>
      • Access to Trade Exhibition<br/>
      • Inclusive of 18% GST
    </p>

    <p>
      If you require any corrections to your registered details,
      kindly inform us in advance.
    </p>

    <h3>📞 Contact Details</h3>

    <p>
      <b>For Registration Queries:</b><br/>
      Dr. B Badari Ramakrishna – +91 9885426232<br/>
      Dr. V Rahul Marshal – +91 9848720046
    </p>

    <p>
      <b>For Scientific Queries:</b><br/>
      Dr. N. Rajesh – +91 9885067499
    </p>

    <p>
      <b>For Hospitality & Accommodation:</b><br/>
      Dr. K.V. Lokesh – +91 9885164196 (Preferably WhatsApp)<br/>
      Email: 24thiaomrpgconvention2026@gmail.com
    </p>

    <p>
      Website:
      <a href="https://iaomrpgconvene2026.com">
        www.iaomrpgconvene2026.com
      </a>
    </p>

    <p>
      Please join the WhatsApp group for 
      <b>${registration.category}</b> delegates
      for important updates and communication.
    </p>

    <p>
      <a
        href="${whatsappLink}"
        style="
          display:inline-block;
          padding:10px 18px;
          background:#25D366;
          color:white;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Join WhatsApp Group
      </a>
    </p>

    <p>
      <a
        href="https://www.instagram.com/24thiaomr_nationalpgconvention?igsh=MW1ldGNlY3V4b3Rmeg%3D%3D&utm_source=qr"
        style="
          display:inline-block;
          padding:10px 18px;
          background:#F472B6;
          color:black;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Follow US on Instagram
      </a>
    </p>

    <br/>

    <img
      src="https://iaomrpgconvene2026.com/assets/AnidsLogo-CEqdCiRq.jpeg"
      alt=" Logo"
      style="width:150px;"
    />

    <p style="margin-top:20px;">
      Anil Neerukonda Institute of Dental Sciences (ANIDS)<br/>
      Sangivalasa, Bheemunipatnam Mandal,<br/>
      Visakhapatnam District, Andhra Pradesh<br/>
      Phone: +91 8008901278; <a href="https://www.anids.edu.in" target="_blank">www.anids.edu.in</a>
    </p>

    <p>
      We look forward to welcoming you to the
      <b>IAOMR 24th National PG Convention 2026</b>.
    </p>

    <p>
      Warm regards,<br/>
      <b>Organizing Committee</b><br/>
      24th National IAOMR PG Convention 2026
    </p>

  </div>
        `;

    return await resend.emails.send({
        from: "IAOMR <anidsomrvizag@iaomrpgconvene2026.com>",
        to: registration.email,
        subject: "Registration Confirmed",
        html,
        // attachments: [
        //   {
        //     filename: "receipt.pdf",
        //     content: pdfBuffer.toString("base64"),
        //   },
        // ],
    });
}

module.exports = { generatePDF, sendEmail };

function sendAbstractReviewEmail(abstract, status) {
    const isAccepted = status?.toLowerCase() === "accepted";
    const isRejected = status?.toLowerCase() === "rejected";
    const isInReview = status?.toLowerCase() === "in review";

    const themeColor = isAccepted
        ? "#16a34a"
        : isRejected
        ? "#dc2626"
        : "#f59e0b";

    const statusBg = isAccepted
        ? "#ecfdf5"
        : isRejected
        ? "#fef2f2"
        : "#fffbeb";

    const statusLabel = isAccepted
        ? "ACCEPTED"
        : isRejected
        ? "REJECTED"
        : status?.toUpperCase();

   const statusLinkMessage = isInReview
    ? `Update your abstract using this link: <a href="https://www.iaomrpgconvene2026.com/status/abstract">UPDATE ABSTRACT</a>`
    : `You can also check your status here: <a href="https://www.iaomrpgconvene2026.com/status/abstract">CHECK YOUR STATUS</a>`;


    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

    <div style="border-left:6px solid ${themeColor}; padding-left:12px;">
      <h2 style="color:${themeColor}; margin-bottom:5px;">
        Abstract Review Update - IAOMR PG Convention 2026
      </h2>
      <span style="
        display:inline-block;
        background:${statusBg};
        color:${themeColor};
        padding:4px 10px;
        border-radius:6px;
        font-weight:bold;
        font-size:12px;
      ">
        ${statusLabel}
      </span>
    </div>

    <p style="margin-top:20px;">Dear <b>${abstract.author}</b>,</p>

    <p>
      Your abstract submitted for the <b>24th NATIONAL IAOMR PG CONVENTION 2026</b>
      has been reviewed by the Scientific Committee.
    </p>

    <hr/>

    <div style="
      background:${statusBg};
      border:1px solid ${themeColor};
      padding:12px;
      border-radius:8px;
    ">
      <p><b>🪪 Abstract ID:</b> ${abstract.abstractId}</p>
      <p><b>📌 Title:</b> ${abstract.title}</p>
      <p><b>📊 Status:</b> ${statusLabel}</p>
    </div>

    <h3 style="color:${themeColor}; margin-top:20px;">
      Reviewer Remarks
    </h3>

    <p>
      ${abstract.reviewerRemarks || "No remarks provided"}
    </p>

    <hr/>

    <p>
      ${statusLinkMessage}
    </p>

    <p>
      For any queries, contact the Scientific Committee.
    </p>

    <p style="margin-top:20px;">
      Warm regards,<br/>
      <b>Scientific Committee</b><br/>
      IAOMR PG Convention 2026
    </p>

  </div>
    `;

    return resend.emails.send({
        from: "IAOMR <anidsomrvizag@iaomrpgconvene2026.com>",
        to: abstract.email,
        subject: `Abstract ${statusLabel} - IAOMR 2026`,
        html,
    });
}

module.exports.sendAbstractReviewEmail = sendAbstractReviewEmail;
