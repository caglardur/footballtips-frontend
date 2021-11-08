import React, { useEffect, useState } from "react"
import "./App.css"

import Header from "./component/header"
import TimeLeague from "./component/time-league"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"
import SelectedLeagues from "./component/selected-leagues"

function App() {
  const [matches, setMatches] = useState(null)
  useEffect(() => {
    fetch(process.env.REACT_APP_DB_HOST + "matchesByDate/2021-11-08/m180")
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
        <div style={{ width: "400px" }}>
          <div className="col">
            <Header />
          </div>
          <div className="col">
            <TimeLeague matches={matches} />
          </div>
        </div>
        <div className="col">
          <div className="col" id="selectedLeagues">
            <SelectedLeagues />
          </div>
          <div className="col">
            <MatchList matches={matches} />
          </div>
        </div>
        <div className="col">
          {matches ? (
            <MatchDetail match={matches[106]} />
          ) : (
            <div className="spinner-border mx-auto my-4  text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
