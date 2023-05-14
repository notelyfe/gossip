import api from '../Services/api'
import Context from '../Context/Context'
import { useContext } from 'react'

const useRefreshToken = () => {

    const { setAccessToken } = useContext(Context)

    const refresh = async () => {

        const res = await api.get('/api/refresh', {
            withCredentials: true
        });
        setAccessToken(res?.data?.access_token)

        return res.data.access_token;
    }

    return refresh;
}

export default useRefreshToken
