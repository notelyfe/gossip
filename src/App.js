import './Style/global.css'
import style from './Style/root.module.css'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context/Context'
import { Toaster } from 'react-hot-toast'
import SignUp from './Pages/SignUpPage'
import Login from './Pages/LoginPage'
import UserVerification from './Pages/UserVerificationPage'
import CreatePassword from './Pages/CreateNewPasswordPage'
import Home from './Pages/HomePage'
import Profile from './Pages/ProfilePage'
import Notification from './Pages/NotificationPage'
import Settings from './Pages/SettingPage'
import Loading from './Components/LoadingSpinner/Loading'
import Layout from './Components/Layout/Layout'
import RequireAuth from './Components/RequireAuth/RequireAuth'
import PresistLogin from './Components/PersistLogin/PersistantLogin'


function App() {

  const { loading } = useContext(Context)

  return (

    <main className={style.main}>
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* public routes */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user-verification' element={<UserVerification />} />
          <Route path='/reset-password' element={<CreatePassword />} />

          {/* protected routes */}
          <Route element={<PresistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/setting' element={<Settings />} />
              <Route path='/notification' element={<Notification />} />
            </Route>
          </Route>

        </Route>
      </Routes>
      {loading && <Loading />}
      <Toaster />
    </main>

  );
}

export default App;
