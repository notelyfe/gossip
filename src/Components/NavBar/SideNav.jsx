import React from 'react'
import style from '../../Style/sideUserNav.module.css'
import { Link, useLocation } from 'react-router-dom'
import userGear from '../../Assets/user-gear.png'
import profile from '../../Assets/user.png'
import notification from '../../Assets/notification.png'
import logout from '../../Assets/logout.png'
import home from '../../Assets/home.png'

const SideNav = ({ isCollapse, setIsCollapse, mobileCollapse, setMobileCollapse }) => {

    var location = useLocation()
    location = location.pathname.split('/')

    return (
        <div className={`${style.sideNavWrapper} ${isCollapse && style.collapseSideNavWrapper} ${mobileCollapse && style.sideNavWrapperMobile}`}>
            <button onClick={() => setIsCollapse(!isCollapse)} className={`${style.collapse} ${isCollapse && style.collapseBtnPosition}`}>
                &#x25C0;
            </button>
            <div onClick={() => setMobileCollapse(!mobileCollapse)} className={`${style.hamMenu} ${mobileCollapse && style.collapseHam}`}>
                <span className={`${style.bar} ${style.bar1} ${mobileCollapse && style.barExpand}`}></span>
                <span className={`${style.bar} ${style.bar2} ${mobileCollapse && style.barExpand}`}></span>
                <span className={`${style.bar} ${style.bar3} ${mobileCollapse && style.barExpand}`}></span>
            </div>
            {!mobileCollapse && (
                <ul>
                    <li >
                        <Link to='/' className={`${style.navLink} ${isCollapse && style.activeCollpaseLink}`}>
                            <img src={home} alt="home avatar" />
                            {!isCollapse && "Home"}
                        </Link>
                    </li>
                    <li >
                        <Link to='profile' className={`${style.navLink} ${location[2] === "profile" && style.activeLink} ${isCollapse && style.activeCollpaseLink}`}>
                            <img src={profile} alt="profile avatar" />
                            {!isCollapse && "Profile"}
                        </Link>
                    </li>
                    <li >
                        <Link to='notification' className={`${style.navLink} ${location[2] === "notification" && style.activeLink} ${isCollapse && style.activeCollpaseLink}`}>
                            <img src={notification} alt="notification avatar" />
                            {!isCollapse && "Notifications"}
                        </Link>
                    </li>
                    <li >
                        <Link to='setting' className={`${style.navLink} ${location[2] === "setting" && style.activeLink} ${isCollapse && style.activeCollpaseLink}`}>
                            <img src={userGear} alt="setting avatar" />
                            {!isCollapse && "Settings"}
                        </Link>
                    </li>
                    <li>
                        <button className={style.logoutBtn}>
                            <img src={logout} alt="logout avatar" />
                            {!isCollapse && "Logout"}
                        </button>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default SideNav
