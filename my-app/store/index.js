import { configureStore } from '@reduxjs/toolkit';
import { recipientReducer } from './recipientSlice';

export const store = configureStore({ reducer: { device: recipientReducer } });