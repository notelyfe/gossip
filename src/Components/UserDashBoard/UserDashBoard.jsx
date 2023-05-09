import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideNav from '../NavBar/SideNav'
import Navbar from '../NavBar/Navbar'
import style from '../../Style/dashboard.module.css'

const UserDashBoard = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const [mobileCollapse, setMobileCollapse] = useState(true)

    var location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        if (window.innerWidth <= 768) {
            setIsCollapse(true)
        }

        if (window.innerWidth >= 768) {
            setMobileCollapse(false)
        }

        if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
            navigate('/dashboard/profile')
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className={style.dashboardWrapper}>
                <SideNav
                    setIsCollapse={setIsCollapse}
                    isCollapse={isCollapse}
                    setMobileCollapse={setMobileCollapse}
                    mobileCollapse={mobileCollapse}
                />
                <div className={`${style.mainWrapper} ${isCollapse && style.collapseMainWrapper} ${mobileCollapse && style.expandWrapper}`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default UserDashBoard
