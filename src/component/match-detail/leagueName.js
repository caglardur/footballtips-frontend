const LeagueName = ({ league }) => {
  return (
    <div className="row">
      <div className="col-auto">
        <img src={league.flag || "/world.png"} className="mb-2" alt={league.country} style={{ height: "18px" }} />
      </div>
      <div className="col-auto p-0">{league.country}</div>
      <div className="col-auto p-0">
        <span className="material-icons md-18">chevron_right</span>
      </div>
      <div className="col-auto p-0">{league.name}</div>
    </div>
  )
}

export default LeagueName
