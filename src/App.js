import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { thatMatch } from "./redux/set-match"
import { thatDate } from "./redux/set-date"
import "./App.css"

import Header from "./component/header"
import LeagueList from "./component/league-list"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"
import DateSelection from "./component/date-selection"
import DateSelection2 from "./component/dateSelection2"

function App() {
  const [matches, setMatches] = useState(null)
  const matchDate = useSelector(thatDate)
  const matchDetail = useSelector(thatMatch)

  useEffect(() => {
    const canceledMatchCode = ["SUSP", "INT", "PST", "CANC", "ABD", "AWD", "WO"]
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
        const notCanceledMatches = data.matches.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
        setMatches(notCanceledMatches)
      })
      .catch(err => console.log(err))
  }, [matchDate])

  useEffect(() => {
    if (matchDetail) {
      const matchDe = document.getElementById("matchDet")
      matchDe.classList.remove("d-none")
      matchDe.classList.remove("opacity-25")
      matchDe.classList.add("opacity-100")
    } else {
      const matchDe = document.getElementById("matchDet")
      matchDe.classList.add("d-none")
      matchDe.classList.add("opacity-25")
      matchDe.classList.remove("opacity-100")
    }
  }, [matchDetail])

  return (
    <main>
      <header className="px-3 pb-0 bg-success text-white">
        <div className="container-lg">
          <div className="row justify-content-between">
            <div className="col-md-auto">
              <Header />
            </div>
            <div className="col-md-auto">
              {/* <DateSelection /> */}
              <DateSelection2 />
            </div>
          </div>
        </div>
      </header>
      <div className="container-lg text-nowrap overflow-hidden" style={{ fontSize: "12px" }}>
        <div className="row mt-2 position-relative">
          <div className="col-4">
            <LeagueList matches={matches} />
          </div>
          <div className="col-8">
            <MatchList matches={matches} />
          </div>
          <div className="col-12 position-absolute top-0 start-0 opacity-25" style={{ zIndex: 10, transitionProperty: "all", transitionDelay: "1s" }} id="matchDet">
            <MatchDetail />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
