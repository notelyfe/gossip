import React, { useContext, useState, useRef } from 'react'
import style from '../../Style/userProfile.module.css'
import avatar from '../../Assets/User-avatar.jpg'
import Context from '../../Context/Context'
import EditForm from './EditForm'
import pen from '../../Assets/pen.png'
import toast from 'react-hot-toast'
import api from '../../Services/api'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const { userData, setLoading, setUserData, accessToken } = useContext(Context)
    const [editToggle, setEditToggle] = useState(false)
    const [profilePic, setProfilePic] = useState(null)
    const [deleteUser, setDeleteUser] = useState(false)
    const [profilePreview, setProfilePreview] = useState(null)
    const fileInputField = useRef(null)
    const [deletePassword, setDeletePassword] = useState('')
    const navigate = useNavigate()

    const handelUploadProfilePic = async () => {
        let formData = new FormData()
        formData.append("profilePic", profilePic)

        try {

            setLoading(true)

            const res = await api.put('/api/user/editUserProfile', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                toast.success(res?.data?.message)
                setProfilePic(null)
                setProfilePreview(null)
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    const deleteAccount = async () => {

        setLoading(true)

        try {

            const res = await api.delete('/api/user/deleteUser', {
                data: { password: deletePassword }, headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                toast.success(res.data.message)
                localStorage.removeItem('persist')
                navigate('/signup')
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={style.userWrapper}>
            <div className={style.headerWrapper}>
                <h2>Gossip Profile</h2>
                <p>Here you can find or change profile information.</p>
            </div>
            <div className={`${style.infoWrapper} ${deleteUser && style.flipInfoWrapper}`}>
                {!deleteUser ? (
                    <div>
                        <header>User Details</header>
                        <section>
                            <aside className={style.profileImageWrapper}>
                                <img
                                    className={style.profileImage}
                                    src={profilePreview ? profilePreview : (userData?.profile_pic ? userData?.profile_pic : avatar)}
                                    alt="profile image"
                                />
                                <button
                                    onClick={() => {
                                        fileInputField.current.click()
                                    }}
                                    className={style.imageEditBtn}
                                >
                                    <img src={pen} alt="pen image" />
                                </button>
                                <input
                                    ref={fileInputField}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        setProfilePic(e.target.files[0])
                                        setProfilePreview(URL.createObjectURL(e.target.files[0]))
                                    }}
                                />
                            </aside>
                            {!editToggle ? (
                                <aside className={style.userInfo}>
                                    <div className={style.data}>
                                        <p>Name</p>
                                        <span>:</span>
                                        <h4>{userData?.name}</h4>
                                    </div>
                                    <div className={style.data}>
                                        <p>UserId</p>
                                        <span>:</span>
                                        <h4>{userData?.user_id}</h4>
                                    </div>
                                    <div className={style.data}>
                                        <p>Email</p>
                                        <span>:</span>
                                        <h4>{userData.email}</h4>
                                    </div>
                                </aside>
                            ) : <EditForm
                                userData={userData}
                                setLoading={setLoading}
                                setUserData={setUserData}
                                accessToken={accessToken}
                                setEditToggle={setEditToggle}
                            />}
                        </section>
                        <footer className={style.profileFooter}>
                            <button onClick={() => setEditToggle(true)} className={style.editBtn}>Edit Profile</button>
                            <button onClick={() => setDeleteUser(true)} className={style.deleteBtn}>Delete Account</button>
                            {editToggle || profilePreview ? (
                                <button
                                    onClick={() => {
                                        setEditToggle(false)
                                        setProfilePreview(null)
                                    }}
                                    className={style.cancelBtn}
                                >Cancel
                                </button>
                            ) : ''}
                            {profilePreview && (
                                <button
                                    onClick={handelUploadProfilePic}
                                    className={style.saveBtn}
                                >Save
                                </button>
                            )}
                        </footer>
                    </div>
                ) : (
                    <div className={style.deleteWrapper}>
                        <header>Delete User</header>
                        <section >
                            <h1>Are you Sure, you want to delete your account?</h1>
                            <article>
                                <h4>Note:</h4> <p> This action is irreversible, you will lost all your data including messages, if confirm</p>
                            </article>
                        </section>
                        <footer className={style.profileDeleteFooter}>
                            <form >
                                <label htmlFor="">Password:</label>
                                <input
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    value={deletePassword}
                                    type="password"
                                    autoComplete='off'
                                    placeholder='Enter Password'
                                />
                            </form>
                            <div className={style.footerBtnWrapper}>
                                <button onClick={() => setDeleteUser(false)} className={style.cancelBtn}>Cancel</button>
                                <button onClick={deleteAccount} className={style.deleteBtn}>Confirm</button>
                            </div>
                        </footer>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
