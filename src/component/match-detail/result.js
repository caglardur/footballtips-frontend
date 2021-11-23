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
    total = 0

  if (homeLastSixMatches && awayLastSixMatches) {
    homeLastSixMatches.map(match => {
      if (match.teams.home.id === homeTeam.id) {
        if (match.score.fulltime.home > match.score.fulltime.away) {
          homeWin += 1
        } else if (match.score.fulltime.home < match.score.fulltime.away) {
          homeLose += 1
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          homeDraw += 1
        }
      } else {
        if (match.score.fulltime.home < match.score.fulltime.away) {
          homeWin += 1
        } else if (match.score.fulltime.home > match.score.fulltime.away) {
          homeLose += 1
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          homeDraw += 1
        }
      }
    })
    awayLastSixMatches.map(match => {
      if (match.teams.home.id === awayTeam.id) {
        if (match.score.fulltime.home > match.score.fulltime.away) {
          awayWin += 1
        } else if (match.score.fulltime.home < match.score.fulltime.away) {
          awayLose += 1
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          awayDraw += 1
        }
      } else {
        if (match.score.fulltime.home < match.score.fulltime.away) {
          awayWin += 1
        } else if (match.score.fulltime.home > match.score.fulltime.away) {
          awayLose += 1
        } else if (match.score.fulltime.home === match.score.fulltime.away) {
          awayDraw += 1
        }
      }
    })
    total = homeWin + awayWin + homeDraw + awayDraw + homeLose + awayLose
    ratioHome = (100 * (homeWin + awayLose)) / total
    ratioAway = (100 * (homeLose + awayWin)) / total
    ratioDraw = (100 * (homeDraw + awayDraw)) / total
  }

  return (
    <div className="card border-success">
      <div className="card-header">
        <div className="row">
          <div className="col">Result</div>
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
      <div className="card-body row text-center">
        <div className="col-lg">
          <div className="row">
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Win</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-success m-1 py-2 px-3">{homeWin}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Draw</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-warning m-1 py-2 px-3">{homeDraw}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Lose</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-danger m-1 py-2 px-3">{homeLose}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Win</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-success m-1 py-2 px-3">{awayWin}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Draw</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-warning m-1 py-2 px-3">{awayDraw}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Lose</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-danger m-1 py-2 px-3">{awayLose}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg">
          <div className="row">
            <div className="col">
              <div className="col mb-2 fs-6 text-center">Combination</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">{homeTeam && homeTeam.name}</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-secondary m-1 py-2 px-3">{homeWin + awayLose}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Draw</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-warning m-1 py-2 px-3">{homeDraw + awayDraw}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">{awayTeam && awayTeam.name}</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-secondary m-1 py-2 px-3">{homeLose + awayWin}</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col mb-2 fs-6 text-center">Percent</div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">{homeTeam && homeTeam.name}</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-secondary m-1 p-2">{ratioHome > 9 ? ratioHome.toFixed(0) : "0" + ratioHome.toFixed(0)} %</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">Draw</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-warning m-1 p-2">{ratioDraw > 9 ? ratioDraw.toFixed(0) : "0" + ratioDraw.toFixed(0)} %</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-6 text-black text-end my-1 p-2">{awayTeam && awayTeam.name}</div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-auto rounded bg-secondary m-1 p-2">{ratioAway > 9 ? ratioAway.toFixed(0) : "0" + ratioAway.toFixed(0)} %</div>
                      <div className="col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
