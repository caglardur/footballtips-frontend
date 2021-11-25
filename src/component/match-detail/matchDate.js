const MatchDate = ({ matchDate }) => {
  return (
    <div className="col mb-4 fs-6 d-flex justify-content-center text-secondary">
      <div className="row">
        <div className="col-auto p-0">
          {matchDate.getDate()}.{matchDate.getMonth() + 1}.{matchDate.getFullYear()}
        </div>
        <div className="col-auto">-</div>
        <div className="col-auto p-0">
          {matchDate.getHours() > 9 ? matchDate.getHours() : "0" + matchDate.getHours()}:{matchDate.getMinutes() > 9 ? matchDate.getMinutes() : "0" + matchDate.getMinutes()}
        </div>
      </div>
    </div>
  )
}

export default MatchDate
