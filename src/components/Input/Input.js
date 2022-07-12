import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { checkValidExist } from 'helpers';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

const Text = styled.input`
  border: 1px solid ${props => (props.error ? `#d9534f` : `#D3DCE6`)};
  border-radius: 3px;
  min-height: 38px;
  display: inline-flex;
  min-width: ${props => (props.autoWidth ? 'auto' : '250px')};
  background: ${props => (props.error ? `rgba(251, 57, 51, 0.05)` : `#fff`)};
  box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
  padding: 0px 10px;
  &::placeholder {
    color: #8492a5;
  }
  &:focus {
    outline: 0;
    border: 1px solid #0083fc;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid ${props => (props.error ? `#d9534f` : `#D3DCE6`)};
  border-radius: 2px;
  min-height: 100px;
  display: inline-flex;
  min-width: 250px;
  background: ${props => (props.error ? `rgba(251, 57, 51, 0.05)` : `#fff`)};
  padding: 0px 10px;
  padding-top: 8px;
  resize: none;
  box-shadow: 0px 2px 3px rgb(39 52 67 / 6%);
  &:focus {
    outline: 0;
    border: 1px solid #0083fc;
  }
`;

const Input = ({ onChange, label, type, value, placeholder, error, className, ...rest }) => {
  return (
    <Wrapper style={rest.style}>
      {label}
      {type === 'textarea' ? (
        <Textarea
          onChange={onChange}
          type={type}
          value={value}
          error={error}
          className={className}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <Text
          onChange={onChange}
          type={type}
          value={value}
          error={error}
          className={className}
          placeholder={placeholder}
          {...rest}
        />
      )}
    </Wrapper>
  );
};

export default Input;
