import './Style/global.css'
import style from './Style/root.module.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context/Context'
import { Toaster } from 'react-hot-toast'
import SignUp from './Pages/SignUpPage'
import Login from './Pages/LoginPage'
import UserVerification from './Pages/UserVerificationPage'
import CreatePassword from './Pages/CreateNewPasswordPage'
import Home from './Pages/HomePage'
import Loading from './Components/LoadingSpinner/Loading'
import Layout from './Components/Layout/Layout'
import RequireAuth from './Components/RequireAuth/RequireAuth'
import PresistLogin from './Components/PersistLogin/PersistantLogin'
import UserDashBoard from './Components/UserDashBoard/UserDashBoard'
import Settings from './Components/Settings/Settings'
import Profile from './Components/Profile/Profile'
import Notification from './Components/Notification/Notification'
import VerifyEmail from './Pages/VerifyEmail'

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
          <Route path='/verify' element={<VerifyEmail />} />

          {/* protected routes */}
          <Route element={<PresistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<UserDashBoard />} >
                <Route path='profile' element={<Profile />} />
                <Route path='setting' element={<Settings />} />
                <Route path='notification' element={<Notification />} />
              </Route>
            </Route>
          </Route>

        </Route>
        <Route
          path="*"
          element={
            <h1>
              404 page not found. <Link to={-1}>⬅ go back</Link>
            </h1>
          }
        />
      </Routes>
      {loading && <Loading />}
      <Toaster />
    </main>

  );
}

export default App;
