import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../Components/Auth/LoginForm'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import api from '../Services/api'
import toast from 'react-hot-toast'
import Context from '../Context/Context'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'

const LoginPage = () => {

    const [credentials, setCredentials] = useState({ login_cred: '', password: '' })
    // const [checked, setChecked] = useState(false)
    const { setLoading, setUserData, setAccessToken, persist, setPersist } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
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

    // useEffect(() => {

    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUserData = async () => {

    //         try {

    //             const userRes = await axiosPrivate.get('/api/user/userData', {
    //                 signal: AbortController.signal
    //             });
    //             isMounted && setUserData(userRes?.data)

    //         } catch (error) {
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }

    //     getUserData();

    //     return () => {
    //         isMounted = false;
    //         controller.abort()
    //     }
    // }, [])

    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <LoginForm
                handelLogin={handelLogin}
                setCredentials={setCredentials}
                credentials={credentials}
                setPersist={setPersist}
                persist={persist}
            />
        </div>
    )
}

export default LoginPage
