import React from 'react'
import style from '../../Style/chats.module.css'

const Chats = ({ chatData, userData }) => {

  return (
    <div className={style.messagesInfo}>
      <div className={style.messages}
        style={{
          alignSelf: chatData.sender === userData._id ? "flex-end" : "flex-start",
          borderRadius: chatData.sender === userData._id ? '16px 16px 0px 16px' : '0 16px 16px 16px',
          background: chatData.sender === userData._id ? 'linear-gradient(to top right, var(--alpha-light), var(--beta-light))' : 'linear-gradient(to top right, var(--delta-dark), var(--delta-light))' 
        }}
      >
        <p>{chatData?.content}</p>
        <small>{chatData?.createdAt}</small>
      </div>
    </div>
  )
}

export default Chats
