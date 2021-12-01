import React, { useEffect, useState } from "react"

import Leagues from "./leagues/leagues"

const LeagueList = ({ matches }) => {
  const [leagues, setLeagues] = useState(null)
  const [leagueFilter, setLeagueFilter] = useState("")

  useEffect(() => {
    let countryArray = []
    if (matches) {
      matches.map(match => {
        const countryIndex = countryArray.findIndex(country => country.country === match.league.country)
        if (countryIndex < 0) {
          return countryArray.push({ country: match.league.country, flag: match.league.flag, leagues: [{ league: match.league.name, id: match.league.id, matchCount: 1 }], id: countryArray.length })
        } else {
          const leagueIndex = countryArray[countryIndex].leagues.findIndex(league => league.id === match.league.id)
          if (leagueIndex < 0) {
            return countryArray[countryIndex].leagues.push({ league: match.league.name, id: match.league.id, matchCount: 1 })
          } else {
            return (countryArray[countryIndex].leagues[leagueIndex].matchCount += 1)
          }
        }
      })
    }
    if (leagueFilter && leagueFilter.length > 1) {
      const newCountryArray = countryArray.filter(country => {
        const lowerCountry = country.country.toLowerCase()
        const lowerLeagueFilter = leagueFilter.toLowerCase()
        return lowerCountry.includes(lowerLeagueFilter)
      })
      newCountryArray.map(country => country.leagues.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)))
      newCountryArray.sort((a, b) => (a.country > b.country ? 1 : b.country > a.country ? -1 : 0))
      setLeagues([...newCountryArray])
    } else {
      countryArray.map(country => country.leagues.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)))
      countryArray.sort((a, b) => (a.country > b.country ? 1 : b.country > a.country ? -1 : 0))
      setLeagues([...countryArray])
    }
  }, [matches, leagueFilter])

  return (
    <div className="col">
      <div className="card rounded-0">
        <div className="card-header">
          <div className="row">
            <div className="col fs-6">League Filter</div>
            <div className="col-auto">
              <div className="row position-relative">
                <div className="col-auto">
                  <input type="text" className="form-control form-control-sm" value={leagueFilter} placeholder={leagueFilter || "Filter"} aria-label="Country" onChange={e => setLeagueFilter(e.target.value)} />
                </div>
                {leagueFilter && leagueFilter.length > 0 && (
                  <div className="col-auto position-absolute top-50 end-0 translate-middle-y">
                    <span type="button" className="material-icons md-24" onClick={() => setLeagueFilter("")}>
                      clear
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {leagues && leagues.length > 0 ? (
          <div className="overflow-auto mb-4">
            <Leagues leagues={leagues} />
          </div>
        ) : (
          <div className="spinner-border mx-auto my-4  text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeagueList
