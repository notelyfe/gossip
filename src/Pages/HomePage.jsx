import React, { useContext, useEffect, useState } from 'react'
import Home from '../Components/Home/Home'
import AllUsersList from '../Components/Home/AllUsersList'
import api from '../Services/api'
import Context from '../Context/Context'
import toast from 'react-hot-toast'
import Navbar from '../Components/NavBar/Navbar'

const HomePage = () => {

  const [toggleSidePannel, setToggleSidePannel] = useState(false)
  const { accessToken } = useContext(Context)
  const [usersList, setUsersList] = useState(null)
  const [chatData, setChatData] = useState(null)
  const [selectUser, setSelectedUser] = useState(null)

  const getAllUsers = async () => {

    try {

      const res = await api.get('/api/user/getuser', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (res?.status === 200) {
        setUsersList(res?.data)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [toggleSidePannel])

  return (
    <div>
      <Navbar />
      <AllUsersList
        setToggleSidePannel={setToggleSidePannel}
        toggleSidePannel={toggleSidePannel}
        setUsersList={setUsersList}
        usersList={usersList}
        setChatData={setChatData}
        chatData={chatData}
        setSelectedUser={setSelectedUser}
        selectUser={selectUser}
      />
      <Home
        setToggleSidePannel={setToggleSidePannel}
        setChatData={setChatData}
        chatData={chatData}
        setSelectedUser={setSelectedUser}
        selectUser={selectUser}
      />
    </div>
  )
}

export default HomePage
