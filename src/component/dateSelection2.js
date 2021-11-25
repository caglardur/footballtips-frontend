import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { newDate, thatDate } from "../redux/set-date"

const DateSelection2 = () => {
  const matchDate = useSelector(thatDate)
  const dispatch = useDispatch()
  const toDay = new Date(matchDate)
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const newDateFunction = i => {
    toDay.setDate(toDay.getDate() + i)
    dispatch(newDate(toDay.getFullYear() + "-" + (toDay.getMonth() + 1 > 9 ? toDay.getMonth() + 1 : "0" + toDay.getMonth() + 1) + "-" + (toDay.getDate() > 9 ? toDay.getDate() : "0" + toDay.getDate())))
  }

  return (
    <div className="row mt-4">
      <div type="button" className="btn col-auto bg-dark my-2 mx-1 material-icons md-24 p-0 text-white" onClick={() => newDateFunction(-1)}>
        arrow_left
      </div>
      <div className="col col-auto bg-white text-black lh-1" style={{ fontSize: "16px", fontWeight: "normal" }}>
        <div className="row text-secondary pt-2 mt-1">
          {window.innerWidth > 500 && (
            <div className="col-auto align-middle pe-0">
              <div className="material-icons md-16">today</div>
            </div>
          )}
          <div className="col-auto">
            {toDay.getDate() < 10 ? "0" + toDay.getDate() : toDay.getDate()} {month[toDay.getMonth() > 11 ? toDay.getMonth() - 12 : toDay.getMonth()]}.
          </div>
        </div>
      </div>
      <div type="button" className="btn col-auto bg-dark my-2 mx-1 material-icons md-24 p-0 text-white" onClick={() => newDateFunction(+1)}>
        arrow_right
      </div>
    </div>
  )
}

export default DateSelection2
