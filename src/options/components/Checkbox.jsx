function Checkbox({
  checked = false,
  onChange = () => { },
  value = '',
  label = ''
}) {

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  )
}


export default Checkbox;