import React, { useContext, useEffect, useState } from 'react'
import style from '../../Style/home.module.css'
import defaultPic from '../../Assets/User-avatar.jpg'
import UsersList from './UsersList'
import SelectedUser from './SelectedUser'
import Chats from './Chats'
import Context from '../../Context/Context'
import api from '../../Services/api'
import toast from 'react-hot-toast'

const Home = ({ setToggleSidePannel }) => {

    const { userData, accessToken } = useContext(Context)
    const [chatData, setChatData] = useState(null)
    const [selectUser, setSelectedUser] = useState(null)
    const [messages, setMessages] = useState(null)
    const [msg, setMsg] = useState('')

    const getAllConversations = async () => {
        try {

            const res = await api.get('/api/chat/getAllChat', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setChatData(res?.data)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        getAllConversations()
    }, [])

    const getMessages = async () => {

        const res = await api.post('/api/msg/getAllMsg', { chatId: selectUser?.chatId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        setMessages(res?.data)
    }

    useEffect(() => {
        getMessages()
    }, [selectUser?.chatId])

    const sendMessage = async () => {

        let sentMsg = {
            content: msg,
            chatId: selectUser.chatId,
            receiver: selectUser.userId
        }

        try {

            const res = await api.post('/api/msg/sendMsg', sentMsg, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setMessages(messages.concat(res.data))
            setMsg('')

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={style.homeWrapper}>
            <div className={style.leftSide}>
                <div className={style.userDataContainer}>
                    <img src={defaultPic} alt="user profile pic" />
                    <h5>{userData?.name}</h5>
                </div>
                <div className={style.searchContainer}>
                    <input
                        type="text"
                        placeholder='Search User'
                    />
                </div>
                <div className={style.usersWrapper}>
                    {chatData?.map((item) => {
                        return (
                            <UsersList key={item._id}
                                data={item}
                                userData={userData}
                                setSelectedUser={setSelectedUser}
                                selectUser={selectUser}
                            />
                        )
                    })}
                </div>
                <div className={style.newChatButtonWrapper}>
                    <button onClick={() => setToggleSidePannel(true)}>Create New Chat</button>
                    <button>Create Group Chat</button>
                </div>
            </div>
            <div className={style.rightSide}>
                {selectUser && (
                    <div className={style.topContainer}>
                        <SelectedUser
                            selectUser={selectUser}
                        />
                    </div>
                )}
                {selectUser && (
                    <div className={style.messageContainer}>
                        {messages.map((item) => {
                            return (
                                <Chats key={item._id} chatData={item} userData={userData} />
                            )
                        })}
                    </div>
                )}
                {selectUser && (
                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            placeholder='Message'
                            onChange={(e) => setMsg(e.target.value)}
                            value={msg}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
