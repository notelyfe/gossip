import React, { useState } from 'react'
import Context from './Context';

const State = (props) => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <Context.Provider value={{ userData, setUserData, loading, setLoading }} >
            {props.children}
        </Context.Provider>
    )
}

export default State;