import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipients: [],
    recipient: {},
};

export const recipientSlice = createSlice({
    name: 'recipient',
    initialState,
    reducers: {
        setRecipients: (state, { payload }) => {
            console.log('setRecipients');
            state.recipient = payload;
        },
        setRecipient: (state, { payload }) => {
            console.log('setRecipient');
            state.recipient = payload;
        },
        resetRecipient: (state) => {
            console.log('resetRecipient');
            state.recipient = {};
        },
    },
});

export const recipientReducer = recipientSlice.reducer;

export const { setRecipients, setRecipient, resetRecipient } = recipientSlice.actions;