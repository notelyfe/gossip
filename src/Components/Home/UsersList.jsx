import React from 'react'
import userStyle from '../../Style/usersList.module.css'
import avatar from '../../Assets/User-avatar.jpg'

const UsersList = ({ userData, data, setSelectedUser, selectUser, socket }) => {

    let users = data?.users?.filter((user) => {
        return user._id !== userData._id
    })

    const handelChatUser = () => {
        setSelectedUser({
            chatId: data?._id,
            userName: data?.isGroupChat === false ? users[0]?.name : data?.chatName,
            userId: users[0]?._id,
            image: users[0]?.profile_pic === null ? avatar : users[0]?.profile_pic
        })
        socket.emit("join room", data?._id)
    }

    return (
        <div onClick={handelChatUser} className={userStyle.usersInfoContainer}>
            {data._id === selectUser?.chatId && (
                <div className={userStyle.indicator}></div>
            )}
            <div className={userStyle.statusIndicator}>Active</div>
            <img src={users[0]?.profile_pic === null ? avatar : users[0]?.profile_pic} alt="user profile image" />
            <div className={userStyle.userinfo}>
                <h5>{data?.isGroupChat === false ? users[0]?.name : data?.chatName}</h5>
                <p>{data?.latestMsg && data?.latestMsg?.content}</p>
            </div>
        </div>
    )
}

export default UsersList
