import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Table } from 'antd'

function Userslist() {

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    const getAllUsersData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/api/AdminInfo/present-users-list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(response.data.success){
                setUsers(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())

        }
    };

    useEffect(() => {
        getAllUsersData();
    }, [])

    const userColumns = [
        {
            title: 'Name',
            dataIndex: 'name'
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
            <h1 className='page-header'>List of all Users</h1>
            <hr />
            <Table columns={userColumns} dataSource={users}/>
        </Layout>
    )
}

export default Userslist