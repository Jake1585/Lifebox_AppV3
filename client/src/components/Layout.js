import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const uMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-4-line'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-list-check'
        },
        {
            name: 'Profile',
            path: '/ProfileView',
            icon: 'ri-profile-fill'
        },
    ];

    const aMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-4-line',
        },
        {
            name: 'Users',
            path: '/AdminInfo/Userslist',
            icon: 'ri-group-fill',
        },
        {
            name: 'Doctors',
            path: '/AdminInfo/Doctorslist',
            icon: 'ri-user-2-fill',
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-profile-fill',
        },
        {
            name: 'Add Doctor',
            path: '/add-doctor',
            icon: 'ri-add-box-fill'
        },
    ];


    const menuToBeRendered = user?.isAdmin ? aMenu : uMenu;
    return (
        <div className='main'>

            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        <h1>LifeBox</h1>
                    </div>

                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}

                            </div>
                            );
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')
                        }}>
                            <i className='ri-logout-box-fill'></i>
                            {!collapsed && <Link to='/login'>Logout</Link>}
                        </div>
                    </div>

                </div>

                <div className='content'>
                    <div className="header">
                        {collapsed ? (
                            <i
                                className="ri-menu-fill header-action-icon"
                                onClick={() => setCollapsed(false)}
                            ></i>
                        ) : (
                            <i
                                className="ri-close-circle-fill header-action-icon"
                                onClick={() => setCollapsed(true)}
                            ></i>
                        )}

                        <div className='d-flex align-items-center px-5'>
                            <Link className='anchor' to='/ProfileView'>{user?.name}</Link>
                        </div>
                    </div>

                    <div className='body'>
                        {children}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Layout