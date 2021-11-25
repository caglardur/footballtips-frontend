import { createSlice } from "@reduxjs/toolkit"

export const setConfig = createSlice({
  name: "configDetail",
  initialState: {
    value: {
      league: true,
      homeAway: false
    }
  },
  reducers: {
    setLeagueConfig: (state, action) => {
      state.value.league = action.payload
    },
    setHomeAwayConfig: (state, action) => {
      state.value.homeAway = action.payload
    }
  }
})

export const { setLeagueConfig, setHomeAwayConfig } = setConfig.actions

export const getConfigDetail = state => state.configDetail.value

export default setConfig.reducer
