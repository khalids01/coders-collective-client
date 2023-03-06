import { images } from '@/constants';
import { useState } from "react";

const useMessage = () => {
    const [sendingTo, setSendingTo] = useState({
        name: 'Someone',
        avatar: images.k,
        mobile: '+880174940659221',
        about: 'Hi there, I am using',
        starredMessages: [],
        muteNotification: false,
        commonConnections: [
            'asdfkasdflkj'
        ],
    })

    return {
        sendingTo
    }
}

export default useMessage