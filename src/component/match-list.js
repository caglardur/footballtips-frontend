import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { thatLeague } from "../redux/set-leagues"
import { setMatchDetail, thatMatch } from "../redux/set-match"

import LeagueName from "./match-list/league-name"
import SingleListItem from "./match-list/singleListItem"

const MatchList = ({ matches }) => {
  const [match, setMatch] = useState(null)
  const matchLeague = useSelector(thatLeague)
  const matchDetail = useSelector(thatMatch)
  const dispatch = useDispatch()

  useEffect(() => {
    const canceledMatchCode = ["SUSP", "INT", "PST", "CANC", "ABD", "AWD", "WO"]
    setMatch(null)
    if (matches && matches.length > 0) {
      if (matchLeague.length > 0) {
        const newMatchList = matches.filter(match => matchLeague.some(league => league.id === match.league.id))
        const notCanceledMatches = newMatchList.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
        setMatch(notCanceledMatches)
      } else {
        const notCanceledMatches = matches.filter(match => !canceledMatchCode.includes(match.fixture.status.short))
        setMatch(notCanceledMatches)
      }
    }
  }, [matches, matchLeague])

  return (
    <div className="card rounded-0">
      <div className="card-header">
        <div className="row">
          <div className="col">Match List</div>
        </div>
      </div>
      {match ? (
        <div className="card-body overflow-auto" style={{ height: window.innerHeight - 130, overflow: "auto" }}>
          <ul className="list-group">
            {match.map((m, index) =>
              index === 0 ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col mb-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white" : "list-group-item list-group-item-action"} onClick={() => dispatch(setMatchDetail(m))}>
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : m.league.id !== match[index - 1].league.id ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col my-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white" : "list-group-item list-group-item-action"} onClick={() => dispatch(setMatchDetail(m))}>
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : (
                <li type="button" className={matchDetail && matchDetail.fixture.id === m.fixture.id ? "list-group-item list-group-item-action bg-success text-white border-top-0" : "list-group-item list-group-item-action border-top-0"} key={m.fixture.id} onClick={() => dispatch(setMatchDetail(m))}>
                  <SingleListItem match={m} />
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="spinner-border mx-auto my-4 text-secondary text-center" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default MatchList
