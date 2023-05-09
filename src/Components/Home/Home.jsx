import React, { useContext, useEffect, useState } from 'react'
import style from '../../Style/home.module.css'
import avatar from '../../Assets/User-avatar.jpg'
import UsersList from './UsersList'
import SelectedUser from './SelectedUser'
import Chats from './Chats'
import Context from '../../Context/Context'
import api from '../../Services/api'
import toast from 'react-hot-toast'
import io from 'socket.io-client'

const socketUrl = process.env.REACT_APP_SOCKET_BASEURL;
var socket, selectedChatCompare

const Home = ({ setToggleSidePannel, chatData, setChatData, setSelectedUser, selectUser }) => {

    const { userData, accessToken } = useContext(Context)
    const [messages, setMessages] = useState(null)
    const [msg, setMsg] = useState('')
    const [socketConnection, setSocketConnection] = useState(false)

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
    }, [messages])

    const getMessages = async () => {

        const res = await api.post('/api/msg/getAllMsg', { chatId: selectUser?.chatId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        setMessages(res?.data)
    }

    useEffect(() => {
        if (selectUser !== null || selectUser !== undefined) {
            getMessages()
            selectedChatCompare = selectUser
        }
    }, [selectUser])

    const sendMessage = async () => {

        let sentMsg = {
            content: msg,
            chatId: selectUser.chatId,
            receiver: selectUser.userId
        }

        if (sentMsg.content === '') {
            toast.error("Message Can't left blank")
        } else {
            try {

                const { data } = await api.post('/api/msg/sendMsg', sentMsg, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })

                socket.emit("new messages", data)
                setMessages([...messages, data])
                setMsg('')
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    useEffect(() => {
        socket = io(socketUrl)
        socket.emit("setup", userData?._id)
        socket.on("connected", () => setSocketConnection(true))
    }, [])

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {

            if (selectedChatCompare.chatId === newMessageReceived.chat) {
                setMessages([...messages, newMessageReceived])
            } else {
                setMessages(messages)
            }
        })
    })

    const handelInputByEnterKey = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    return (
        <div className={style.homeWrapper}>
            <div className={style.leftSide}>
                <div className={style.userDataContainer}>
                    <img src={userData?.profile_pic === null ? avatar : userData?.profile_pic} alt="user profile pic" />
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
                                socket={socket}
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
                            onKeyUp={handelInputByEnterKey}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
