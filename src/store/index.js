import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user';
import listsSlice from './lists';

export default configureStore({
  reducer: {
    user: userSlice,
    lists: listsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
