import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Col, Row } from 'antd'
import Doctor from '../components/DoctorLayout'


function Home() {

    const [doctors, setDoctors] = useState([]);
    const getData = async () => {
        try {
            // change to const response = await axios.post("/api/user/find-user-account-by-id" at end
            const response = await axios.get('/api/user/present-all-doctors',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                }
            );
        if (response.data.success){
            setDoctors(response.data.data);
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
                {doctors.map((doctor) => (
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor}/>
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Home