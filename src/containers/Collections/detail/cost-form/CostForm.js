import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, FlexBox, FloatingButton } from 'components';

const CostForm = ({ id, data, onSubmit, onRemove }) => {
  const [state, setState] = useState({
    description: data.description || '',
    cost: data.cost || '',
    ...data,
  });

  const dispatch = (name, value) => {
    setState({ ...state, [name]: value });
  };

  return (
    <Root>
      <FloatingButton onClick={() => onRemove(id)}>
        <img src="/static/images/icons/delete.svg" />
      </FloatingButton>
      <FormGroup style={{ padding: 0, margin: '0' }}>
        <Input
          autoWidth={true}
          required="required"
          required="required"
          placeholder="Cost description"
          value={state.description}
          onChange={e => dispatch('description', e.target.value)}
          name="cost-description"
          title="Cost description"
        />
      </FormGroup>

      <FormGroup style={{ marginTop: '1rem' }}>
        <Input
          autoWidth={true}
          required="required"
          placeholder="Cost amount"
          value={state.cost}
          onChange={e => dispatch('cost', e.target.value)}
          name="amount"
          title="Cost amount"
          style={{ width: !data.id ? '100%' : '169px' }}
        />

        <Button onClick={() => onSubmit(id, state)} variant="primary" size="medium">
          {data.id ? 'Update' : 'Save'}
        </Button>
      </FormGroup>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  background: #f6f7f9;
  border: 1px solid #ebeff5;
  border-radius: 3px;
  padding: 1.5rem;
`;

const FormGroup = styled(FlexBox)`
  padding: 0;
  gap: 1rem;

  > div {
    width: 100%;
    margin-bottom: 0;
  }

  input[type='text'] {
    min-width: auto;
  }
`;

export default CostForm;
