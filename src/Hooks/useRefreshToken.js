import api from '../Services/api'
import Context from '../Context/Context'
import { useContext } from 'react'

const useRefreshToken = () => {

    const { setAccessToken, setUserData } = useContext(Context)

    const refresh = async () => {

        const res = await api.get('/api/refresh', {
            withCredentials: true
        });
        // setAccessToken(prev => {
        //     return { ...prev, access_token: res.data.access_token }
        // })
        // let token = res?.data?.access_token
        setAccessToken(res?.data?.access_token)

        return res.data.access_token;
    }

    return refresh;
}

export default useRefreshToken
