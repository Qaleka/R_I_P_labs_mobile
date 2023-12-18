import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipients: [],
    recipient: undefined,
    searchText: '',
};

export const recipientSlice = createSlice({
    name: 'recipient',
    initialState,
    reducers: {
        setRecipients: (state, { payload }) => {
            console.log('setRecipients');
            state.recipients = payload;
        },
        setRecipient: (state, { payload }) => {
            console.log('setRecipient', payload);
            state.recipient = payload;
        },
        setSearch: (state, { payload }) => {
            state.searchText = payload
        },
        resetRecipient: (state) => {
            console.log('resetRecipient');
            state.recipient = undefined;
        },
    },
});

export const recipientReducer = recipientSlice.reducer;

export const { setRecipients, setRecipient, setSearch, resetRecipient } = recipientSlice.actions;