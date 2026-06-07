const Test = require("../models/Test.model");
const User = require("../models/User.model");

// 📊 Get Dashboard Data
exports.getUserDashboard = async (req, res) => {
  try {
    // ✅ Corrected: use _id from req.user
    const userId = req.user._id;

    // ✅ Fetch the user and their tests
    const user = await User.findById(userId).select("username email createdAt");
    const tests = await Test.find({ userId }).sort({ createdAt: -1 });

    res.json({
      user,
      tests,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✏️ Update Test
exports.updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Corrected here too
    const userId = req.user._id;

    const updatedTest = await Test.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found or unauthorized" });
    }

    res.json({
      message: "Test updated successfully",
      updatedTest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🗑️ Delete Test
exports.deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Corrected here too
    const userId = req.user._id;

    const deletedTest = await Test.findOneAndDelete({ _id: id, userId });

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found or unauthorized" });
    }

    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// 🔍 NEW: Get a single test by ID
exports.getTestById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // logged-in user

    const test = await Test.findOne({ _id: id, userId });

    if (!test) {
      return res.status(404).json({ message: "Test not found or unauthorized" });
    }

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
