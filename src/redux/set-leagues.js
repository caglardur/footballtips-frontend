import { createSlice } from "@reduxjs/toolkit"

export const setLeague = createSlice({
  name: "matchLeague",
  initialState: {
    value: []
  },
  reducers: {
    addLeague: (state, action) => {
      state.value.push(action.payload)
    },
    removeLeague: (state, action) => {
      state.value = state.value.filter(league => league.id !== action.payload.id)
    },
    removeAllLeagues: state => {
      state.value = []
    }
  }
})

export const { addLeague, removeLeague, removeAllLeagues } = setLeague.actions

export const thatLeague = state => state.matchLeague.value

export default setLeague.reducer
