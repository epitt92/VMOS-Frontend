import styled from '@emotion/styled';

const Button = styled.button`
  font-size: ${props => props.size === "medium" ? "14px" : "12px"};
  padding: .5em 1em;
  border-radius: 3px;
  box-sizing: border-box;

  img {
    margin-${props => props.addonRight ? "left" : "right"}: .5rem;,
  }

  outline: 0;
  border: none;
  
  ${props => props.variant === "primary-outline" && ButtonPrimaryOutline}
  ${props => props.variant === "primary" && ButtonPrimary}

  ${props => props.variant === "danger-outline" && ButtonDangerOutline}

  ${props => props.variant === "outline" && ButtonOutline}
  ${props => props.variant === "secondary" && ButtonSecondary}
  ${props => props.variant === "primary-plain" && ButtonPrimaryPlain}

`;

const ButtonPrimaryOutline = `
  color: #657ACB;
  border: 1px solid #D3DCE6;
  background: none;
  
  &:hover {
    color: #657ACB;
    background-color: #F6F7F9;
  }
`

const ButtonDangerOutline = `
  color: #F46B59;
  background-color: rgba(244, 107, 89, 0.3);
  border: 1px solid #FCC4BD;
`

const ButtonPrimary = `
  background-color: #657ACB;
  border-color: #657ACB;
  color: white;

  &:hover {
    background-color: #7c8ed3;
    border-color: #7487d0;
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(86 104 173 / 50%);
}

  }
`

const ButtonOutline = `
  border: 1px solid rgba(132, 141, 176, 1);
  color: white;
  background: none;

  box-shadow: 0px 2px 3px 0px rgba(39, 52, 67, 0.06);
`

const ButtonPrimaryPlain = `
  color: #657ACB;
  background: none;
  border: none;

  &:disabled {
  background: #EBEFF5;
  color: #8492A5;
  }
`


const ButtonSecondary = `
  color: #657ACB;
  background: #E2E8FF;
  border: 1px solid #E2E8FF;

  &:disabled {
  background: #EBEFF5;
  color: #8492A5;
  }
`

export default Button
