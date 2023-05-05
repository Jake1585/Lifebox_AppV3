const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require('../models/doctorModel');
const Appoint = require('../models/appointModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// doctor route

router.post('/fecth-doctor-info-by-user-id', authMiddleware, async (req, res) => {
    try{
        const doctor = await Doctor.findOne({ _id: req.body.doctorId })
        res.status(200).send({ message: 'Got doctors information success.', success : true, data: doctor})
    } catch (error) {
        res.status(500).send({ message: 'Issue finding doctors information.', success: false, error})
    }
})


router.post("/fetch-doctor-info-by-id", authMiddleware, async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ doctor_id: req.body.doctorId });
      res.status(200).send({
        success: true,
        message: "Doctor information found",
        data: doctor,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Issue finding doctors information", success: false, error });
    }
  })
  
  

  router.post("/get-appoint-info-by-UserID", authMiddleware, async (req, res) => {
    try {
      const userAppoint = await Appoint.findOne({ user_id: req.body.userId });
      res.status(200).send({
        success: true,
        message: "Appointment Info fetched successfully",
        data: userAppoint,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting appointment info", success: false, error });
    }
  })
  
  router.post("/get-appoint-info-by-DoctorID", authMiddleware, async (req, res) => {
    try {
      const doctorAppoint = await Appoint.findOne({ Doc_id: req.body.docId });
      res.status(200).send({
        success: true,
        message: "Appointment Info fetched successfully",
        data: doctorAppoint,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error getting appointment info", success: false, error });
    }
  });
  