import React, { useContext } from 'react'
import style from '../../Style/allUsersList.module.css'
import defaultPic from '../../Assets/User-avatar.jpg'
import toast from 'react-hot-toast'
import api from '../../Services/api'
import Context from '../../Context/Context'

const AllUsersList = ({ setToggleSidePannel, toggleSidePannel, usersList, chatData, setChatData, setSelectedUser }) => {

    const { accessToken } = useContext(Context)

    const createConversation = async (id, name) => {
        try {

            const res = await api.post('/api/chat/createChat', { userId: id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (res?.status === 200) {
                setChatData([...chatData, res?.data])
                setSelectedUser({
                    chatId: res?.data?._id,
                    userName: name,
                    userId: id
                })
                setToggleSidePannel(false)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={`${style.usersWrapper} ${toggleSidePannel && style.togglePannel}`}>
            <div className={style.buttonContainer}>
                <h4 className={style.header}>Select User</h4>
                <button onClick={() => setToggleSidePannel(false)} className={style.btnClose}>&times;</button>
            </div>
            <div className={style.usersListWrapper}>
                {usersList?.map((item) => {
                    return (
                        <div
                            onClick={() => createConversation(item._id, item.name)}
                            key={item._id}
                            className={style.userInfo}>
                            <img src={defaultPic} alt="" />
                            <h3>{item?.name}</h3>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default AllUsersList
