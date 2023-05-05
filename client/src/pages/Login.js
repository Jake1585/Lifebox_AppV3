import {Button, Form, Input} from 'antd';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/login", values);
            dispatch(hideLoading());
            if(response.data.success)
            {
                toast.success(response.data.message);
                toast("Redirecting to home page");
                localStorage.setItem("token", response.data.data);
                navigate("/");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Error when going to home page");
        }
    };


    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Login</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name='email' rules={[{required:true}]}>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[{required:true}]}>
                        <Input placeholder='Password' type='Password'/>
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'>Login</Button>

                    <Link to='/register' className='anchor'>Click here to register an account.</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login