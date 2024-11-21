import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';
import { IRootState, AppDispatch } from '@/app/store';

export const WorkModalSlice = createSlice({
  name: 'workmodal_image',
  initialState: {
    url: '#',
    isVideo: false,
    index : 0
  },
  reducers: {
    addImage: (state, action: PayloadAction<{ url : string, isVideo : boolean, index : number }>) => {
        state = action.payload;
        return state;
    },
  }
});

export const OpenWorkModalSlice = createSlice({
    name: 'workmodal_open',
    initialState: false,
    reducers: {
      openModal: (state, action: PayloadAction<boolean>) => {
          state = action.payload;
          return state;
      },
    }
  });

// Action creators are generated for each case reducer function
export const { addImage } = WorkModalSlice.actions
export const { openModal } = OpenWorkModalSlice.actions

export const toggleModalAsync = (value : boolean) => (dispatch : AppDispatch) => {
      dispatch(openModal(value))
}

export const toggleMediaAsync = ({ url, isVideo, index } : { url : string, isVideo : boolean, index : number }) => (dispatch : AppDispatch) => {
    dispatch(addImage({ url, isVideo, index }))
}

export default WorkModalSlice.reducer;
