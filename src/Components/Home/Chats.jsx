import React, { useRef, useEffect } from 'react'
import style from '../../Style/chats.module.css'
import moment from "moment";

const Chats = ({ chatData, userData }) => {

  const scrollToMessage = useRef(null)

  const scrollToLastMessage = () => {
    scrollToMessage.current.scrollIntoView({ behaviour: "smooth" });
  }
  useEffect(() => {
    scrollToLastMessage();
  }, [chatData]);

  return (
    <div ref={scrollToMessage} className={style.messagesInfo}>
      <div className={style.messages}
        style={{
          alignSelf: chatData.sender === userData._id ? "flex-end" : "flex-start",
          borderRadius: chatData.sender === userData._id ? '16px 16px 0px 16px' : '0 16px 16px 16px',
          background: chatData.sender === userData._id ? 'linear-gradient(to top right, var(--alpha-light), var(--beta-light))' : 'linear-gradient(to top right, var(--delta-dark), var(--delta-light))'
        }}
      >
        <p>{chatData?.content}</p>
        <small>{moment(chatData?.createdAt).format("LT")}</small>
      </div>
    </div>
  )
}

export default Chats
