import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1111;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: ${props => props.show ? `flex` : `none`};
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  width: ${props => props.width ? `${props.width}` : `min(600px, 95%)`};
  height: ${props => props.height ? `${props.height}` : `800px`};
  background: #fff;
  border-radius: 5px;
  z-index: 122;
  position: absolute;
`

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  background: rgba(0,0,0, 0.5);
  z-index: 111;
  backdrop-filter: ${props => props.blurry ? `blur(1.5px)` : `unset`};
`

const Modal = ({
  children,
  width,
  height,
  onClose,
  show,
  blurry = false,
  ...rest
}) => {
  return (
    <Wrapper show={show}>
      <Body
        {...rest}
        height={height}
        width={width}>
        <Content>
          {children}
        </Content>
      </Body>
      <Backdrop
        blurry={blurry}
        onClick={onClose} />
    </Wrapper>
  )
}

export default Modal
