import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { addLeague, thatLeague } from "../redux/set-leagues"

const SelectedLeagues = () => {
  const matchLeague = useSelector(thatLeague)
  const dispatch = useDispatch()

  useEffect(() => {}, [matchLeague])
  console.log(matchLeague)

  return (
    <div className="card">
      <div className="card-header">Selected League</div>
      <div className="card-body">
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {matchLeague.length > 0 &&
            matchLeague.map(leageu => (
              <div className="col">
                <div className="p-3 border bg-light">
                  {leageu.league}
                  <button type="button" className="btn-close" aria-label="Close" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SelectedLeagues
