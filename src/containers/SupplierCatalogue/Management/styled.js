import styled from '@emotion/styled';

export const ManagementContainer = styled.div`
  > .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #657acb;
  }

  > .body {
    margin-top: 24px;

    display: flex;
    flex-direction: row;
    gap: 24px;
  }
`;

export const ProductList = styled.div`
  flex: 1;
  height: 978px;

  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;

  > .header {
    padding: 20px 28px;
    background: #717a9d;

    > .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #ffffff;
    }

    > .search {
      margin-top: 24px;

      > .label {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
      }

      > .search-input {
        position: relative;
        margin-top: 8px;

        > img {
          position: absolute;
          top: 10px;
          left: 12px;
        }

        > input {
          width: 100%;
          height: 36px;

          padding: 8px 12px 8px 33px;

          background: #828bae;
          box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
          border-radius: 3px;
          border: none;
          outline: none;

          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          color: #ffffff;
          opacity: 0.4;

          ::placeholder {
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
          }
        }
      }
    }
  }

  > .list {
    > .header {
      padding: 14px 8px;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      > span {
        margin-left: 20px;

        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #3b4857;
      }
    }

    > .body {
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 4px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #e0e6ed;
        border-radius: 11px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #b0bbcb;
        border-radius: 11px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
`;

export const ProductItem = styled.div`
  margin-top: 5px;
  /* margin-bottom: 10px; */
  padding: 20px 28px 25px 28px;

  background: #fff;

  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #e0e6ed;

  cursor: pointer;

  :hover {
    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.23);
    /* border-bottom: none; */
  }

  > .action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    cursor: pointer;

    > .edit {
      display: flex;
      flex-direction: row;
      width: 120px;
      gap: 10px;
      align-items: center;

      > span {
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #3b4857;
      }
    }

    > .download {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5px;

      cursor: pointer;

      width: 152px;
      height: 31px;

      border: 1px solid #d3dce6;
      border-radius: 3px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #657acb;
    }
  }

  > .name {
    margin-top: 10px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  > button {
    margin-top: 16px;

    padding: 7px 12px;

    background: #ebeff5;
    border-radius: 3px;
    border: none;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
    width: 92px;

    > span {
      margin-right: 2px;
      color: #8492a5;
    }
  }
`;
