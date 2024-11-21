import { configureStore } from '@reduxjs/toolkit'
import { WorkModalSlice, OpenWorkModalSlice } from '@/redux/WorkSlice'

const store = configureStore({
  reducer: {
    add_image: WorkModalSlice.reducer,
    open_modal: OpenWorkModalSlice.reducer
  }
});

export default store;
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store