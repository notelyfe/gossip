import React from 'react'
import style from '../../Style/userProfile.module.css'
import avatar from '../../Assets/User-avatar.jpg'

const Profile = () => {
    return (
        <div className={style.userWrapper}>
            <div className={style.headerWrapper}>
                <h2>Gossip Profile</h2>
                <p>Here you can find or change profile information.</p>
            </div>
            <div className={style.infoWrapper}>
                <header>User Details</header>
                <section>
                    <aside className={style.profileImageWrapper}>
                        <img src={avatar} alt="" />
                    </aside>
                    <aside className={style.userInfo}>
                        <div className={style.data}>
                            <p>Name</p>
                            <span>:</span>
                            <h4>ankesh kumar</h4>
                        </div>
                        <div className={style.data}>
                            <p>UserId</p>
                            <span>:</span>
                            <h4>notelyfe</h4>
                        </div>
                        <div className={style.data}>
                            <p>Email</p>
                            <span>:</span>
                            <h4>notelyfe@gmail.com</h4>
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    )
}

export default Profile
