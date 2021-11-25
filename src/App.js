import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { thatMatch } from "./redux/set-match"
import { thatDate } from "./redux/set-date"
import "./App.css"

import Header from "./component/header"
import LeagueList from "./component/league-list"
import MatchList from "./component/match-list"
import MatchDetail from "./component/match-detail"
import DateSelection2 from "./component/dateSelection2"

function App() {
  const [matches, setMatches] = useState(null)
  const [viewLeagues, setViewLeagues] = useState(false)
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
      const matchesLi = document.getElementById("matchesLi")
      matchesLi.style.opacity = 0
      setTimeout(() => {
        matchesLi.style.display = "none"
      }, 200)
      setTimeout(() => {
        matchDe.style.display = "block"
      }, 250)
      setTimeout(() => {
        matchDe.style.opacity = 100
      }, 450)
    } else {
      const matchDe = document.getElementById("matchDet")
      const matchesLi = document.getElementById("matchesLi")
      matchDe.style.opacity = 0
      setTimeout(() => {
        matchDe.style.display = "none"
      }, 200)
      setTimeout(() => {
        matchesLi.style.display = "block"
      }, 250)
      setTimeout(() => {
        matchesLi.style.opacity = 100
      }, 450)
    }
  }, [matchDetail])

  const openModal = () => {
    console.log("basıldı")
  }

  return (
    <main>
      <header className="px-3 pb-0 text-white bg-gradient" style={{ backgroundColor: "#444444" }}>
        <div className="container-lg">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Header openModal={openModal} />
            </div>
            <div className="col-auto">
              <DateSelection2 />
            </div>
          </div>
        </div>
      </header>
      <div className="container-lg text-nowrap overflow-hidden" style={{ fontSize: "12px" }}>
        <div className="row mt-2 position-relative">
          <div className="col-12" id="matchesLi" style={{ display: "block", opacity: 100, transition: "all 0.2s" }}>
            <div className="row">
              <div className="col-md-4" style={{ display: window.innerWidth < "768" && "none" }}>
                <LeagueList matches={matches} />
              </div>
              <div className="col-md-8">
                <MatchList matches={matches} />
              </div>
            </div>
          </div>
          <div className="col-12" id="matchDet" style={{ display: "none", opacity: 0, transition: "all 0.2s" }}>
            <MatchDetail />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
