import { configureStore } from '@reduxjs/toolkit';
import authreducer from '../store/authSlice';

const store = configureStore({
    reducer: {
        auth: authreducer,
    }
})

export default store;