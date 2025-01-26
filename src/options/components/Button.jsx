function Button({
  onChange = () => { },
  label = ''
}) {

  return (
    <button onChange={onChange}>
      {label}
    </button>
  )
}

export default Button;