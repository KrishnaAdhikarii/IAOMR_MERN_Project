const Abstract = require("../models/Abstract");
const Registration = require("../models/Registration");

const {
    sendAbstractReviewEmail,
} = require("../utils/pdfemail");

// =====================================
// GENERATE ABSTRACT ID
// =====================================

const generateAbstractId = (
    presentationType,
    count
) => {
    const prefix =
        presentationType === "Paper"
            ? "P"
            : "PO";

    return `IAOMR2026-${prefix}-${String(
        count
    ).padStart(4, "0")}`;
};

// =====================================
// WORD COUNT FUNCTION
// =====================================

const countWords = (text = "") => {
    return text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
};

// =====================================
// SUBMIT ABSTRACT
// =====================================

exports.submitAbstract = async (
    req,
    res,
    next
) => {
    try {
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({
                success: false,
                message: "Abstract file is required",
            });
        }

        let {
            registrationId,
            title,
            presentationType,
            abstractFormat,
            category,
            reviewCategory,
            introduction,
            aimsObjectives,
            materialsMethods,
            results,
            conclusion,
            unstructuredAbstract,
        } = req.body;

        // =====================================
        // TRIM INPUTS
        // =====================================

        registrationId =
            registrationId?.trim();

        title = title?.trim();

        category = category?.trim();

        reviewCategory =
            reviewCategory?.trim();

        // =====================================
        // REQUIRED VALIDATION
        // =====================================

        if (
            !registrationId ||
            !title ||
            !presentationType ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields",
            });
        }

        // =====================================
        // VALID PRESENTATION TYPE
        // =====================================

        const validPresentationTypes = [
            "Paper",
            "Poster",
        ];

        if (
            !validPresentationTypes.includes(
                presentationType
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid presentation type",
            });
        }

        // =====================================
        // ABSTRACT FORMAT VALIDATION
        // =====================================

        if (
            presentationType === "Paper"
        ) {

            if (
                !abstractFormat ||
                ![
                    "Structured",
                    "Unstructured",
                ].includes(abstractFormat)
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid abstract format",
                });
            }
        }

        // =====================================
        // VERIFY REGISTRATION
        // =====================================

        const registration =

            await Registration.findOne({
                regNumber: {
                    $regex: `^${registrationId.trim()}$`,
                    $options: "i",
                },
            });

        if (!registration) {
            return res.status(404).json({
                success: false,
                message:
                    "Invalid Registration ID",
            });
        }

        console.log("Registration:", registration);

        // =====================================
        // PREVENT DUPLICATE ABSTRACT
        // =====================================

        const existingAbstract =
            await Abstract.findOne({
                registrationId,
                title: {
                    $regex: `^${title}$`,
                    $options: "i",
                },
            });

        if (existingAbstract) {
            return res.status(400).json({
                success: false,
                message:
                    "Abstract already submitted",
            });
        }

        // =====================================
        // STRUCTURED VALIDATION
        // =====================================

        if (
            abstractFormat === "Structured"
        ) {

            if (
                !introduction ||
                !aimsObjectives ||
                !materialsMethods ||
                !results ||
                !conclusion
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "All structured abstract fields are required",
                });
            }
        }
        if (
            category === "Review" &&
            !reviewCategory
        ) {
            return res.status(400).json({
                success: false,
                message: "Review Topic is required for Review abstracts",
            });
        }

        // =====================================
        // UNSTRUCTURED VALIDATION
        // =====================================

        if (
            abstractFormat ===
            "Unstructured"
        ) {

            if (!unstructuredAbstract) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Abstract content is required",
                });
            }
        }

        // =====================================
        // WORD COUNT
        // =====================================

        let wordCount = 0;

        if (
            abstractFormat === "Structured"
        ) {

            const fields = [
                introduction,
                aimsObjectives,
                materialsMethods,
                results,
                conclusion,
            ];

            wordCount = countWords(
                fields.join(" ")
            );

        } else {

            wordCount = countWords(
                unstructuredAbstract
            );
        }

        // =====================================
        // WORD LIMIT
        // =====================================

        if (wordCount > 300) {
            return res.status(400).json({
                success: false,
                message:
                    "Abstract exceeds 300 words",
            });
        }

        // =====================================
        // GENERATE ABSTRACT ID
        // =====================================

        const total =
            await Abstract.countDocuments();

        const abstractId =
            generateAbstractId(
                presentationType,
                total + 1
            );

        // =====================================
        // CREATE ABSTRACT
        // =====================================

        const abstract = await Abstract.create({
            registrationId,
            abstractId,
            title,
            presentationType,
            abstractFormat,
            category,
            reviewCategory,
            wordCount,

            author: registration.name,
            email: registration.email,
            phone: registration.phone,
            institution: registration.institution,

            delegateCategory: registration.category,

            structuredAbstract: {
                introduction,
                aimsObjectives,
                materialsMethods,
                results,
                conclusion,
            },

            unstructuredAbstract,
            uploadedFile:
                req.file.secure_url || req.file.path,
        });

        // =====================================
        // RESPONSE
        // =====================================

        res.status(201).json({
            success: true,

            message:
                "Abstract submitted successfully",

            abstract,
        });

    } catch (error) {

        console.error(error);

        next(error);
    }
};

