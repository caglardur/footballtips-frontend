import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { thatLeague } from "../redux/set-leagues"
import LeagueName from "./match-list/league-name"
import SingleListItem from "./match-list/singleListItem"

const MatchList = ({ matches }) => {
  const [match, setMatch] = useState(null)
  const matchLeague = useSelector(thatLeague)

  useEffect(() => {
    setMatch(null)
    if (matches && matches.length > 0) {
      if (matchLeague.length > 0) {
        const newMatchList = matches.filter(match => matchLeague.some(league => league.id === match.league.id))
        setMatch(newMatchList)
      } else {
        setMatch(matches)
      }
    }
  }, [matches, matchLeague])

  return (
    <div className="card rounded-0">
      <div className="card-header">Match List</div>
      {match ? (
        <div className="card-body overflow-auto" style={{ height: window.innerHeight - 130, overflow: "auto" }}>
          <ul className="list-group">
            {match.map((m, index) =>
              index === 0 ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col mb-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className="list-group-item list-group-item-action">
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : m.league.id !== match[index - 1].league.id ? (
                <div className="col" key={m.fixture.id}>
                  <div className="col my-2">
                    <LeagueName match={m} />
                  </div>
                  <li type="button" className="list-group-item list-group-item-action">
                    <SingleListItem match={m} />
                  </li>
                </div>
              ) : (
                <li type="button" className="list-group-item list-group-item-action border-top-0" key={m.fixture.id}>
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
