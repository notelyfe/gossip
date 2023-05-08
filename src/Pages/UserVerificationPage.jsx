import React from 'react'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import UserVerificationForm from '../Components/Auth/UserVerificationForm'

const UserVerificationPage = () => {
    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <UserVerificationForm />
        </div>
    )
}

export default UserVerificationPage
