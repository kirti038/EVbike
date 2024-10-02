const express = require("express");
const router = express.Router();

const { registernewuser, signupuser ,logoutuser} = require("../controllers/userControllers");

router.get("/Getdata", (req, res) => {
  res.status(200).json({ message: "Data fetched successfully" });
});

router.post('/google-login', (req, res) => {
  const { token } = req.body;

  // Logic to handle Google token verification
  if (token) {
    // Process token and send success response
    return res.status(200).json({ success: true, message: "Login successful" });
  }

  return res.status(400).json({ success: false, message: "Invalid token" });
});

router.post("/registeruser", registernewuser);

router.post("/loginuser", signupuser);

router.get("/logout", logoutuser);




module.exports = router;
