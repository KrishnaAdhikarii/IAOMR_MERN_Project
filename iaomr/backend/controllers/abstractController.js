const Abstract = require("../models/Abstract");
const Registration = require("../models/Registration");

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
                registrationId,
            });

        if (!registration) {
            return res.status(404).json({
                success: false,
                message:
                    "Invalid Registration ID",
            });
        }

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

        if (wordCount > 250) {
            return res.status(400).json({
                success: false,
                message:
                    "Abstract exceeds 250 words",
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

        const abstract =
            await Abstract.create({

                registrationId,

                abstractId,

                title,

                presentationType,

                abstractFormat,

                category,

                reviewCategory,

                wordCount,

                author:
                    registration.fullName,

                email:
                    registration.email,

                phone:
                    registration.phone,

                institution:
                    registration.institution,

                structuredAbstract: {
                    introduction,
                    aimsObjectives,
                    materialsMethods,
                    results,
                    conclusion,
                },

                unstructuredAbstract,
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
            search,
        } = req.query;

        const query = {};

        // FILTERS

        if (status) {
            query.status = status;
        }

        if (presentationType) {
            query.presentationType =
                presentationType;
        }

        if (category) {
            query.category = category;
        }

        // SEARCH

        if (search) {

            query.$or = [

                {
                    abstractId: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    author: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    registrationId: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const abstracts =
            await Abstract.find(query)
                .sort({
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

            if (
                !allowedStatuses.includes(
                    status
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid status",
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
                    message:
                        "Abstract not found",
                });
            }

            res.status(200).json({
                success: true,
                message:
                    "Status updated successfully",
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