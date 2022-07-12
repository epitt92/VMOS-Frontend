import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: relative;
  .checkbox{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }
  #toggle {
    border-radius: 100px;
    .layer{
      border-radius: 100px;
      width: 100%;
      border: 1px solid #B0BBCB;
      background-color: #B0BBCB;
      transition: 0.3s ease all;
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    position: relative;
    top: 50%;
    width: 48px;
    height: 24px;
    .knobs{
      &:before{
        content: '';
        position: absolute;
        top: 3px;
        left: 4px;
        width: 18px;
        height: 18px;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        line-height: 1;
        background-color: #FFFFFF;
        border-radius: 50%;
        transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
        z-index: 2;
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
      }
    }
    .checkbox:checked + .knobs:before{
      content: '';
      left: 27px;
      background-color: #fff;
    }
    .checkbox:checked ~ .layer{
      background-color: #657ACB;
      border: 1px solid #657ACB;
    }
    .knobs, .knobs:before, .layer{
      transition: 0.3s ease all;
    }
  }
`

const Toggle = ({value, onChange}) => {
  return(
    <Wrapper>
      <div id="toggle">
          <input
            checked={value}
            onChange={onChange} 
            type="checkbox" 
            className="checkbox"
          />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </Wrapper>
  )
}
export default Toggle
