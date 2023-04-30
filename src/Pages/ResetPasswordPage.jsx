import React from 'react'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import ResetPassForm from '../Components/Auth/ResetPassForm'

const ResetPasswordPage = () => {
    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <ResetPassForm />
        </div>
    )
}

export default ResetPasswordPage
