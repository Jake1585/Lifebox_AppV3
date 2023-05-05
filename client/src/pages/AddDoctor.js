import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


function AddDoctor() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/add-doctor', {
                ...values,
                userId: user._id,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            dispatch(hideLoading());
            if(response.data.success)
            {
                toast.success(response.data.message);
                navigate("/");
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Error when adding doctor account");
        }
    }
    return (
        <Layout>
            <h1 className='page-title'>Add Doctor</h1>
            <hr />

            <Form layout='horizontal' onFinish={onFinish}>
                <Row gutter={15}>
                    <Col span={24} xs={24} sm={24} lg={8}>
                        <Form.Item required label='First Name' name='firstName' rules={[{required:true}]}>
                            <Input placeholder='First Name' />
                        </Form.Item>
                        <Form.Item required label='Last Name' name='lastName' rules={[{required:true}]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                        <Form.Item required label='Address' name='address' rules={[{required:true}]}>
                            <Input placeholder='Enter Address' />
                        </Form.Item>
                        <Form.Item required label='Postcode' name='postcode' rules={[{required:true}]}>
                            <Input placeholder='Enter Postcode' />
                        </Form.Item>
                        <Form.Item required label='Email' name='email' rules={[{required:true}]}>
                            <Input placeholder='Email Address' />
                        </Form.Item>
                        <Form.Item required label='Phone Number' name='phoneNumber' rules={[{required:true}]}>
                            <Input placeholder='Phone Number' />
                        </Form.Item>
                        <Form.Item required label='Specialty' name='specialty' rules={[{required:true}]}>
                            <Input placeholder='Enter Specialty' />
                        </Form.Item>
                        <Form.Item required label='Times' name='workTimings' rules={[{required:true}]}>
                            <TimePicker.RangePicker></TimePicker.RangePicker>
                        </Form.Item>
                    </Col>
                </Row>

                <div className='d-flex justify-content-end'>
                    <Button className='primary-button' htmlType='submit'>Submit Information</Button>
                </div>
            </Form>
        </Layout>
    )
}

export default AddDoctor