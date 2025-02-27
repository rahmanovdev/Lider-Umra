import { createSlice } from '@reduxjs/toolkit';

const boolSlices = createSlice({
   name: 'bool-slices',
   initialState: { isSubmitRequest: false },
   reducers: {
      toggleIsSubmitRequest(s) {
         s.isSubmitRequest = !s.isSubmitRequest;
      },
   },
});

export const { actions: boolSliceAction, reducer: boolSlicesReducer } =
   boolSlices;
