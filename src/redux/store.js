import { configureStore } from "@reduxjs/toolkit"
import setDate from "./set-date"
import setLeague from "./set-leagues"

export default configureStore({
  reducer: {
    matchDate: setDate,
    matchLeague: setLeague
  }
})
