import React from 'react'
import style from '../../Style/navbar.module.css'
import { Link } from 'react-router-dom'
import userGear from '../../Assets/user-gear.png'
import profile from '../../Assets/user.png'
import notification from '../../Assets/notification.png'
import logout from '../../Assets/logout.png'

const NavLinks = ({ navLinkState, setNavLinkState }) => {
    return (
        <div className={`${style.navLinkWrapper} ${navLinkState && style.toggleNavLinks}`}>
            <ul>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/profile' className={style.navLink}>
                        <img src={profile} alt="profile avatar" />
                        Profile
                    </Link>
                </li>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/notification' className={style.navLink}>
                        <img src={notification} alt="notification avatar" />
                        Notifications
                    </Link>
                </li>
                <li>
                    <Link onClick={() => setNavLinkState(false)} to='/setting' className={style.navLink}>
                        <img src={userGear} alt="setting avatar" />
                        Settings
                    </Link>
                </li>
                <li>
                    <button className={style.logoutBtn}>
                        <img src={logout} alt="logout avatar" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default NavLinks
