const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const authMiddleware = require('../middlewares/authMiddleware')

// admin route

router.get('/present-doctors-list', authMiddleware, async (req, res) => {
    try{
        const doctors = await Doctor.find({});
        res.status(200).send({ message: 'List of doctors was found successfully', success: true, data: doctors});
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Problem displaying doctors list', success: false, error})
    }
})

router.get('/present-users-list', authMiddleware, async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send({ message: 'List of users was found successfully', success: true, data: users});
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Problem displaying users list', success: false, error})
    }
})

module.exports = router;