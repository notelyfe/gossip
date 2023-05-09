import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideNav from '../NavBar/SideNav'
import Navbar from '../NavBar/Navbar'
import style from '../../Style/dashboard.module.css'
import api from '../../Services/api'
import toast from 'react-hot-toast'
import Context from '../../Context/Context'

const UserDashBoard = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const { setLoading } = useContext(Context)
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

    const logout = async () => {
        try {
            setLoading(true)
            const res = await api.get('/api/logout', {
                withCredentials: true
            })

            setLoading(false)

            if (res.status === 204) {
                toast.success("Logged out")
                navigate('/login')
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <>
            <Navbar logout={logout} />
            <div className={style.dashboardWrapper}>
                <SideNav
                    setIsCollapse={setIsCollapse}
                    isCollapse={isCollapse}
                    setMobileCollapse={setMobileCollapse}
                    mobileCollapse={mobileCollapse}
                    logout={logout}
                />
                <div className={`${style.mainWrapper} ${isCollapse && style.collapseMainWrapper} ${mobileCollapse && style.expandWrapper}`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default UserDashBoard
