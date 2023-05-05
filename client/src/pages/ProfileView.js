import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import '../appointment-scheduling.css';
import {Button,Input, Form} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Profile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/update", {
            ...values,
            userID: user?._id
            ,});
            dispatch(hideLoading());
            if(response.data.success)
            {
                toast.success(response.data.message);
                toast("Profile Updated!");
    
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
                <h1 className='card-title'>Profile</h1>
                <p1 className='card-subtitle'> To Update, enter new information and submit</p1>
                <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Name' name='name'> 
                        <Input placeholder={user?.name} type="text" id="name"/>
                        </Form.Item> 
                <Form.Item label='Password' name='password' > 
                        <Input placeholder='HIDDEN' type="text" id="password"/>
                        </Form.Item> 
                <Form.Item label='Email' name='email' > 
                        <Input placeholder={user?.email} type="text" id="email"/>
                        </Form.Item> 
                        <Button className='primary-button' htmlType='submit'>Update</Button>
                        <Link to='/' className='anchor'>Click here to return home.</Link>
    
                </Form>
            </div>
        </div>
    )
    
    
 }

export default Profile



