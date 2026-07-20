import Setting from "../models/Setting.js";

// ================= GET SETTINGS =================
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Setting.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE SETTINGS =================
export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    settings = await Setting.findByIdAndUpdate(
      settings._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};