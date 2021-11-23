import { createSlice } from "@reduxjs/toolkit"

export const setMatch = createSlice({
  name: "matchDetail",
  initialState: {
    value: null
  },
  reducers: {
    setMatchDetail: (state, action) => {
      state.value = action.payload
    },
    removeMatchDetail: state => {
      state.value = null
    }
  }
})

export const { setMatchDetail, removeMatchDetail } = setMatch.actions

export const thatMatch = state => state.matchDetail.value

export default setMatch.reducer
