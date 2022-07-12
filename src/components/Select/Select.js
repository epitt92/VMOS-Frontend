
import React from 'react'
import CreatableSelect from 'react-select/creatable'
import Select, { components } from "react-select"
import styled from '@emotion/styled'

const SelectStyle = (background, border, hover, color, colorHover, colorSelected, backgroundSelected, custom) => {
  return{
    singleValue: (provided, { data }) => ({
      ...provided,
      color: custom ? `#212529` : `#fff`,
      // specify a fallback color here for those values not accounted for in the styleMap
    }),
    control: (base, state) => {
      return({
        ...base,
        backgroundColor: `${background}`,
        border: state.isFocused ? `1px solid ${border}` : 
          `1px solid ${border}`,
        borderRadius: '0.25rem',
        height: 'calc(1.5em + 0.75rem + 2px)',
        boxShadow: '0px 2px 3px rgb(39 52 67 / 6%)',
        '&:hover': {
          border: `1px solid ${border}`,
        },
        '&:focus': {
          border: `1px solid ${border}`,
        }
      })
    },
    dropdownIndicator: base => {
      return({
        ...base,
        color: custom ? `#212529` : `#fff`, // Custom colour
      })
    },
    option: (base, state) => {
      return({
        ...base,
        border: '0px',
        backgroundColor: state.isSelected && custom ? `${backgroundSelected}` : `${background}`,
        color: state.isSelected && custom ?  `${colorSelected}` : custom ? color : `#fff`,
        '&:hover': {
          backgroundColor: `${hover}`,
          color: custom ? `${colorHover}` : `#fff`
        },
      })
    },
    menu: base => {
      return({
        ...base,
        // override border radius to match the box
        borderRadius: '2px',
        backgroundColor: `${background}`,
        fontSize: '14px',
        // kill the gap
        marginTop: 0,
        border: '0px',
      })
    },
    menuList: base => {
      return({
        ...base,
        border: '0px',
        // kill the white space on first and last option
        padding: 0,
      })
    },
  }
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.margin ? `${props.margin}` : `0px`};;
  .custom-select__single-value{
    font-size: 14px;
  }
`

const Maxlimit = styled.div`
  height: 45px;
  font-weight: bold;
  font-size: 14px;
  color: rgb(41, 41, 41);
  display: flex;
  align-items: center;
  justify-content: center;
`

const SelectCustom = ({
  label,
  onChange,
  options, 
  formatOptionLabel,
  placeholder,
  multiple = false, 
  value,
  background = '#828BAE', 
  border = '#828BAE', 
  hover = '#717A9D',
  colorHover, 
  colorSelected,
  backgroundSelected,
  color = '#212529',
  margin,
  custom = false,
}) => {
  const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 10 ? (
          props.children
        ) : (
          <Maxlimit>Max limit achieved</Maxlimit>
        )}
      </components.Menu>
    );
  }

  const isValidNewOption = (inputValue, selectValue) => inputValue.length > 0 && selectValue.length < 10

  return(
    <Wrapper margin={margin}>
      {label}
      {
        multiple ?
        <CreatableSelect
          isMulti
          components={{
            IndicatorSeparator: () => null,
            Menu
          }}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          value={value}
          classNamePrefix="custom-select"
          isValidNewOption={isValidNewOption}
          styles={SelectStyle(background, border, hover, color, colorHover, colorSelected, backgroundSelected, custom)}
          instanceId="react-select"
        />
        :
        <Select
          components={{
            IndicatorSeparator: () => null,
          }}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          options={options}
          classNamePrefix="custom-select"
          styles={SelectStyle(background, border, hover, color, colorHover, colorSelected, backgroundSelected, custom)}
          instanceId="react-select"
        />
      }
    </Wrapper>
  )
}

export default SelectCustom
