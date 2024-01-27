import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, title, date, isFavorite} = appointmentDetails
  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const formatDate = format(date, 'dd MMMM yyyy, EEEE')
  const onClickFavoriteIcon = () => {
    const {toggleIsFavorite} = props
    toggleIsFavorite(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-date-container">
        <p className="title"> {title} </p>
        <p className="date"> {formatDate} </p>
      </div>
      <button type="button" className="star-btn" onClick={onClickFavoriteIcon} data-testid="star">
        <img src={starImgUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
