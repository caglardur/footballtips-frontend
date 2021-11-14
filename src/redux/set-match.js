import { createSlice } from "@reduxjs/toolkit"

export const setMatch = createSlice({
  name: "matchDetail",
  initialState: {
    value: null
  },
  reducers: {
    setMatch: (state, action) => {
      state.value = action.payload
    },
    removeMatch: (state, action) => {
      state.value = null
    }
  }
})

export const { addLeague, removeLeague, removeAllLeagues } = setLeague.actions

export const thatLeague = state => state.matchLeague.value

export default setLeague.reducer
