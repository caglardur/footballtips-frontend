const LastMatches = ({ lastMatches, team }) => {
  const lastSixMatches = lastMatches && lastMatches.slice(0, 6)

  return (
    <div className="card shadow-sm border-secondary overflow-hidden">
      <div className="card-header">
        <div className="col fw-bold">{lastSixMatches && team && team.name + " last matches"}</div>
      </div>
      <div className="card-body overflow-hidden position-relative bg-light bg-gradient">
        <div className="position-absolute opacity-25" style={{ left: "0px", top: "0px", zIndex: "-10" }}>
          <img src={team.logo} className="mb-2" alt={team.name} style={{ height: "300px", filter: "grayscale(100%)" }} />
        </div>
        <div className="row mb-1 fw-bold">
          <div className="col-auto" style={{ width: "60px" }}>
            Score
          </div>
          <div className="col">Opponent</div>
          <div className="col-2">Date</div>
          <div className="col-3">League</div>
        </div>
        <div className="col overflow-hidden">
          {lastSixMatches &&
            lastSixMatches.map(match => (
              <div className="row mb-1 align-items-center" key={match.fixture.id}>
                <div className="col-auto">
                  {match.score.fulltime.home > match.score.fulltime.away ? (
                    team.id === match.teams.home.id ? (
                      <div className="col bordered bg-success text-white d-flex align-items-center justify-content-center rounded fw-bold" style={{ width: "35px", height: "35px" }}>
                        {match.score.fulltime.home}:{match.score.fulltime.away}
                      </div>
                    ) : (
                      <div className="col bordered bg-danger text-white d-flex align-items-center justify-content-center rounded fw-bold" style={{ width: "35px", height: "35px" }}>
                        {match.score.fulltime.home}:{match.score.fulltime.away}
                      </div>
                    )
                  ) : match.score.fulltime.home < match.score.fulltime.away ? (
                    team.id === match.teams.away.id ? (
                      <div className="col bordered bg-success text-white d-flex align-items-center justify-content-center rounded fw-bold" style={{ width: "35px", height: "35px" }}>
                        {match.score.fulltime.home}:{match.score.fulltime.away}
                      </div>
                    ) : (
                      <div className="col bordered bg-danger text-white d-flex align-items-center justify-content-center rounded fw-bold" style={{ width: "35px", height: "35px" }}>
                        {match.score.fulltime.home}:{match.score.fulltime.away}
                      </div>
                    )
                  ) : (
                    <div className="col bordered bg-warning text-white d-flex align-items-center justify-content-center rounded fw-bold" style={{ width: "35px", height: "35px" }}>
                      {match.score.fulltime.home}:{match.score.fulltime.away}
                    </div>
                  )}
                </div>

                <div className="col overflow-hidden text-nowrap">{team.id === match.teams.home.id ? match.teams.away.name : match.teams.home.name}</div>
                <div className="col-2">{new Date(match.fixture.date).toLocaleString().slice(0, 5)}</div>
                <div className="col-3 overflow-hidden text-nowrap">{match.league.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LastMatches
