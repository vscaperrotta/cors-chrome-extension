function Button({
  onClick = () => { },
  label = '',
  contained = false,
  outlined = false,
}) {

  return (
    <button
      className={`
        button__container
        ${contained ? 'contained' : ''}
        ${outlined ? 'outlined' : ''}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button;