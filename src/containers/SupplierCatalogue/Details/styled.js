import styled from '@emotion/styled';

export const DetailsDesktop = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: none;
  }

  > .header {
    display: flex;
    flex-direction: column;

    > .line {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #8492a5;

      > .order {
        cursor: pointer;
      }
    }

    > .title {
      margin-top: 12px;

      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      color: #3b4857;
    }
  }
`;

export const DetailsBody = styled.div`
  margin-top: 24px;

  padding-bottom: 30px;

  background: #ffffff;
  /* bg white */

  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;

  > .header {
    margin-top: 7px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > .text {
      margin-left: 29px;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #3b4857;
    }

    > .button {
      margin-right: 30px;

      display: flex;
      flex-direction: row;
      column-gap: 10px;

      > button {
        padding: 7px 12px;
        border-radius: 3px;
        /* opacity: 0.4; */
        fill-opacity: 0.4;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */

        text-align: center;
      }

      > .processing {
        background: rgba(220, 165, 23, 0.3);
        border: 1px solid #dca517;

        color: #dca517;
      }

      > .delivery {
        background: rgba(61, 179, 108, 0.3);
        border: 1px solid #3db36c;

        color: #3db36c;
      }

      > .complete {
        border: 1px solid #79b616;
        background: rgba(121, 182, 22, 0.3);

        color: #79b616;
      }

      > .void {
        background: rgba(151, 134, 132, 0.3);
        border: 1px solid #978684;

        color: #978684;
      }
    }
  }

  > .body {
    padding: 0px 29px;

    display: flex;
    flex-direction: column;

    > .body-header {
      display: flex;
      flex-direction: row;
      align-items: center;

      > .title {
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;

        color: #3b4857;
      }

      > .type {
        margin-left: 30px;
        padding: 2px 8px;

        background: #7591f4;
        border-radius: 24px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #ffffff;
        text-transform: capitalize;

        &.submitted {
          background: #7591f4;
        }
        &.processing {
          background: #dca517;
        }
        &.readyfordelivery {
          background: #3db36c;
        }
        &.complete {
          background: #79b616;
        }
        &.void {
          background: #978684;
        }
      }
    }

    > .customer {
      margin-top: 8px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #3b4857;
    }

    > .saleperson {
      margin-top: 12px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #3b4857;
    }

    > .date {
      margin-top: 16px;

      display: flex;
      flex-direction: row;
      column-gap: 8px;

      > .item {
        padding: 7px 12px;

        background: #ebeff5;
        border-radius: 3px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        > .type {
          color: #8492a5;
        }

        > .value {
          margin-left: 2px;

          color: #3b4857;
        }
      }
    }

    > .ref {
      margin-top: 16px;

      display: flex;
      flex-direction: row;
      column-gap: 13px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > .customer-poref {
      margin-top: 12px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > .description {
      margin-top: 12px;

      font-weight: 600;
      font-size: 11px;
      line-height: 160%;
      color: #8492a5;
    }
  }

  > .tab {
    margin-left: 28px;

    display: flex;
    flex-direction: row;
    column-gap: 28px;

    > .item {
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #b0bbcb;

      cursor: pointer;
    }

    > .active {
      color: #657acb;
    }
  }

  > .tab-content {
    > .item-table {
      margin-top: 12px;

      display: flex;
      flex-direction: column;
      align-items: center;

      position: relative;

      > .header {
        position: absolute;
        background: #ebeff5;
        width: 100%;
        height: 33px;
        z-index: 1;
      }

      > .altsku-header {
        display: flex;
        align-items: center;
        column-gap: 134px;

        height: 33px;

        background: #ebeff5;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */

        text-align: center;

        /* grey/1 */
        z-index: 2;

        color: #3b4857;
      }

      > .footer {
        background: #ebeff5;
        width: 100%;
        height: 65px;

        padding-right: 6vw;

        display: flex;
        flex-direction: row;
        column-gap: 50px;
        justify-content: flex-end;
        align-items: center;

        font-weight: 700;
        font-size: 18px;
        line-height: 25px;

        color: #3b4857;

        span {
          margin-right: 12px;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #3b4857;
          text-align: right;
        }
      }
    }

    > .alt-skus {
      margin-top: 12px;
      > .header {
        padding-left: 30px;

        display: flex;
        align-items: center;
        column-gap: 174px;

        height: 33px;

        background: #ebeff5;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        /* identical to box height */

        text-align: center;

        /* grey/1 */

        color: #3b4857;
      }

      > .body {
        margin-top: 14px;
        padding-left: 30px;
        padding-right: 30px;

        display: flex;
        flex-direction: column;

        > .altSkus-header {
          /* margin-bottom: 16px; */

          display: flex;
          flex-direction: row;
          column-gap: 120px;

          font-weight: 700;
          font-size: 14px;
          line-height: 19px;
          color: #3b4857;
          > span {
            width: 120px;
          }
        }

        > .products {
          margin-top: 16px;

          display: flex;
          flex-direction: row;
          column-gap: 120px;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #8492a5;

          > span {
            width: 120px;
          }
        }
      }

      > .footer {
        background: #ebeff5;
        width: 100%;
        height: 65px;

        padding-right: 6vw;

        display: flex;
        flex-direction: row;
        column-gap: 50px;
        justify-content: flex-end;
        align-items: center;

        font-weight: 700;
        font-size: 18px;
        line-height: 25px;

        color: #3b4857;

        span {
          margin-right: 12px;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #3b4857;
          text-align: right;
        }
      }
    }
  }

  > .remarks {
    margin-top: 20px;
    margin-left: 42px;
    margin-right: 60px;

    position: relative;

    height: 148px;

    background: #ffffff;

    border: 1px solid #d3dce6;

    box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
    border-radius: 3px;

    > button {
      padding: 7px 24px;

      position: absolute;
      top: 100px;
      right: 18px;

      background: #ffffff;

      border: 1px solid #d3dce6;

      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      border-radius: 3px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      text-align: center;

      color: #657acb;
    }
  }
`;

export const OrderTable = styled.table`
  z-index: 2;
  width: 95%;

  thead > tr {
    border-bottom: none;
  }

  tbody > tr {
    border-bottom: 1px solid #e0e6ed;
  }

  tr {
    padding: 0 100px !important;
  }

  td {
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  th {
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  thead {
    background: #ebeff5;
    height: 33px;
  }

  .product {
    text-align: left;
  }

  .text-bold {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
  }

  img {
    width: 44px;
    height: 44px;
  }
`;

export const DetailsMobile = styled.div`
  padding: 20px 16px;

  display: none;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  > .header {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3b4857;
  }

  > .body {
    width: 100%;
    /* height: 496px; */

    margin-top: 20px;

    display: flex;
    flex-direction: column;

    background: #ffffff;
    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
    border-radius: 3px;

    > .title {
      padding: 16px;

      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #3b4857;
    }

    hr {
      margin: 0;
      background: #e0e6ed;
    }

    > .content {
      padding: 12px;

      display: flex;
      flex-direction: column;

      > .status {
        padding: 2px;

        background: #7591f4;
        border-radius: 24px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #ffffff;
        text-transform: capitalize;
      }

      > .title {
        margin-top: 16px;

        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #3b4857;
      }

      > .customer {
        margin-top: 8px;

        font-weight: 600;
        font-size: 12px;
        line-height: 160%;
        color: #3b4857;
      }
      > .date-list {
        margin-top: 13px;

        display: flex;
        flex-direction: column;

        > .header {
          display: flex;
          flex-direction: row;
          column-gap: 8px;
        }

        .date {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          height: 52px !important;

          background: #ebeff5;
          border-radius: 3px;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          color: #3b4857;

          > .state {
            color: #8492a5;
          }
        }

        > .footer {
          margin-top: 8px;
          display: flex;
          flex-direction: row;
        }
      }

      > .status-btn {
        margin-top: 8px;

        padding: 7px;

        width: 100%;

        border: 1px solid #d3dce6;
        border-radius: 3px;
        background: #fff;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;

        &.processed {
          color: #dca517;
        }

        &.ready {
          color: #3db36c;
        }
      }

      > .ref {
        margin-top: 16px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #3b4857;
      }

      > .invoice-ref {
        margin-top: 8px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #3b4857;
      }

      > .customer-po-ref {
        margin-top: 8px;

        font-weight: 600;
        font-size: 12px;
        line-height: 160%;
        color: #3b4857;
      }

      > .description {
        margin-top: 9px;

        font-weight: 600;
        font-size: 11px;
        line-height: 160%;
        color: #8492a5;
      }
    }
  }

  > .home {
    margin-top: 20px;
    padding: 8px;

    width: 100%;

    background: #e2e8ff;
    border-radius: 3px;
    border: none;

    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: #657acb;
  }
`;
