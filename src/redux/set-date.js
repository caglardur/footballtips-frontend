import { createSlice } from "@reduxjs/toolkit"

const toDay = new Date()

export const setDate = createSlice({
  name: "matchDate",
  initialState: {
    value: toDay.getFullYear() + "-" + (toDay.getMonth() + 1 > 9 ? toDay.getMonth() + 1 : "0" + toDay.getMonth() + 1) + "-" + (toDay.getDate() > 9 ? toDay.getDate() : "0" + toDay.getDate())
  },
  reducers: {
    newDate: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { newDate } = setDate.actions

export const thatDate = state => state.matchDate.value

export default setDate.reducer
