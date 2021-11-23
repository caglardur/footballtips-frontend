const LastMatches = ({ lastMatches, team }) => {
  const lastSixMatches = lastMatches && lastMatches.slice(0, 6)
  console.log(team)
  return (
    <div className="card bg-body shadow-sm border-success">
      <div className="card-header">
        <div className="row">
          <div className="col">{lastSixMatches && team && team.name + " last " + lastSixMatches.length + " matches"}</div>
          <div className="col-auto">
            <div className="row">
              <div className="col bg-success rounded"></div>
              <div className="col">Win</div>
              <div className="col bg-warning rounded"></div>
              <div className="col">Draw</div>
              <div className="col bg-danger rounded"></div>
              <div className="col">Lose</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row mb-1 fw-bold">
          <div className="col-auto" style={{ width: "60px" }}>
            Score
          </div>
          <div className="col-4">Opponent</div>
          <div className="col-2">Date</div>
          <div className="col-4">League</div>
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

                <div className="col-4 overflow-hidden text-nowrap">{team.id === match.teams.home.id ? match.teams.away.name : match.teams.home.name}</div>
                <div className="col-2">{new Date(match.fixture.date).toLocaleString().slice(0, 5)}</div>
                <div className="col-4 overflow-hidden text-nowrap">{match.league.name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LastMatches
