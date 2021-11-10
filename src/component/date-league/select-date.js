import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { newDate, thatDate } from "../../redux/set-date"

const SelectDate = () => {
  const matchDate = useSelector(thatDate)
  const dispatch = useDispatch()
  const toDay = new Date()
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let week = []

  for (let i = -2; i < 3; i++) {
    week.push(
      <button type="button" className={matchDate.getDate() === toDay.getDate() + i ? "col mx-1 px-1 btn btn-primary" : "col mx-1 px-1 btn btn-secondary"} key={i} onClick={() => dispatch(newDate(toDay.setDate(toDay.getDate() + i)))}>
        <div className="col fs-3">{toDay.getUTCDate() + i < 10 ? "0" + (toDay.getUTCDate() + i) : toDay.getUTCDate() + i} </div>
        <div className="col">{month[toDay.getUTCMonth() > 11 ? toDay.getUTCMonth() - 12 : toDay.getUTCMonth()]}</div>
      </button>
    )
  }

  return (
    <div className="card">
      <div className="card-header">Date Picker</div>
      <div className="card-body">
        <div className="row">{week.map(day => day)}</div>
      </div>
    </div>
  )
}

export default SelectDate
