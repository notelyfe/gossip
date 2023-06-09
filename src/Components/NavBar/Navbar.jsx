import React, { useContext, useState } from 'react'
import style from '../../Style/navbar.module.css'
import logo from '../../Assets/Gossip.png'
import avatar from '../../Assets/User-avatar.jpg'
import Context from '../../Context/Context'
import NavLinks from './NavLinks'

const Navbar = () => {

    const { userData, setLoading } = useContext(Context)
    const [navLinkState, setNavLinkState] = useState(false)

    return (
        <>
            <div className={style.navbarContainer}>
                <div className={style.wrapper}>
                    <img className={style.logo} src={logo} alt="website logo" />
                    <div onClick={() => setNavLinkState(!navLinkState)} className={style.userInfoContainer}>
                        <img src={userData?.profile_pic === null ? avatar : userData?.profile_pic} alt="user avatar" />
                        <h2>{userData?.name} &#x25BC;</h2>
                    </div>
                </div>
            </div>
            <NavLinks
                setNavLinkState={setNavLinkState}
                navLinkState={navLinkState}
                setLoading={setLoading}
            />
        </>
    )
}

export default Navbar
