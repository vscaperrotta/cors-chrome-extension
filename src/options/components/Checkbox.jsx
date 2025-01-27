function Checkbox({
  checked = false,
  onChange = () => { },
  value = '',
  label = ''
}) {
  return (
    <div className='checkbox__container'>
      <label className='checkbox__label'>
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