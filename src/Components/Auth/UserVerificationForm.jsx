import React, { useContext, useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../Services/api'
import Context from '../../Context/Context'

const UserVerificationForm = () => {

    const [user, setUser] = useState('')
    const { setLoading } = useContext(Context)

    const sendVerification = async (e) => {
        e.preventDefault();

        try {

            setLoading(true)

            const res = await api.post('/api/user/resetLink', { credential: user })

            setLoading(false)

            if (res.status === 200) {
                toast.success(res?.data?.message)
                setUser('')
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <form className={style.form}
            onSubmit={sendVerification}
        >
            <header className={style.formHeader}>
                <h1>Verify User</h1>
            </header>
            <div className={style.formControl}>
                <label htmlFor="user_id">User Id or E-mail <span>*</span></label>
                <input
                    type="text"
                    placeholder='Please Enter User id or E-mail '
                    name='user_id'
                    required
                    onChange={(e) => {
                        setUser(e.target.value)
                    }}
                    value={user}
                />
            </div>
            <div className={style.formControl}>
                <button type='submit' className={style.submitBtn}>
                    Send Verification Link
                </button>
            </div>
            <footer className={style.formFooter}>
                <p>back to <span><Link to='/login' className={style.loginLink}>Login</Link></span> page </p>

            </footer>
        </form >
    )
}

export default UserVerificationForm
