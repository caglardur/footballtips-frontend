import React, { useEffect, useState } from "react"
const TimeLeague = ({ matches }) => {
  const [leagues, setLeagues] = useState(null)
  const [countries, setCountries] = useState(null)

  let leagueArray = []
  let countryArray = []

  useEffect(() => {
    if (matches) {
      matches.map(match => {
        const countryIndex = countryArray.findIndex(e => e.country === match.league.country)
        if (countryIndex < 0) {
          countryArray.push({ country: match.league.country, flag: match.league.flag, count: 1 })
        } else {
          countryArray[countryIndex].count += 1
        }
      })
    }
    countryArray.sort((a, b) => {
      if (a.country < b.country) {
        return -1
      }
      if (a.country > b.country) {
        return +1
      }
      return 0
    })
    setCountries(countryArray)
  }, [matches])

  console.log(countries)

  return (
    <div>
      <ul className="list-group">
        {countries &&
          countries.length > 0 &&
          countries.map(country => (
            <li className="list-group-item d-flex justify-content-between align-items-center text-start">
              <div className="col-4">
                <div className="row align-items-start">
                  <div className="col">
                    <input className="form-check-input me-1" type="checkbox" defaultValue aria-label="..." />
                  </div>
                  <div className="col">
                    <img src={country.flag} className="rounded float-start" alt={country.country} height="12" />
                  </div>
                  <div className="col">{country.country}</div>
                </div>
              </div>

              <span className="badge bg-primary rounded-pill">{country.count}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TimeLeague
