import React, { useContext } from 'react'
import userStyle from '../../Style/selectedUser.module.css'
import dotIcon from '../../Assets/dots.png'
import api from '../../Services/api'
import Context from '../../Context/Context'
import toast from 'react-hot-toast'

const SelectedUser = ({ selectUser, setChatData, chatData, setSelectedUser }) => {

    const { setLoading, accessToken } = useContext(Context)

    const deleteChat = async () => {
        try {

            setLoading(true)

            const res = await api.delete('/api/chat/deleteChat', {
                data: { conversationId: selectUser?.chatId },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                toast.success(res.data.message)
                let remChat = chatData?.filter((item) => {
                    return item._id !== selectUser?.chatId
                })
                setChatData(remChat)
                setSelectedUser(null)
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <>
            <div className={userStyle.wrapper}>
                <img src={selectUser?.image} alt="user profile" />
                <div>
                    <h3>{selectUser?.userName}</h3>
                    {/* <p>Active</p> */}
                </div>
            </div>
            <button className={userStyle.deleteChat} onClick={deleteChat}>Delete Chat</button>
            {/* <button className={userStyle.userContextBtn}>
                <img src={dotIcon} alt="dot icon" />
            </button> */}
        </>
    )
}

export default SelectedUser
