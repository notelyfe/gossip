import React, { useContext } from 'react'
import style from '../../Style/allUsersList.module.css'
import defaultPic from '../../Assets/User-avatar.jpg'
import toast from 'react-hot-toast'
import api from '../../Services/api'
import Context from '../../Context/Context'

const AllUsersList = ({ setToggleSidePannel, toggleSidePannel, usersList }) => {

    const { accessToken } = useContext(Context)

    const createConversation = async (id) => {
        try {

            const res = await api.post('/api/chat/createChat', { userId: id }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (res?.status === 200) {
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
                            onClick={() => createConversation(item._id)}
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
