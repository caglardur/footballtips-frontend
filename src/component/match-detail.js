import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { thatMatch, removeMatchDetail } from "../redux/set-match"

import ConfigDetail from "./match-detail/configDetail"
import FinalScore from "./match-detail/finalScore"
import GoalAverage from "./match-detail/goalAverage"
import LastMatches from "./match-detail/lastMatches"
import LeagueName from "./match-detail/leagueName"
import MatchDate from "./match-detail/matchDate"
import OverUnder from "./match-detail/overUnder"
import Result from "./match-detail/result"
import BTTS from "./match-detail/bTTS"

const MatchDetail = () => {
  const [homeMatches, setHomeMatches] = useState(null)
  const [awayMatches, setAwayMatches] = useState(null)
  const matchDetail = useSelector(thatMatch)
  const dispatch = useDispatch()

  let matchDate
  if (matchDetail) {
    matchDate = new Date(matchDetail.fixture.date)
  }

  useEffect(() => {
    const finisedArray = ["FT", "AET", "PEN"]
    if (matchDetail) {
      fetch(process.env.REACT_APP_DB_HOST + "matchesByTeams/" + matchDetail.teams.home.id + "/" + matchDetail.teams.away.id)
        .then(res => res.json())
        .then(data => {
          if (data.lastMatches) {
            data.lastMatches.sort((a, b) => {
              if (a.fixture.date > b.fixture.date) {
                return -1
              }
              if (a.fixture.date < b.fixture.date) {
                return +1
              }
              return 0
            })
          }
          const oldMatches = data.lastMatches.filter(match => new Date(match.fixture.date) < new Date(matchDetail.fixture.date))
          const finishedOldMatches = oldMatches.filter(match => finisedArray.includes(match.fixture.status.short))
          setHomeMatches(finishedOldMatches.filter(match => match.teams.home.id === matchDetail.teams.home.id || match.teams.away.id === matchDetail.teams.home.id))
          setAwayMatches(finishedOldMatches.filter(match => match.teams.home.id === matchDetail.teams.away.id || match.teams.away.id === matchDetail.teams.away.id))
        })
        .catch(err => console.log(err))
    }
  }, [matchDetail])

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <div className="row">
          <div className="col">Match Detail</div>
          <div className="col-md-auto" onClick={() => dispatch(removeMatchDetail())}>
            <button type="button" className="btn btn-sm btn-danger">
              Close
            </button>
          </div>
        </div>
      </div>
      {matchDetail ? (
        <div className="card-body overflow-hidden position-relative" style={{ height: window.innerHeight - 130, overflow: "auto" }}>
          <div className="col">
            <LeagueName league={matchDetail.league} />
          </div>
          <div className="col">
            <MatchDate matchDate={matchDate} />
          </div>

          <div className="position-absolute top-0 start-0 opacity-25">
            <img src={matchDetail.teams.home.logo} className="mb-2" alt={matchDetail.teams.home.name} style={{ transform: "rotate(-15deg)", width: "300px" }} />
          </div>

          <div className="position-absolute top-0 start-0 opacity-25">
            <img src={matchDetail.teams.home.logo} className="mb-2" alt={matchDetail.teams.home.name} style={{ transform: "rotate(-15deg)", width: "300px" }} />
          </div>

          <div className="row justify-content-center">
            <div className="col" style={{ maxWidth: "260px" }}>
              <div className="card border-0">
                <div className="col align-self-center" style={{ height: "160px" }}>
                  <img src={matchDetail.teams.home.logo} className="mb-2" alt={matchDetail.teams.home.name} style={{ maxHeight: "120px", maxWidth: "120px" }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{matchDetail.teams.home.name}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-auto align-self-center">{matchDetail.fixture.status.short === "FT" && <FinalScore goals={matchDetail.goals} />}</div>
            <div className="col" style={{ maxWidth: "260px" }}>
              <div className="card border-0">
                <div className="col align-self-center" style={{ height: "160px" }}>
                  <img src={matchDetail.teams.away.logo} className="mb-2" alt={matchDetail.teams.away.name} style={{ maxHeight: "120px", maxWidth: "120px" }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{matchDetail.teams.away.name}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="col mb-4">
            <ConfigDetail />
          </div>

          <div className="col mb-4">
            <LastMatches lastMatches={homeMatches && homeMatches} team={matchDetail.teams.home} />
          </div>
          <div className="col mb-4">
            <LastMatches lastMatches={awayMatches && awayMatches} team={matchDetail.teams.away} />
          </div>

          <div className="col mb-4">
            <GoalAverage homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
          </div>

          <div className="col mb-4">
            <Result homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
          </div>

          <div className="col mb-4">
            <OverUnder homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
          </div>

          <div className="col mb-4">
            <BTTS homeLastMatches={homeMatches && homeMatches} awayLastMatches={awayMatches && awayMatches} homeTeam={matchDetail.teams.home} awayTeam={matchDetail.teams.away} />
          </div>

          <div className="col">Match Id: {matchDetail.fixture.id}</div>
        </div>
      ) : (
        <div className="spinner-border mx-auto my-4  text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default MatchDetail
