import React from "react"
import styled from '@emotion/styled';
import { Card } from "components/ui";

const StepCard = ({ data }) => {
  return (
    <Root>
      <StepCardTitle active={data.active}>
        <StepNumber active={data.active}><span>{data.number}</span></StepNumber>
        <span>{data.title}</span>
      </StepCardTitle>
      <Description active={data.active}>{data.description}</Description>
    </Root>
  )
}

const Root = styled(Card)`
  max-width: 264px;
  padding: 1rem;
`
const StepCardTitle = styled.h3`
  display: flex;
  gap: .5rem;
  align-items: center;
  padding-bottom: .8rem;
  border-bottom: 1px solid ${ props => props.active ? "#657ACB" : "#E0E6ED"};
  margin-bottom: .8rem;

  > span {
    font-size: 12px;
    color: ${props => props.active ? "#657ACB" : "#B0BBCB"};
  }
`

const StepNumber = styled.div`
  --size: 33px;
  background-color: red;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #657ACB;

  span {
    --size: 30px;
    border: 2px solid white;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    font-size: 12px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${props => {
    if (!props.active) {
      return `
        border: 1px solid #E0E6ED;
        background-color: #EBEFF5;

        span {
          border: none;
          color: #C2CBD8;
        }
      `
    }

  }}
`

const Description = styled.p`
  color: ${props => props.active ? "#8492A5": "#B0BBCB"};
  font-size: 12px;
`

export default StepCard;
