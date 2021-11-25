import { configureStore } from "@reduxjs/toolkit"
import setDate from "./set-date"
import setLeague from "./set-leagues"
import setMatch from "./set-match"
import setConfig from "./set-config"

export default configureStore({
  reducer: {
    matchDate: setDate,
    matchLeague: setLeague,
    matchDetail: setMatch,
    configDetail: setConfig
  }
})
