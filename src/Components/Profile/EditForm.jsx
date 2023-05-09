import React, { useState } from 'react'
import style from '../../Style/editFrom.module.css'
import api from '../../Services/api'
import toast from 'react-hot-toast'

const EditForm = ({ userData, setUserData, setLoading, accessToken, setEditToggle }) => {

    const [info, setInfo] = useState({ name: userData?.name, userId: userData?.user_id, email: userData?.email })

    const handelInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const editUserData = async (e) => {
        e.preventDefault()
        try {

            setLoading(true)

            const res = await api.put('/api/user/editUserInfo', info, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                setUserData({ ...userData, name: info.name, user_id: info.userId, email: info.email })
                setEditToggle(false)
                toast.success(res?.data?.message)
            }


        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <form onSubmit={editUserData} className={style.userInfo}>
            <div className={style.data}>
                <label htmlFor="name">Name</label>
                <span>:</span>
                <input
                    required
                    type="text"
                    placeholder='Name'
                    onChange={handelInfo}
                    value={info.name}
                    name='name'
                />
            </div>
            <div className={style.data}>
                <label htmlFor="userId">UserId</label>
                <span>:</span>
                <input
                    required
                    type="text"
                    placeholder='UserId'
                    onChange={handelInfo}
                    value={info.userId}
                    name='userId'
                />
            </div>
            <div className={style.data}>
                <label htmlFor="email">Email</label>
                <span>:</span>
                <input
                    required
                    type="email"
                    placeholder='E-mail'
                    onChange={handelInfo}
                    value={info.email}
                    name='email'
                />
            </div>
            <button type='submit' className={style.saveBtn}>Save</button>
        </form>
    )
}

export default EditForm
