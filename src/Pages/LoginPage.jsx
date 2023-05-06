import React, { useContext, useState } from 'react'
import LoginForm from '../Components/Auth/LoginForm'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import api from '../Services/api'
import toast from 'react-hot-toast'
import Context from '../Context/Context'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginPage = () => {

    const [credentials, setCredentials] = useState({ login_cred: '', password: '' })
    const [checked, setChecked] = useState(false)
    const { setLoading, setUserData, setAccessToken, accessToken } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handelLogin = async (e, credentials) => {
        e.preventDefault()

        try {

            setLoading(true)

            const res = await api.post('/api/user/login', credentials, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
                setAccessToken(res?.data?.access_token)
                const access_token = res?.data?.access_token

            const userRes = await api.get('/api/user/userData', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            setLoading(false)

            if (userRes?.status === 200) {
                setUserData(userRes?.data)
                toast.success("login success")
                setCredentials({ login_cred: '', password: '' })
                navigate(from, { replace: true })
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }

    }

    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <LoginForm
                handelLogin={handelLogin}
                setCredentials={setCredentials}
                credentials={credentials}
                setChecked={setChecked}
                checked={checked}
            />
        </div>
    )
}

export default LoginPage
