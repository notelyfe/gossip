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

function App() {

  const { loading } = useContext(Context)

  return (

    <main className={style.main}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-verification' element={<ResetPass />} />
      </Routes>
      {loading && <Loading />}
      <Toaster />
    </main>

  );
}

export default App;
