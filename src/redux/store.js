import { configureStore } from "@reduxjs/toolkit"
import setDate from "./set-date"
import setLeague from "./set-leagues"
import setMatch from "./set-match"

export default configureStore({
  reducer: {
    matchDate: setDate,
    matchLeague: setLeague,
    matchDetail: setMatch
  }
})
