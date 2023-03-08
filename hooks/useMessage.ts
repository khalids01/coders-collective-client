import { images } from '@/constants';
import { useState, useEffect } from "react";

const useMessage = () => {
    const [sendingTo, setSendingTo] = useState({
        name: 'Someone',
        avatar: images.k,
        mobile: '+8801749406592',
        about: 'Hi there, I am using coders collective',
        starredMessages: [],
        muteNotification: false,
        commonConnections: [
            'asdfkasdflkj'
        ],
    })

    useEffect(()=>{
        console.log(sendingTo)
    }, [sendingTo])

    return {
        sendingTo
    }
}

export default useMessage