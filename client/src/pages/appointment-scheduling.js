import '../appointment-scheduling.css';
import {Button,Input, Form} from 'antd';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../redux/alertsSlice';

function BookAppointment() {

   // {window.location.pathname.split("/").pop()}
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const onFinish = async(values) => { 
    try {

        dispatch(showLoading());
        const response = await axios.post("/api/user/createAppointment", {
            ...values,
            userID: user?._id,
            docID: window.location.pathname.split("/").pop()
            ,});
        dispatch(hideLoading());
        if(response.data.success)
        {
            toast.success(response.data.message);
            toast("Appointment Schdeuled!");

        }else{
            toast.error(response.data.message);
        }
    } catch (error) {
        dispatch(hideLoading());
        toast.error("Something went wrong");
    }
};


return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Book an Appointment</h1>
            <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Date' name='date' rules={[{required:true}]}> 
                    <Input type="date" id="date"/>
                    </Form.Item> 
            <Form.Item label='Timeslot' name='time' rules={[{required:true}]}> 
                    <select name="Timeslots" id="times">
                    <option value="N/A"> Please Select </option>
                    <option value="09:00">09:00 - 09:30</option>
                    <option value="09:35">09:35 - 10:05</option>
                    <option value="10:10">10:10 - 10:40</option>
                    <option value="10:45">10:45 - 11:15</option>
                    <option value="11:20">11:20 - 11:50</option>
                    <option value="11:55">11:55 - 12:30</option>
                    <option value="13:30">13:30 - 14:00</option>
                    <option value="14:05">14:05 - 14:35</option>
                    <option value="14:40">14:40 - 15:10</option>
                    <option value="15:15">15:15 - 15:45</option>
                    <option value="15:50">15:50 - 16:20</option>
                    <option value="16:25">16:25 - 16:55</option>
                    <option value="17:00">17:00 - 17:30</option>
                    <option value="17:35">17:35 - 18:10</option>
                    </select></Form.Item> 
                    <Button className='primary-button' htmlType='submit'>Book</Button>
                    <Link to='/' className='anchor'>Click here to return home.</Link>

            </Form>
        </div>
    </div>
)
}


export default BookAppointment