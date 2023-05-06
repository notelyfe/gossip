import React, { useContext, useState } from 'react'
import SignupForm from '../Components/Auth/SignupForm'
import style from '../Style/auth.module.css'
import Logo from '../Assets/Gossip.png'
import api from '../Services/api'
import toast from 'react-hot-toast'
import Context from '../Context/Context'

const SignUpPage = () => {

    const [data, setData] = useState({ name: '', user_id: '', email: '', password: '', cPassword: '' })
    const { setLoading } = useContext(Context)

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
                toast.error(error?.response?.data?.message, {
                    duration: 4000,
                })
            }

        } else {
            toast.error("Password and Confirm Password didn't match")
        }
    }

    return (
        <div className={`${style.wrapper}`}>
            <img src={Logo} alt="logo image" />
            <SignupForm
                data={data}
                setData={setData}
                handelRegistration={handelRegistration}
            />
        </div>
    )
}

export default SignUpPage
