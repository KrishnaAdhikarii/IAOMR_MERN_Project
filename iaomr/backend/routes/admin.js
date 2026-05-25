const express = require("express")
const router = express.Router()

const Registration =
  require("../models/Registration")

const Abstract =
  require("../models/Abstract")

const User =
  require("../models/User")

/* =========================
   ADMIN STATS
========================= */

router.get(
  "/stats",
  async (req, res) => {
    try {
      // REGISTRATIONS
      const totalRegistrations =
        await Registration.countDocuments()

      const paidRegistrations =
        await Registration.countDocuments(
          {
            status: "PAID",
          }
        )

      const pendingRegistrations =
        await Registration.countDocuments(
          {
            status: "PENDING",
          }
        )

      // ABSTRACTS
      const totalAbstracts =
        await Abstract.countDocuments()

      const acceptedAbstracts =
        await Abstract.countDocuments(
          {
            status: "accepted",
          }
        )

      // USERS
      let totalUsers = 0

      try {
        totalUsers =
          await User.countDocuments()
      } catch {
        totalUsers = 0
      }

      // REVENUE
      const revenueData =
        await Registration.aggregate([
          {
            $match: {
              status: "PAID",
            },
          },

          {
            $group: {
              _id: null,

              total: {
                $sum: "$amount",
              },
            },
          },
        ])

      const revenue =
        revenueData[0]?.total || 0

      // CATEGORY BREAKDOWN
      const categoryBreakdown =
        await Registration.aggregate([
          {
            $group: {
              _id: "$category",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },
        ])

      res.json({
        stats: {
          registrations: {
            total:
              totalRegistrations,

            confirmed:
              paidRegistrations,

            pending:
              pendingRegistrations,
          },

          abstracts: {
            total:
              totalAbstracts,

            accepted:
              acceptedAbstracts,
          },

          users: totalUsers,

          revenue,

          categoryBreakdown,
        },
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Failed to fetch stats",
      })
    }
  }
)

/* =========================
   RECENT DATA
========================= */

router.get(
  "/recent",
  async (req, res) => {
    try {
      const recentRegistrations =
        await Registration.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select(
            "name regNumber category status"
          )

      const recentAbstracts =
        await Abstract.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select(
            "title abstractId category status"
          )

      res.json({
        recentRegistrations,
        recentAbstracts,
      })
    } catch (err) {
      console.error(err)

      res.status(500).json({
        message:
          "Failed to fetch recent data",
      })
    }
  }
)

module.exports = router