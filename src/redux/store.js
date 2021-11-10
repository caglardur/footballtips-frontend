import { configureStore } from "@reduxjs/toolkit"
import setDate from "./set-date"

export default configureStore({
  reducer: {
    matchDate: setDate
  }
})
