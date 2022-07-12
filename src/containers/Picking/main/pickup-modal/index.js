import React from "react"
import styled from '@emotion/styled';
import PickingItem from "../../components/PickingItem";
import { Button, FlexBox, FloatingButton } from "components"

const PickupModal = (props) => {
  return (
    <ModalContainer>
      <CloseButton onClick={props.onClose}>
        <img src="/static/images/icons/close.svg" />
      </CloseButton>
      <Box>
        <Title>Start Picking For Order?</Title>
      </Box>
      <ModalBody>
        <PickingItem data={props.data} />
      </ModalBody>

      <FlexBox style={{ margin: "1.5rem 0 .5rem", justifyContent: "center", gap: "1rem" }}>
        <Button
          style={{ minWidth: "150px" }}
          variant="primary-outline"
          onClick={props.onClose}
          size="medium">
          No
        </Button>
        <Button
          size="medium"
          style={{ minWidth: "150px" }}
          variant="primary"
          onClick={() => {
            props.onConfirm()
            props.onClose()
          }}
        >
          Yes
        </Button>
      </FlexBox>
    </ModalContainer>
  )
}

const CloseButton = styled(FloatingButton)`
  border: none;
  top: 10px;
  right: 15px;

  img {
    width: 14px;
    height: 14px;
  }
`

const ModalContainer = styled.div`
  position: relative;
  padding: 1.5rem 0;
  width: min(600px, 95%);
`

const Box = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
`

const ModalBody = styled.div`
display: none;
@media screen and (min-width:600px) {
  display: block;
}
`

const Title = styled.div`
text-align: center;
font-size: 18px;
padding-top: 0;
padding-bottom: 1.5rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  margin-bottom: 1.5rem;
  border-bottom: none;

  @media screen and (min-width: 600px) {
    border-bottom: 1px solid #E0E6ED;
  }
`

export default PickupModal
