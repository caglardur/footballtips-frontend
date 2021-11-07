import React, { useEffect, useState } from "react"
import "./App.css"

import Header from "./component/header"
import TimeLeague from "./component/time-league"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"

function App() {
  const [matches, setMatches] = useState(null)
  useEffect(() => {
    fetch(process.env.REACT_APP_DB_HOST + "matchesByDate/2021-11-07/m180")
      .then(res => res.json())
      .then(data => {
        if (data.matches) {
          data.matches.sort((a, b) => {
            if (a.fixture.date < b.fixture.date) {
              return -1
            }
            if (a.fixture.date > b.fixture.date) {
              return +1
            }
            return 0
          })
        }
        setMatches(data.matches)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col">
          <div className="col">
            <Header />
          </div>
          <div className="col">
            <TimeLeague matches={matches} />
          </div>
        </div>
        <div className="col">
          <MatchList matches={matches} />
        </div>
        <div className="col">
          <MatchDetail />
        </div>
      </div>
    </div>
  )
}

export default App
