import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'

const SelectAsync = ({
  inputValue,
  onInputChange,
  loadOptions,
  onChange,
  open = false,
  onBlur,
}) => {
  return(
    <AsyncSelect
      inputValue={inputValue}
      onInputChange={onInputChange}
      loadOptions={loadOptions}
      onChange={onChange}
      onBlur={onBlur}
      noOptionsMessage={() => null}
      blurInputOnSelect={true}
      closeMenuOnSelect={true}
      defaultOptions={[]}
      cacheOptions={true}
    />
  )
}

export default SelectAsync
