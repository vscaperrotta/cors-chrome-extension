function Section({
  children = null,
  title = null,
  subtitle = null,
}) {
  return (
    <div className="section__container">
      {title !== null ? (
        <h2 className="section__title">
          {title}
        </h2>
      ) : null}
      {subtitle !== null ? (
        <p className="section__subtitle" >
          {subtitle}
        </p>
      ) : null}
      {children ? (
        <div className="children">
          {children}
        </div>
      ) : null}
    </div >
  )
}


export default Section;