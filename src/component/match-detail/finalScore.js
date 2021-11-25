const FinalScore = ({ goals }) => {
  return (
    <div className="row fs-2 fw-bold justify-content-center">
      <div className="col-auto ">{goals.home}</div>
      <div className="col-auto p-0">:</div>
      <div className="col-auto">{goals.away}</div>
    </div>
  )
}

export default FinalScore
