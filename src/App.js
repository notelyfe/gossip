import './Style/global.css'
import style from './Style/root.module.css'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import Context from './Context/Context'
import { Toaster } from 'react-hot-toast'
import SignUp from './Pages/SignUpPage'
import Login from './Pages/LoginPage'
import ResetPass from './Pages/ResetPasswordPage'
import Home from './Pages/HomePage'
import Loading from './Components/LoadingSpinner/Loading'
import Layout from './Components/Layout/Layout'
import RequireAuth from './Components/RequireAuth/RequireAuth'

function App() {

  const { loading } = useContext(Context)

  return (

    <main className={style.main}>
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* public routes */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user-verification' element={<ResetPass />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Route>
      </Routes>
      {loading && <Loading />}
      <Toaster />
    </main>

  );
}

export default App;
