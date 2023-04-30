import React from 'react'
import SignupForm from '../Components/Auth/SignupForm'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'

const SignUpPage = () => {
    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <SignupForm />
        </div>
    )
}

export default SignUpPage
