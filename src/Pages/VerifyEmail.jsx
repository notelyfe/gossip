import React, { useContext } from 'react'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../Services/api'
import Context from '../Context/Context'
import toast from 'react-hot-toast'

const VerifyEmail = () => {

    const { setLoading } = useContext(Context)

    const { search } = useLocation()
    const navigate = useNavigate()

    let verificationToken = search.slice(search.indexOf('=') + 1, search.length)

    const verifyEmail = async () => {

        setLoading(true)

        try {

            const res = await api.get(`/api/user/verify/${verificationToken}`)

            setLoading(false)

            if (res.status === 200) {
                toast.success(res?.data?.message)
                navigate('/login')
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <div className={style.verifyWrapper}>
                <h3>E-mail Verification</h3>
                <p>Please click the given button to verify your email.</p>
                <p><span>Note-</span> After Successful Email verification you will redirect to login page automatically.</p>
                <button onClick={verifyEmail} className={style.verifyBtn}>Verify Email</button>
            </div>
        </div>
    )
}

export default VerifyEmail
