function Section({
  children = null,
  title = '',
  subtitle = '',
}) {
  return (
    <div>
      {title ? (
        <h3>
          {title}
        </h3>
      ) : null}
      {subtitle ? (
        <p>
          {subtitle}
        </p>
      ) : null}
      {children ? (
        <div className="children">
          {children}
        </div>
      ) : null}
    </div>
  )
}


export default Section;