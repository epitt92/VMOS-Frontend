import React from "react"
import styled from '@emotion/styled';
import { ItemStatus, DateLabel, PackerLabel, FlexBox } from "components";
import moment from "moment"


const PickingItem = ({ data, hideStatus, hideSeparator, onItemClick, noShadow }) => {

  const handleItemClick = () => {
    onItemClick && onItemClick(data)
  }

  return (
    <Root hideSeparator={hideSeparator} noShadow={noShadow}>
      <PickingHeader>
        <PickingTitle onClick={handleItemClick}>{data.name}</PickingTitle>
        {!hideStatus && <ItemStatus status={data.status.toLowerCase()}>{data.status.toLowerCase()}</ItemStatus>}
      </PickingHeader>
      <Text style={{ color: "black" }}>Customer: {data.customer}</Text>
      <DateLabelContainer>
        <DateLabel className="m-0">
          <span>Created:</span> <span>{moment(data.created_at).format("DD/MM/YYYY")}</span>
        </DateLabel>
        <DateLabel className="m-0">
          <span>Due:</span> <span>{moment(data.due_at).format("DD/MM/YYYY")}</span>
        </DateLabel>
        {data.packer && (
          <PackerLabel className="m-0">
            Packer: {data.packer}
          </PackerLabel>
        )}
      </DateLabelContainer>
      <FlexBox style={{ marginBottom: ".8rem", padding: 0, justifyContent: "flex-start", gap: "1rem" }}>
        <Text style={{ color: "black", marginBottom: 0 }}>#Ref: {data.ref}</Text>
        <Text style={{ color: "black", marginBottom: 0 }}>#Invoice Ref: {data.invoice_ref}</Text>
      </FlexBox>
      <Text style={{ color: "black" }}>#Customer PO Ref: {data.customer_po_ref}</Text>
      <Text>{data.description}</Text>
    </Root>
  );
};

const Root = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: none;
  background-color: white;
  box-shadow: ${props => props.noShadow ? "none" : "0px 1px 10px rgba(39, 52, 67, 0.08)"};
  margin-bottom: 2rem;

  @media screen and (min-width: 600px) {
    ${props => !props.hideSeparator && "border-bottom: 1px solid #e0e6ed;" }
    margin: 0.75rem 1.75rem;
    padding: 0;
    box-shadow: none;
  }
`;

const PickingHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 0.5rem;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const PickingTitle = styled.div`
  cursor: pointer;
`;

const DateLabelContainer = styled(FlexBox)`
  margin-bottom: .8rem;
  padding: 0;
  justify-content: center;
  gap: 1rem;
  @media screen and (min-width: 600px) {
    justify-content: flex-start;
  }
`


const Text = styled.p`
  color: #8492a5;
  font-weight: 600;
  font-size: 12px;
`;

export default PickingItem;
