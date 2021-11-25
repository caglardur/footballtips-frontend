import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getConfigDetail, setLeagueConfig, setHomeAwayConfig } from "../../redux/set-config"

const ConfigDetail = () => {
  const configDetail = useSelector(getConfigDetail)
  const dispatch = useDispatch()

  useEffect(() => {
    const leagueCheckbox = document.getElementById("Switch1")
    const homeAwayCheckbox = document.getElementById("Switch2")
    if (configDetail.league === true) {
      leagueCheckbox.checked = true
    } else {
      leagueCheckbox.checked = false
    }
    if (configDetail.homeAway === true) {
      homeAwayCheckbox.checked = true
    } else {
      homeAwayCheckbox.checked = false
    }
  }, [configDetail])

  return (
    <div className="col rounded bg-secondary bg-opacity-25 fs-6 text">
      <div className="col p-3">
        <div className="row">
          <div className="col">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="Switch1" onChange={e => dispatch(setLeagueConfig(e.target.checked))} />
              <label className="form-check-label" htmlFor="Switch1">
                Only show stats from same league
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="Switch2" onChange={e => dispatch(setHomeAwayConfig(e.target.checked))} />
              <label className="form-check-label" htmlFor="Switch2">
                Only show home and away stats
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigDetail
