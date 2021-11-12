import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeLeague, removeAllLeagues, thatLeague } from "../redux/set-leagues"

const SelectedLeagues = () => {
  const matchLeague = useSelector(thatLeague)
  const dispatch = useDispatch()

  useEffect(() => {}, [matchLeague])
  console.log(matchLeague)

  return (
    <div className="card">
      <div className="card-header">Selected League</div>

      <div className="card-body">
        <div className="row g-2">
          {matchLeague.length > 0 &&
            matchLeague.map(league => (
              <div className="col-md-auto">
                <div className="border bg-light rounded p-2">
                  <div className="row">
                    <div className="col-md-auto">
                      <img src={league.flag || "/world.png"} className="mb-1" alt={league.country} height="14" />
                    </div>
                    <div className="col text-nowrap overflow-hidden mx-0 px-0">{league.league}</div>
                    <div className="col-md-auto">
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(removeLeague(league))} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {matchLeague.length > 1 && (
            <div className="col-md-auto">
              <button type="button" className="btn p-2 btn-danger" onClick={() => dispatch(removeAllLeagues())}>
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectedLeagues
