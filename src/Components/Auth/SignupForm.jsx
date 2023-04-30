import { useContext, useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link } from 'react-router-dom'
import api from '../../Services/api'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from 'react-hot-toast'
import Context from '../../Context/Context'

const SignupForm = () => {

    const [data, setData] = useState({ name: '', user_id: '', email: '', password: '', cPassword: '' })
    const [showPass, setShowPass] = useState(false)
    const { setLoading } = useContext(Context)

    const handelSignUpData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handelRegistration = async (e) => {
        e.preventDefault()

        if (data.password === data.cPassword) {

            try {

                setLoading(true)

                const res = await api.post('/api/user/createUser', data)

                setLoading(false)

                if (res.status === 200) {
                    toast.success(`verification e-mail is sent to ${data.email}`, {
                        duration: 5000,
                    })
                    setData({ name: '', user_id: '', email: '', password: '', cPassword: '' })
                }

            } catch (error) {
                setLoading(false)
                toast.error(error)
            }

        } else {
            toast.error("Password and Confirm Password didn't match")
        }
    }

    return (
        <form className={style.form} onSubmit={handelRegistration}>
            <header className={style.formHeader}>
                <h1>Create Account</h1>
            </header>
            <div className={style.formControl}>
                <label htmlFor="name">Name <span>*</span></label>
                <input
                    type="text"
                    placeholder='Enter Your Full Name'
                    onChange={handelSignUpData}
                    value={data.name}
                    name='name'
                    required
                    minLength={5}
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="user_id">User Id <span>*</span></label>
                <input
                    type="text"
                    placeholder='User Id'
                    onChange={handelSignUpData}
                    value={data.user_id}
                    name='user_id'
                    required
                    minLength={5}
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="email">Email <span>*</span></label>
                <input
                    type="email"
                    placeholder='Email'
                    onChange={handelSignUpData}
                    value={data.email}
                    name='email'
                    required
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="password">Password <span>*</span></label>
                <input
                    type={`${showPass ? "text" : "password"}`}
                    placeholder='Password'
                    onChange={handelSignUpData}
                    value={data.password}
                    name='password'
                    autoComplete='on'
                    required
                    minLength={8}
                />
            </div>
            <div className={style.formControl}>
                <label htmlFor="CPassword">Confirm Password <span>*</span></label>
                <input
                    type={`${showPass ? "text" : "password"}`}
                    placeholder='Confirm Password'
                    onChange={handelSignUpData}
                    value={data.cPassword}
                    name='cPassword'
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
                    Create Account
                </button>
            </div>
            <footer className={style.formFooter}>
                <p>Already have an account </p>
                <Link to='/login' className={style.loginLink}>Login</Link>
            </footer>
        </form >
    )
}

export default SignupForm
