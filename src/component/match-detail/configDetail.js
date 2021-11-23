import React, { useState } from "react"

const ConfigDetail = () => {
  const [leagueConfig, setLeagueConfig] = useState(true)
  const [homeAwayConfig, setHomeAwayConfig] = useState(false)

  return (
    <div className="col rounded bg-secondary bg-opacity-25 fs-6 text">
      <div className="col p-3">
        <div className="col">
          <div className="form-check form-switch">
            {leagueConfig === true ? <input className="form-check-input" type="checkbox" role="switch" id="Switch1" checked onChange={e => setLeagueConfig(e.target.checked)} /> : <input className="form-check-input" type="checkbox" role="switch" id="Switch1" onChange={e => setLeagueConfig(e.target.checked)} />}
            <label className="form-check-label" htmlFor="Switch1">
              Only show stats from same league
            </label>
          </div>
          <div className="form-check form-switch">
            {homeAwayConfig ? <input className="form-check-input" type="checkbox" role="switch" id="Switch2" checked onChange={e => setHomeAwayConfig(e.target.checked)} /> : <input className="form-check-input" type="checkbox" role="switch" id="Switch2" onChange={e => setHomeAwayConfig(e.target.checked)} />}
            <label className="form-check-label" htmlFor="Switch2">
              Only show home and away stats
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigDetail
