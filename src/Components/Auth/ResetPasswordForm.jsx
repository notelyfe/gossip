import React, { useContext, useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from 'react-hot-toast';
import api from '../../Services/api';
import Context from '../../Context/Context';

const ResetPasswordForm = () => {

    const { setLoading } = useContext(Context)

    const [showPass, setShowPass] = useState(false)

    const [password, setPassword] = useState({ password: '', confirmPassword: '' })

    const { search } = useLocation()

    let verificationToken = search.slice(search.indexOf('=') + 1, search.length)

    const handelPassword = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const resetPassword = async (e) => {
        e.preventDefault();

        if (password.password !== password.confirmPassword) {
            toast.error("Password Didn't match")
        } else {

            try {

                setLoading(true)

                const res = await api.patch('/api/user/passwordReset', password, {
                    headers: {
                        Authorization: `Bearer ${verificationToken}`
                    }
                })

                setLoading(false)

                if (res.status === 200) {
                    setPassword({ password: '', confirmPassword: '' })
                    toast.success(res?.data?.message)
                }

            } catch (error) {
                setLoading(false)
                toast.error(error?.response?.data?.message)
            }
        }
    }

    return (
        <form className={style.form}
            onSubmit={resetPassword}
        >
            <header className={style.formHeader}>
                <h1>Create New Password</h1>
            </header>
            <div className={style.formControl}>
                <label htmlFor="password">New Password <span>*</span></label>
                <input
                    type={`${showPass ? "text" : "password"}`}
                    placeholder='Enter New Password'
                    name='password'
                    required
                    onChange={handelPassword}
                    value={password.password}
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                <input
                    type={`${showPass ? "text" : "password"}`}
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    required
                    onChange={handelPassword}
                    value={password.confirmPassword}
                />
                {showPass ? <AiOutlineEyeInvisible className={style.hideShow} onClick={() => {
                    setShowPass(!showPass)
                }} /> : <AiOutlineEye className={style.hideShow} onClick={() => {
                    setShowPass(!showPass)
                }} />}
            </div>
            <div className={style.formControl}>
                <button type='submit' className={style.submitBtn}>
                    Confirm
                </button>
            </div>
            <footer className={style.formFooter}>
                <p>back to <span><Link to='/login' className={style.loginLink}>Login</Link></span> page </p>

            </footer>
        </form >
    )
}

export default ResetPasswordForm
