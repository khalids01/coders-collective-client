import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface ChatLayoutProps {
    conversation: {
        header: {
            height: number,
        },
        dialogues: {
            height: number | string,
        },
        form: {
            height: number | string
        }
    }
}

const initialState: ChatLayoutProps = {
    conversation: {
        header: {
            height: 70,
        },
        dialogues: {
            height: '100%'
        },
        form: {
            height: '100%'
        }
    }
}

export const ChatLayoutSlice = createSlice({
    name: 'chatLayout',
    initialState,
    reducers: {
        conversation: (state: ChatLayoutProps, action: PayloadAction<typeof initialState.conversation>) => {
            state.conversation = { ...state.conversation, ...action.payload }
        }
    }
})

export const { conversation } = ChatLayoutSlice.actions

export default ChatLayoutSlice.reducer