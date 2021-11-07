const Leagues = ({ leagues }) => {
  return (
    <div>
      {leagues.map(country => (
        <li className="list-group-item">
          <img src={country.flag} className="rounded mx-auto my-auto" alt={country.country} height="14" />
          {country.country}
          <ul className="list-group list-group-flush">
            {country.leagues.map(league => (
              <li className="list-group-item d-flex justify-content-start align-items-center text-start ">
                <div className="col">{league.league}</div>
                <span className="badge bg-primary rounded-pill">{league.matchCount}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  )
}

export default Leagues
