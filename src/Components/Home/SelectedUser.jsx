import React from 'react'
import userStyle from '../../Style/selectedUser.module.css'

const SelectedUser = ({ selectUser }) => {

    return (
        <div className={userStyle.wrapper}>
            <img src={selectUser?.image} alt="user profile" />
            <div>
                <h3>{selectUser?.userName}</h3>
                <p>Active</p>
            </div>
        </div>
    )
}

export default SelectedUser
