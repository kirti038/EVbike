const express = require("express");
const { authenticateToken } = require("../middlewares/isloggedin");
const router = express.Router();

router.get("/", (req, res)=>{
    res.status(200).json({ message: "Welcome to our API!" })
})


router.get("/protected",authenticateToken, (req, res)=>{
    res.status(200).json({ message: "Welcome to our API!" })
})
module.exports = router