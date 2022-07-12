import React from "react"
import styled from '@emotion/styled';

const InputCounter = ({ onChange, value }) => {
  return (
    <Root>
      <CounterButton onClick={() => onChange(value-1)}>
        <img src="/static/images/icons/qty-minus.svg" />
      </CounterButton>
      <InputField type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      <CounterButton onClick={() => onChange(value+1)}>
        <img src="/static/images/icons/qty-plus.svg" />
      </CounterButton>
    </Root>
  )
}

const Root = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
height: 32px;
background: #FFFFFF;
color: black;
font-size: 12px;
border: 1px solid #D3DCE6;
text-align: center;
box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
border-radius: 3px;
`

const InputField = styled.input`
width: 30px;
border: none;
outline: none;
background: none;
text-align: center;
`

const CounterButton = styled.button`
color: #3B4857;
border: none;
outline: none;
background: none;
font-size: 14px;
`
export default InputCounter
