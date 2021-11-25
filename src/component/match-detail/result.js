const Result = ({ homeLastMatches, awayLastMatches, homeTeam, awayTeam }) => {
  const homeLastSixMatches = homeLastMatches && homeLastMatches.slice(0, 6)
  const awayLastSixMatches = awayLastMatches && awayLastMatches.slice(0, 6)

  let homeWin = 0,
    homeDraw = 0,
    homeLose = 0,
    awayWin = 0,
    awayDraw = 0,
    awayLose = 0,
    ratioHome = 0,
    ratioDraw = 0,
    ratioAway = 0,
    total = 0,
    winner,
    winnerRatio

  if (homeLastSixMatches && awayLastSixMatches) {
    homeLastSixMatches.map(match => {
      if (match.teams.home.id === homeTeam.id) {
        if (match.score.fulltime.home > match.score.fulltime.away) {
          return (homeWin += 1)
        } else if (match.score.fulltime.home < match.score.fulltime.away) {
          return (homeLose += 1)
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          return (homeDraw += 1)
        } else {
          return false
        }
      } else {
        if (match.score.fulltime.home < match.score.fulltime.away) {
          return (homeWin += 1)
        } else if (match.score.fulltime.home > match.score.fulltime.away) {
          return (homeLose += 1)
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          return (homeDraw += 1)
        } else {
          return false
        }
      }
    })
    awayLastSixMatches.map(match => {
      if (match.teams.home.id === awayTeam.id) {
        if (match.score.fulltime.home > match.score.fulltime.away) {
          return (awayWin += 1)
        } else if (match.score.fulltime.home < match.score.fulltime.away) {
          return (awayLose += 1)
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          return (awayDraw += 1)
        } else {
          return false
        }
      } else {
        if (match.score.fulltime.home < match.score.fulltime.away) {
          return (awayWin += 1)
        } else if (match.score.fulltime.home > match.score.fulltime.away) {
          return (awayLose += 1)
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          return (awayDraw += 1)
        } else {
          return false
        }
      }
    })
    total = homeWin + awayWin + homeDraw + awayDraw + homeLose + awayLose
    ratioHome = (100 * (homeWin + awayLose)) / total
    ratioAway = (100 * (homeLose + awayWin)) / total
    ratioDraw = (100 * (homeDraw + awayDraw)) / total
    if (ratioHome > ratioDraw && ratioHome > ratioAway) {
      winner = homeTeam.name
      winnerRatio = ratioHome
    } else if (ratioAway > ratioDraw && ratioAway > ratioHome) {
      winner = awayTeam.name
      winnerRatio = ratioAway
    } else {
      winner = "Draw"
      winnerRatio = ratioDraw
    }
  }

  return (
    <div className="card bg-body shadow-sm overflow-hidden">
      <div className="card-header">
        <div className="row">
          <div className="col fw-bold">Result</div>
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
      <div className="card-body col text-center bg-light bg-gradient">
        <div className="col mb-4">
          <div className="row">
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{homeWin}</div>
                  <div className="col-auto rounded bg-warning m-1 py-2 px-3 fw-bold">{homeDraw}</div>
                  <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{homeLose}</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-auto rounded bg-success m-1 py-2 px-3 fw-bold">{awayWin}</div>
                  <div className="col-auto rounded bg-warning m-1 py-2 px-3 fw-bold">{awayDraw}</div>
                  <div className="col-auto rounded bg-danger m-1 py-2 px-3 fw-bold">{awayLose}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="col-auto rounded p-2 bg-secondary bg-gradient text-center text-white">
            <div className="col fs-6">Best Result</div>
            <div className="col fs-1">{winner}</div>
            <div className="col fs-6">{winnerRatio && winnerRatio.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
