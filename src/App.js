import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { thatDate } from "./redux/set-date"
import "./App.css"

import Header from "./component/header"
import LeagueList from "./component/league-list"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"
import DateSelection from "./component/date-selection"

function App() {
  const [matches, setMatches] = useState(null)
  const matchDate = useSelector(thatDate)

  useEffect(() => {
    setMatches(null)
    fetch(process.env.REACT_APP_DB_HOST + "matchesByDate/" + matchDate + "/m180")
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
  }, [matchDate])

  return (
    <main>
      <header className="px-3 pb-0 bg-success text-white">
        <div className="row">
          <div className="col">
            <Header />
          </div>
          <div className="col-md-auto">
            <DateSelection />
          </div>
        </div>
      </header>
      <div className="container-fluid" style={{ fontSize: "12px" }}>
        <div className="row">
          <div className="col mt-2" style={{ maxWidth: "400px" }}>
            <LeagueList matches={matches} />
          </div>
          <div className="col mt-2">
            <MatchList matches={matches} />
          </div>
          <div className="col mt-2">
            <MatchDetail matches={matches} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
