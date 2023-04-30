import React from 'react'
import LoginForm from '../Components/Auth/LoginForm'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'

const LoginPage = () => {
    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <LoginForm />
        </div>
    )
}

export default LoginPage
