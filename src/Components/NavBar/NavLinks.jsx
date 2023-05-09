import React from 'react'
import style from '../../Style/navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import userGear from '../../Assets/user-gear.png'
import profile from '../../Assets/user.png'
import notification from '../../Assets/notification.png'
import logoutIcon from '../../Assets/logout.png'
import api from '../../Services/api'
import toast from 'react-hot-toast'

const NavLinks = ({ navLinkState, setNavLinkState, setLoading }) => {

    const navigate = useNavigate()

    const logout = async () => {
        try {
            setLoading(true)
            const res = await api.get('/api/logout', {
                withCredentials: true
            })

            setLoading(false)

            if (res.status === 204) {
                toast.success("Logged out")
                localStorage.removeItem('persist')
                navigate('/login')
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={`${style.navLinkWrapper} ${navLinkState && style.toggleNavLinks}`}>
            <ul>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/dashboard/profile' className={style.navLink}>
                        <img src={profile} alt="profile avatar" />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/dashboard/notification' className={style.navLink}>
                        <img src={notification} alt="notification avatar" />
                        Notifications
                    </Link>
                </li>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/dashboard/setting' className={style.navLink}>
                        <img src={userGear} alt="setting avatar" />
                        Settings
                    </Link>
                </li>
                <li>
                    <button onClick={() => logout()} className={style.logoutBtn}>
                        <img src={logoutIcon} alt="logout avatar" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavLinks
