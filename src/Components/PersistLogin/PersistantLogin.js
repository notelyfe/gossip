import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from '../../Hooks/useRefreshToken'
import Context from "../../Context/Context";
import api from '../../Services/api'

const PresistLogin = () => {
    const [loading, setLoading] = useState(true)
    const refresh = useRefreshToken()
    const { accessToken, setUserData, persist } = useContext(Context)

    useEffect(() => {

        const veriRefreshToken = async () => {
            try {
                let token = await refresh()

                const res = await api.get('/api/user/userData', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUserData(res?.data)

            } catch (error) {
                console.error("presist error", error)
            }
            finally {
                setLoading(false)
            }
        }

        !accessToken ? veriRefreshToken() : setLoading(false)

    }, [])

    return (
        <>
            {!persist ? <Outlet /> :
                !loading && <Outlet />
            }
        </>
    )
}

export default PresistLogin