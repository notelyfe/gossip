import React, { useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link } from 'react-router-dom'
import api from '../../Services/api'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {

    const [credentials, setCredentials] = useState({ user_id: '', password: '' })

    const [showPass, setShowPass] = useState(false)

    const handelLoginCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handelLogin = (e) => {
        e.preventDefault()

    }

    return (
        <form className={style.form} onSubmit={handelLogin}>
            <header className={style.formHeader}>
                <h1>Login</h1>
            </header>
            <div className={style.formControl}>
                <label htmlFor="user_id">User Id <span>*</span></label>
                <input
                    type="text"
                    placeholder='User Id'
                    onChange={handelLoginCredentials}
                    value={credentials.user_id}
                    name='user_id'
                    required
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="password">Password <span>*</span></label>
                <input
                    type={`${showPass ? "text" : "password"}`}
                    placeholder='Password'
                    onChange={handelLoginCredentials}
                    value={credentials.password}
                    name='password'
                    autoComplete='off'
                    required
                />
                {showPass ? <AiOutlineEyeInvisible className={style.hideShow} onClick={() => {
                    setShowPass(!showPass)
                }} /> : <AiOutlineEye className={style.hideShow} onClick={() => {
                    setShowPass(!showPass)
                }} />}
            </div>
            <div className={style.formControl}>
                <button type='submit' className={style.submitBtn}>
                    Log In
                </button>
            </div>
            <footer className={style.formFooterLogin}>
                <div className={style.footerLinks}>
                    <p>Don't have account </p>
                    <Link to='/signup' className={style.loginLink}>Sign up</Link>
                </div>
                <div className={style.footerLinks}>
                    <p>Trouble in login</p>
                    <Link to='/user-verification' className={style.loginLink}>Forgot Password</Link>
                </div>
            </footer>
        </form >
    )
}

export default LoginForm
