import api from '../Services/api'
import Context from '../Context/Context'
import { useContext } from 'react'

const useRefreshToken = () => {

    const { setUserData, userData } = useContext(Context)

    const refresh = async () => {
        const res = await api.get('/api/refresh', { id: userData._id }, {
            withCredentials: true
        });
        setUserData(prev => {
            console.log(JSON.stringify(prev));
            console.log(res.data.access_token)
            return { ...prev, access_token: res.data.access_token }
        })

        return res.data.access_token;
    }

    return refresh;
}

export default useRefreshToken
