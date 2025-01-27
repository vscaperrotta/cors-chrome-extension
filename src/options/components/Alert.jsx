function Alert({
  message = '',
  active = false
}) {

  return (
    <div className={`alert__container ${active ? 'active' : ''}`}>
      <p className="alert__message">
        {message}
      </p>
    </div>
  )
}

export default Alert;