const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/", authMiddleware, dashboardController.getUserDashboard);
router.get("/test/:id", authMiddleware, dashboardController.getTestById); // ✅ NEW
router.put("/test/:id", authMiddleware, dashboardController.updateTest);
router.delete("/test/:id", authMiddleware, dashboardController.deleteTest);

module.exports = router;
