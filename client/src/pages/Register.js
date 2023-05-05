import {Button, Form, Input} from 'antd';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            // API from uRoute.js File
            const response = await axios.post("/api/user/register", values);
            dispatch(hideLoading());
            if(response.data.success)
            {
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate("/login");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Error redirecting you to login page");

        }

    };

    // Details that are entered into the MongoDB fields of the users account.

    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Register an Account</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name' rules={[{required:true}]}>
                        <Input placeholder='Name'/>
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={[{required:true}]}>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[{required:true}]}>
                        <Input placeholder='Password' type='Password'/>
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'>Register</Button>

                    <Link to='/login' className='anchor'>Click here to login to your account.</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register