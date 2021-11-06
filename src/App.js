import React, { useEffect, useState } from "react"
import "./App.css"

import Header from "./component/header"
import TimeLeague from "./component/time-league"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"

function App() {
  console.log(process.env.REACT_APP_DB_HOST)
  return (
    <div className="App">
      <Header />
      <TimeLeague />
      <MatchList />
      <MatchDetail />
    </div>
  )
}

export default App
