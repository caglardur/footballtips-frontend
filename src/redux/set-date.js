import { createSlice } from "@reduxjs/toolkit"

export const setDate = createSlice({
  name: "matchDate",
  initialState: {
    value: new Date()
  },
  reducers: {
    newDate: (state, action) => {
      state.value = new Date(action.payload)
    }
  }
})

export const { newDate } = setDate.actions

export const thatDate = state => state.matchDate.value

export default setDate.reducer
