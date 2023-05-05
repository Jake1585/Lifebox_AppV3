const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require('../models/doctorModel');
const Appoint = require('../models/appointModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// user route

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: "User already has an account", success: false });
        }
        const password = req.body.password;
        // encrypts the users password with salt
        const salt = await bcrypt.genSalt(12);
        // hashes the users password with the salt value included for extra security
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({ message: "User account created", success: true });
    } catch (error) {
        res.status(500).send({ message: "Issue creating users account", success: false })
    }

});




router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
            .status(200)
            .send({ message: "User account not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res
            .status(200)
            .send({ message: "Incorrect password, try again.", success: false });
        }else{
            const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
                expiresIn: "1d"
            })
            res.status(200).send({ message: "Successfully logged in", success: true, data:token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Issue with logging into account", success:false, error});
    }
});

router.post('/fetch-user-info-by-id', authMiddleware, async(req, res)=>{

    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if(!user) {
            return res
            .status(200)
            .send({ message: 'User account is not found', success: false});
        } else {
            res.status(200).send
            ({ message: 'Account found', success:true, data: user,
        });
        }
    } catch (error) {
        res.status(500).send({ message: "Error getting user info", success: false, error});
        
    }
});





router.post('/add-doctor', authMiddleware, async (req, res) => {
    try {
        const newDoctor = new Doctor({...req.body, status: 'Approved'});
        await newDoctor.save();
        const adminUser = await User.findOne({ isAdmin: true});

        const unreadNotification = adminUser.unreadNotification
        unreadNotification.push({
            type: 'new-doctor-added',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has been added as a doctor`,
            data: {
                doctorID: newDoctor._id,
                name: newDoctor.firstName + ' ' + newDoctor.lastName
            },
            onClickPath: '/admin/doctors'
        })
        await User.findByIdAndUpdate(adminUser._id, { unreadNotification });
        res.status(200).send({
            success: true,
            message: 'New doctor account added to database'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Issue adding new doctor account", success: false })
    }

});


router.get('/present-all-doctors', authMiddleware, async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'Approved'});
        res.status(200).send({ message: 'Presented all doctors successfully', success: true, data: doctors })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Cannot present all doctors', success: false })
    }

});


router.post('/createAppointment', async (req, res) => {
    try {
        const todayDate = new Date();
        const appointDate = Date.parse(req.body.date);
        if(appointDate < todayDate){
            return res.status(200).send({message: "Select Valid Date", success: false})

        }
        const docExists = await Appoint.findOne({ docID: req.body.docID });
        if(docExists){
            const dateExists = await Appoint.findOne({ date: req.body.date });
            if(dateExists){
                const timeExists = await Appoint.findOne({ time: req.body.time });
                if(timeExists){
                return res.status(200).send({message: "Appointment time already booked", success: false})
            }}
        }
        const newappoint = new Appoint(req.body);
        await newappoint.save();
        res.status(200).send({ message: "Appointment created successfully", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Booking", success:false, error});
    }
});


router.post('/update', async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.body.userID });

        const isMatchName = req.body.name == user.name
        const isMatchEmail = req.body.email == user.email
        const userExists = await User.findOne({ email: req.body.email });
        
        const isMatchPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatchPassword)

        if(!isMatchName ){
            await  User.updateOne(
                {_id: req.body.userID},
                {$set: {name: req.body.name}})

        }

        if(!isMatchPassword){
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;

            await  User.updateOne(
                {_id: req.body.userID},
                {$set: {password: req.body.password}})
        }

        if (userExists) {
            return res.status(200).send({ message: "That email is already tied to another account", success: false });
                        }

        else{ if(!isMatchEmail)
            await  User.updateOne(
                {_id: req.body.userID},
                {$set: {email: req.body.email}})
            }   
        
            res.status(200).send({ message: "Updated", success: true, data:user });


    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Error logging in", success:false, error});
    }
});


router.get('/present-all-appointments', authMiddleware, async (req, res) => {
    try {
        const appointments = await Appoint.find({ email: req.query.userId});
        if(!appointments){
        res.status(200).send({ message: 'No Appointments', success: false})
        }
        res.status(200).send({ message: 'Presented all Appointments successfully', success: true, data: appointments })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Cannot present all appointments', success: false })
    }

});

router.delete('/appointment-delete', async(req, res) => {
    try{
        const appointment = await Appoint.deleteOne({ _id: req.query.appointID});
        if(!appointment){
            res.status(200).send({ message: 'No Appointment', success: false})
            }
        res.status(200).send({ message: ' Deleted Appointment successfully', success: true, data: appointment })

    }
    catch (error){
        console.log(error);
        res.status(500).send({ message: 'Cannot delete appointments', success: false })

    }
});


module.exports = router;