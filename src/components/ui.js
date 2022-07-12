import styled from '@emotion/styled';

export const Title = styled.h5`
  font-size: 16px;
  color: #657acb;
  font-family: 'OpenSans Bold';
  display: inline-block;
  position: relative;
  margin-bottom: 2rem;
  &:before {
    content: '';
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: #657acb;
    position: absolute;
    display: block;
    bottom: -10px;
  }
`;

export const BoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e6ed;
  > b {
    font-size: 1rem;
  }
  ${props => props.topBorder && 'border-top: 1px solid #e0e6ed;'}

  @media screen and (min-width: 600px) {
    padding: 0.75rem 1.75rem;
  }
`;

export const Breadcrumbs = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #8492a5;
`;

export const HeadingDetailTitle = styled.h2`
  font-size: 18px;
  color: #3b4857;
  font-family: 'OpenSans Bold';
  display: inline-block;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  input[type='radio'] {
    display: none;

    &:checked + label::before {
      background: #fff;
      border: 1px solid #657acb;
    }
    &:checked + label::after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export const StatusBadgeBase = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  cursor: pointer;
  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 50%;
    border-radius: 100%;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &::before {
    left: 0;
    width: 16px;
    height: 16px;
    margin-top: -8px;
    background: #fff;
    border: 1px solid #b0bbcb;
  }
  &:hover::before {
    background: #fff;
  }
  &::after {
    opacity: 0;
    left: 4.2px;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    background: #657acb;
    -webkit-transform: scale(2);
    transform: scale(2);
  }
`;

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;
  width: 100%;
`;

export const StatusBadge = styled(StatusBadgeBase)`
  span {
    border-radius: 30px;
    padding: 2px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
    ${props => {
      switch (props.status) {
        case 'accepted':
          return `
            color: #4CABE0;
            background:rgba(76, 171, 224, 0.3);
            border: 1px solid #4CABE0;
          `;
        case 'acknowledged':
          return `
            color: #A56FDC;
            background:rgba(165, 111, 220, 0.3);
            border: 1px solid #A56FDC;
          `;
        case 'purchased':
          return `
            color: #F8678A;
            background: rgba(248, 103, 138, 0.3);
            border: 1px solid #F8678A;
          `;
        case 'canceled':
          return `
            color: #79B616;
            background: rgba(121, 182, 22, 0.3);
           border: 1px solid #79B616;
           `;
        case 'preprocessing':
          return `
            color: #ABA510;
            background-color: rgba(171, 165, 16, 0.3);
            border: 1px solid #ABA510;
           `;
        case 'processing':
          return `
            color: #DCA517;
            background-color: rgba(220, 165, 23, 0.3);
            border: 1px solid #DCA517;
           `;
        case 'packed':
          return `
            color: #FFFFFF;
            background-color: #A56FDC;
            border: 1px solid #A56FDC;
            `;
        default:
          return `
            padding-left: 0;
            font-size: 14px;
          `;
      }
    }}
  }
`;

export const ItemStatus = styled.div`
  text-transform: capitalize;
  padding: 2px 8px;
  border-radius: 24px;
  color: white;
  text-align: center;
  ${props => {
    switch (props.status) {
      case 'accepted':
        return `
            background: #4CABE0;
          `;
      case 'acknowledged':
        return `
            background: #A56FDC;
          `;
      case 'purchased':
        return `
            background: #F8678A;
          `;
      case 'cancelled':
        return `
            background: #f46b59;
          `;
      case 'preprocessing':
        return `
            background: #ABA510;
          `;
      case 'processing':
        return `
            background: #DCA517;
          `;
      case 'packed':
        return `
            background: #A56FDC;
          `;
      case 'added':
        return `
            background: rgba(61, 179, 108, .3);
            color: #3DB36C;
          `;
    }
  }}
`;

export const DateLabel = styled.div`
  border-radius: 3px;
  background: #ebeff5;
  padding: 7px 12px;
  color: black;
  margin: 1rem 0;
  width: max-content;
  text-align: center;
  width: 100%;

  span:first-of-type {
    color: #8492a5;
    display: block;
  }

  @media screen and (min-width: 600px) {
    width: max-content;
    span:first-of-type {
      display: inline;
    }
  }
`;

export const PackerLabel = styled.div`
  border-radius: 3px;
  padding: 7px 12px;
  color: #a56fdc;
  margin: 1rem 0;
  width: max-content;
  border: 1px solid #d3dce6;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
`;

export const Line = styled.div`
  display: block;
  height: 1px;
  background-color: #e0e6ed;
`;

export const GridBox = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  display: grid;
  grid-template-columns: repeat(${props => props.rowItems || 3}, 1fr);
  width: 100%;
`;

export const Placeholder = styled.div`
  border: 2px dashed #e0e6ed;
  border-radius: 3px;
  color: #657acb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 43px;
  cursor: pointer;
`;

export const FloatingButton = styled.button`
  --size: 24px;
  border: 1px solid #d3dce6;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: white;
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 7.5px;
    height: 7.5px;
  }
`;

export const PageBody = styled.div`
  padding: 30px;

  @media screen and (min-width: 600px) {
    padding: 0;
  }
`;
