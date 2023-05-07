import { apiPrivate } from "../Services/api";
import { useContext, useEffect } from "react";
import useRefreshToken from './useRefreshToken'
import Context from "../Context/Context";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { userData, accessToken } = useContext(Context)

    useEffect(() => {

        const requestIntercept = apiPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = apiPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return apiPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept);
            apiPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [userData, refresh])

    return apiPrivate
}

export default useAxiosPrivate;