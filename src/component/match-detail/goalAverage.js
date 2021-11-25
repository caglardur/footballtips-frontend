const GoalAverage = ({ homeLastMatches, awayLastMatches, homeTeam, awayTeam }) => {
  const homeLastSixMatches = homeLastMatches && homeLastMatches.slice(0, 6)
  const awayLastSixMatches = awayLastMatches && awayLastMatches.slice(0, 6)

  let homeScoredGoal = 0
  let homeConcedeGoal = 0
  let averageHomeScoredGoal = 0
  let averageHomeConcedeGoal = 0

  let awayScoredGoal = 0
  let awayConcedeGoal = 0
  let averageAwayScoredGoal = 0
  let averageAwayConcedeGoal = 0

  let homeCombine = 0
  let awayCombine = 0

  let ratioHome = 0,
    ratioAway = 0,
    ratioScore = 0,
    score

  if (homeLastSixMatches && awayLastSixMatches) {
    homeLastSixMatches.map(match => {
      if (match.teams.home.id === homeTeam.id) {
        homeScoredGoal += match.score.fulltime.home
        return (homeConcedeGoal += match.score.fulltime.away)
      } else {
        homeScoredGoal += match.score.fulltime.away
        return (homeConcedeGoal += match.score.fulltime.home)
      }
    })
    averageHomeScoredGoal = homeScoredGoal / homeLastSixMatches.length
    averageHomeConcedeGoal = homeConcedeGoal / homeLastSixMatches.length

    awayLastSixMatches.map(match => {
      if (match.teams.home.id === awayTeam.id) {
        awayScoredGoal += match.score.fulltime.home
        return (awayConcedeGoal += match.score.fulltime.away)
      } else {
        awayScoredGoal += match.score.fulltime.away
        return (awayConcedeGoal += match.score.fulltime.home)
      }
    })
    averageAwayScoredGoal = awayScoredGoal / awayLastSixMatches.length
    averageAwayConcedeGoal = awayConcedeGoal / awayLastSixMatches.length

    homeCombine = (averageHomeScoredGoal + averageAwayConcedeGoal) / 2
    awayCombine = (averageHomeConcedeGoal + averageAwayScoredGoal) / 2
    score = Math.round(homeCombine) + ":" + Math.round(awayCombine)
    ratioHome = Math.abs(Math.round(homeCombine) - homeCombine) * 100
    ratioAway = Math.abs(Math.round(awayCombine) - awayCombine) * 100
    ratioScore = ((100 - ratioHome) * (100 - ratioAway)) / 100
  }

  return (
    <div className="card bg-body shadow-sm overflow-hidden">
      <div className="card-header">
        <div className="row">
          <div className="col fw-bold">Goal Average</div>
          <div className="col-auto">
            <div className="row">
              <div className="col bg-success rounded"></div>
              <div className="col">Scored</div>
              <div className="col bg-danger rounded"></div>
              <div className="col">Conceded</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col card-body bg-light bg-gradient">
        <div className="row">
          <div className="col-lg mb-4">
            <div className="row">
              <div className="col">
                <div className="col mb-2 fs-6 text-center">{homeTeam && homeTeam.name}</div>
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-auto rounded bg-success m-1 p-2 fw-bold">{averageHomeScoredGoal.toFixed(2)}</div>
                  <div className="col-auto rounded bg-danger m-1 p-2 fw-bold">{averageHomeConcedeGoal.toFixed(2)}</div>
                </div>
              </div>
              <div className="col">
                <div className="col mb-2 fs-6 text-center">{awayTeam && awayTeam.name}</div>
                <div className="row text-white d-flex justify-content-center">
                  <div className="col-auto rounded bg-success m-1 p-2 fw-bold">{averageAwayScoredGoal.toFixed(2)}</div>
                  <div className="col-auto rounded bg-danger m-1 p-2 fw-bold">{averageAwayConcedeGoal.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="col-auto rounded p-2 bg-secondary bg-gradient text-center text-white">
            <div className="col fs-6">Best Score</div>
            <div className="col fs-1">{score}</div>
            <div className="col fs-6">{ratioScore.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalAverage
