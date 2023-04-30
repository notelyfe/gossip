import React, { useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link } from 'react-router-dom'

const ResetPassForm = () => {

    const [user, setUser] = useState('')

    return (
        <form className={style.form}
        // onSubmit={handelLogin}
        >
            <header className={style.formHeader}>
                <h1>Verify User</h1>
            </header>
            <div className={style.formControl}>
                <label htmlFor="user_id">User Id <span>*</span></label>
                <input
                    type="text"
                    placeholder='Please Enter User id '
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

export default ResetPassForm