// =====================================
// GET ALL ABSTRACTS
// =====================================
const escapeRegex = (str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.getAllAbstracts = async (
    req,
    res,
    next
) => {
    try {

        const {
            status,
            presentationType,
            category,
            delegateCategory,
            search,
            reviewCategory,
        } = req.query;

        const query = {};

        if (status) {
            query.status = status;
        }

        if (presentationType) {
            query.presentationType = presentationType;
        }

        if (category) {
            query.category = category;
        }

        if (delegateCategory) {
            query.delegateCategory = delegateCategory;
        }

        if (reviewCategory) {
            query.reviewCategory = reviewCategory;
        }

        if (search) {
            query.$or = [
                {
                    abstractId: {
                        $regex: escapeRegex(search),
                        $options: "i",
                    },
                },
                {
                    title: {
                        $regex: escapeRegex(search),
                        $options: "i",
                    },
                },
                {
                    author: {
                        $regex: escapeRegex(search),
                        $options: "i",
                    },
                },
                {
                    registrationId: {
                        $regex: escapeRegex(search),
                        $options: "i",
                    },
                },
            ];
        }

        const abstracts = await Abstract.find(query).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: abstracts.length,
            abstracts,
        });

    } catch (error) {

        next(error);
    }
};

// =====================================
// GET SINGLE ABSTRACT
// =====================================

exports.getSingleAbstract =
    async (req, res, next) => {
        try {

            const abstract =
                await Abstract.findById(
                    req.params.id
                );

            if (!abstract) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Abstract not found",
                });
            }

            res.status(200).json({
                success: true,
                abstract,
            });

        } catch (error) {

            next(error);
        }
    };

// =====================================
// UPDATE ABSTRACT STATUS
// =====================================

exports.updateAbstractStatus =
    async (req, res, next) => {
        try {
            console.log("📧 EMAIL TRIGGER HIT");
            const {
                status,
                reviewerRemarks,
            } = req.body;

            const allowedStatuses = [
                "Under Review",
                "Accepted",
                "Rejected",
                "Corrections Required",
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status",
                });
            }

            const abstract =
                await Abstract.findByIdAndUpdate(
                    req.params.id,
                    {
                        status,
                        reviewerRemarks,
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

            if (!abstract) {
                return res.status(404).json({
                    success: false,
                    message: "Abstract not found",
                });
            }

            // ==============================
            // 🔥 SEND EMAIL AFTER UPDATE
            // ==============================

            try {
                await sendAbstractReviewEmail(
                    abstract,
                    status
                );
                console.log("📧 Abstract email sent");
            } catch (mailErr) {
                console.error(
                    "❌ Email failed:",
                    mailErr.message
                );
            }

            res.status(200).json({
                success: true,
                message: "Status updated successfully",
                abstract,
            });

        } catch (error) {
            next(error);
        }
    };


exports.updateAbstractAfterCorrection = async (req, res, next) => {
    try {
        const abstract = await Abstract.findById(req.params.id);

        if (!abstract) {
            return res.status(404).json({
                success: false,
                message: "Abstract not found",
            });
        }

        if (abstract.status !== "Corrections Required") {
            return res.status(400).json({
                success: false,
                message: "You cannot edit this abstract at this stage",
            });
        }

        let {
            title,
            category,
            reviewCategory,
            introduction,
            aimsObjectives,
            materialsMethods,
            results,
            conclusion,
            unstructuredAbstract,
        } = req.body;

        // TEXT UPDATES
        if (title) abstract.title = title.trim();
        if (category) abstract.category = category;
        if (reviewCategory) abstract.reviewCategory = reviewCategory;

        // FILE UPDATE 🔥 FIX HERE
        if (req.file) {
            abstract.uploadedFile =
                req.file.secure_url || req.file.path;
        }

        // STRUCTURED / UNSTRUCTURED
        if (abstract.abstractFormat === "Structured") {
            abstract.structuredAbstract = {
                introduction,
                aimsObjectives,
                materialsMethods,
                results,
                conclusion,
            };

            const text = `${introduction} ${aimsObjectives} ${materialsMethods} ${results} ${conclusion}`;

            if (countWords(text) > 300) {
                return res.status(400).json({
                    success: false,
                    message: "Abstract exceeds 300 words",
                });
            }

        } else {
            abstract.unstructuredAbstract = unstructuredAbstract;
        }

        abstract.status = "Under Review";

        await abstract.save();

        return res.status(200).json({
            success: true,
            message: "Abstract updated and resubmitted for review",
            abstract,
        });

    } catch (error) {
        next(error);
    }
};


// =====================================
// DELETE ABSTRACT
// =====================================

exports.deleteAbstract = async (
    req,
    res,
    next
) => {
    try {

        const abstract =
            await Abstract.findByIdAndDelete(
                req.params.id
            );

        if (!abstract) {
            return res.status(404).json({
                success: false,
                message:
                    "Abstract not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Abstract deleted successfully",
        });

    } catch (error) {

        next(error);
    }
};