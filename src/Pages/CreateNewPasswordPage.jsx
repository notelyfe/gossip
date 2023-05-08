import React from 'react'
import Logo from '../Assets/Gossip.png'
import style from '../Style/auth.module.css'
import ResetPasswordForm from '../Components/Auth/ResetPasswordForm'

const CreateNewPasswordPage = () => {
    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <ResetPasswordForm />
        </div>
    )
}

export default CreateNewPasswordPage
