const MatchDetail = ({ matches }) => {
  return (
    <div className="card rounded-0">
      <div className="card-header">Match Detail</div>
      {matches ? (
        <div className="card-body" style={{ height: window.innerHeight - 130, overflow: "auto" }}>
          <div className="row">
            <div className="col">
              <div className="card border-0">
                <img src={matches[0].teams.home.logo} className="img-fluid" alt={matches[0].teams.home.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{matches[0].teams.home.name}</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0">
                <img src={matches[0].teams.away.logo} className="img-fluid" alt={matches[0].teams.away.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{matches[0].teams.away.name}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-border mx-auto my-4  text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  )
}

export default MatchDetail
