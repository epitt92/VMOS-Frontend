import React from 'react';
import styled from '@emotion/styled'
import Loading from 'components/Loading/Loading';

const PageLoadingContext = React.createContext(
  {}
);

export const PageLoadingProvider = (props) => {
  const [open, setOpen] = React.useState(false);

  const showPageLoading = () => {
    setOpen(true);
  };

  const closePageLoading = () => {
    setOpen(false);
  };

  return (
    <PageLoadingContext.Provider
      value={{
        showPageLoading,
        closePageLoading,
      }}
    >
      <PageLoading
        show={open}
        onClose={closePageLoading}
      />
      {open ? (
        <Container>
          <h1>PLEASE WAIT A MOMENT</h1>
          <Loading style={{width: "100px", height: "100px", borderWidth: "10px"}} />
        </Container>
      ) : props.children}
    </PageLoadingContext.Provider>
  );
};

export const usePageLoading = () => React.useContext(PageLoadingContext);


const PageLoading = styled.div`
  display: ${props => props.show ? "block" : "none"};
  position: absolute;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  margin-top: 10vh;
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: rgba(101, 122, 203, 1);
    font-size: 12px;
  }
`
