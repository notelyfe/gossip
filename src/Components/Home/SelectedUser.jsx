import React from 'react'
import userStyle from '../../Style/selectedUser.module.css'
import defaultPic from '../../Assets/User-avatar.jpg'

const SelectedUser = ({ selectUser }) => {

    return (
        <div className={userStyle.wrapper}>
            <img src={defaultPic} alt="" />
            <div>
                <h3>{selectUser?.userName}</h3>
                <p>Active</p>
            </div>
        </div>
    )
}

export default SelectedUser
