import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Table } from 'antd'

function Doctorslist() {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch()
    const getAllDoctorsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/api/AdminInfo/present-doctors-list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(response.data.success){
                setDoctors(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())

        }
    };

    useEffect(() => {
        getAllDoctorsData();
    }, [])

    const doctorColumns = [
        {
            title: 'First Name',
            dataIndex: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Remove Account',
            dataIndex: 'removeAccount',
            render: (text, record) => (
                <div className='d-flex'>
                    <h1 className='anchor'>Delete</h1>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className='page-header'>List of all Doctors</h1>
            <hr />
            <Table columns={doctorColumns} dataSource={doctors}/>
        </Layout>
    )
}

export default Doctorslist;