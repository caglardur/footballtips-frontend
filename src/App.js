import React, { useEffect, useState } from "react"
import "./App.css"

import Header from "./component/header"
import TimeLeague from "./component/time-league"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"

function App() {
  const [matches, setMatches] = useState(null)
  console.log(process.env.REACT_APP_DB_HOST)
  useEffect(() => {
    fetch(process.env.REACT_APP_DB_HOST + "matchesByDate/2021-11-06/m180")
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.log(err))
  }, [])
  console.log(matches)
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
