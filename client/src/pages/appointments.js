import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Col, Row } from 'antd'
import Appointment from '../components/AppointmentLayout'
import { useSelector } from "react-redux";


function Appointments() {
    const { user } = useSelector((state) => state.user);
    const [appointments, setAppointments] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get("/api/user/present-all-appointments", 
                {
                    params:{
                         userID: user?._id
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },});
        if (response.data.success){
            setAppointments(response.data.data);
        }
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return (

        <Layout>
            <Row gutter={10}>
                {appointments.map((appointments) => (
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Appointment appointments={appointments}/>
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Appointments