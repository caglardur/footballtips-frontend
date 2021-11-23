const FinalScore = ({ goals }) => {
  return (
    <div className="row fs-2 fw-bold">
      <div className="col-md-auto ">{goals.home}</div>
      <div className="col-md-auto p-0">:</div>
      <div className="col-md-auto">{goals.away}</div>
    </div>
  )
}

export default FinalScore
