import styled from '@emotion/styled';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-style: normal;

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? `flex` : `none`)};
  }

  > .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 25px;

    @media screen and (max-width: 768px) {
      display: none;
    }

    > .text {
      display: flex;
      flex-direction: column;

      > .line {
        color: #8492a5;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
      }

      > .title {
        margin-top: 12px;

        color: #3b4857;

        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
      }
    }

    > .steps {
      display: flex;
      flex-direction: row;
      column-gap: 25px;
      align-items: flex-end;

      > .step-list {
        display: flex;
        flex-direction: row;
        color: #8492a5;
        align-items: center;

        > .radius {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          background: #f6f7f9;
          border: 1px solid #b0bbcb;
          border-radius: 50px;
          height: 30px;
          width: 30px;
        }

        > .text {
          margin-left: 8px;
        }
      }
    }
  }

  > .row {
    justify-content: space-between;
  }
  .neworder-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 20px;

    @media screen and (max-width: 1400px) {
      justify-content: center;
    }
  }

  .addproducts {
    flex: 0 0 auto;
    width: 33.166vw;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1400px) {
      width: 75vw;
    }

    @media screen and (max-width: 1200px) {
      width: 90vw;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 0 !important;
    }
  }

  .ordersummary {
    flex: 0 0 auto;
    width: 43.833vw;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1400px) {
      width: 75vw;
    }

    @media screen and (max-width: 1200px) {
      width: 90vw;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export const AddProducts = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 482px; */
  /* min-width: 482px; */

  @media screen and (max-width: 768px) {
    min-width: 320px;
    width: 100%;
  }

  > .header {
    background: #717a9d;

    padding: 24px 28px;

    @media screen and (max-width: 768px) {
      padding: 16px;
    }

    > .title {
      color: #ffffff;

      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
    }

    > .search {
      margin-top: 24px;

      display: flex;
      flex-direction: column;

      position: relative;

      > .search-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        color: #ffffff;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        > .mobile-open-filter {
          display: none;
          flex-direction: row;

          cursor: pointer;

          @media screen and (max-width: 768px) {
            display: flex;
          }

          > span {
            margin-left: 5px;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            text-align: right;
            color: #a6aecd;
          }
        }
      }

      > .search-input {
        margin-top: 8px;

        display: flex;
        flex-direction: column;

        position: relative;

        > input {
          padding: 8px 12px 8px 33px;
          height: 36px;

          background: #828bae;
          color: #ffffff;

          box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
          border-radius: 3px;
          outline: none;
          border: none;

          font-weight: 600;
          font-size: 14px;
          line-height: 19px;

          opacity: 0.4;

          ::placeholder {
            align-items: center;
            color: #ffffff;
          }
        }

        > img {
          top: 11px;
          left: 12px;
          position: absolute;
          height: 13px;
        }
      }

      > .reset-filter {
        position: absolute;
        right: 3px;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 5px;

        cursor: pointer;

        > img {
        }
        > span {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          text-align: right;
          color: #feb0ab;
        }
      }
    }

    > .select {
      margin-top: 24px;

      display: flex;
      flex-direction: row;

      column-gap: 24px;

      @media screen and (max-width: 768px) {
        display: none;
      }

      > .select-item {
        display: flex;
        flex-direction: column;

        width: 100%;

        .label {
          color: #ffffff;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
        }

        .custom-select__placeholder {
          color: #fff !important;
        }

        .custom-select__single-value {
          color: #fff !important;
        }
      }
    }
  }
  > .body {
    /* border: 1px solid red; */
    background: #ffffff;

    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
    border-radius: 3px;
  }
`;

export const ProductTable = styled.div`
  display: flex;
  flex-direction: column;

  > .header {
    padding: 12px 28px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    @media screen and (max-width: 768px) {
      padding: 20px 16px;
    }

    > .page {
      @media screen and (max-width: 768px) {
        display: none;
      }
      > ul {
        list-style: none;
        display: flex;
        flex-direction: row;

        margin-bottom: 0;
        padding-left: 0;
        padding-bottom: 0rem;
        column-gap: 4px;

        > li {
          width: 28px;
          height: 25px;

          display: flex;
          justify-content: center;
          align-items: center;

          border: 1px solid #d3dce6;
          border-radius: 3px;
          box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
          cursor: pointer;

          > span {
            text-align: center;
            color: #8492a5;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
          }
        }

        > .active {
          border: 1px solid #657acb;
          color: #657acb;
        }

        > span {
          color: #8492a5;

          margin-left: 4px;
          margin-right: 4px;
        }
      }
    }
    > .sort {
      display: flex;
      flex-direction: row;
      align-items: center;

      column-gap: 8px;

      > .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        color: #3b4857;
      }

      > button {
        height: 25px;

        padding: 4px 8px;

        background: #ffffff;
        border: 1px solid #d3dce6;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        border-radius: 3px;

        color: #8492a5;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
  > .list {
    max-height: 932px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 10px;

    display: flex;
    flex-direction: column;
    align-items: stretch;

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

    @media screen and (max-width: 768px) {
      /* overflow-y: hidden; */
      max-height: 4000px;
    }
  }

  .list-hr {
    margin: 0 0;
    padding: 0;
    width: 100%;
  }

  .list-hr-header {
    margin: 0 0;
    padding: 0;
  }

  > .mobile-page {
    margin-top: 20px;
    margin-bottom: 24px;

    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
      display: flex;
    }

    > ul {
      list-style: none;
      display: flex;
      flex-direction: row;

      margin-bottom: 0;
      padding-left: 0;
      padding-bottom: 0rem;
      column-gap: 4px;

      > li {
        width: 28px;
        height: 25px;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid #d3dce6;
        border-radius: 3px;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        cursor: pointer;

        > span {
          text-align: center;
          color: #8492a5;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
        }
      }

      > .active {
        border: 1px solid #657acb;
        color: #657acb;
      }

      > span {
        color: #8492a5;

        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
`;

export const ListItem = styled.div`
  padding: 0 28px;

  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }

  > .content {
    margin-top: 24px;
    margin-bottom: 24px;

    display: flex;
    flex-direction: row;
    column-gap: 16px;

    @media screen and (max-width: 768px) {
      margin-bottom: 0px;
    }

    > .img {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: center;

      > img {
        width: 70px;
        height: 70px;

        @media screen and (max-width: 768px) {
          width: 61px;
          height: 61px;
        }
      }

      > .count {
        margin-top: 12px;
        margin-left: 2px;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 4px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        color: #3b4857;

        > select {
          border: none;
          outline: none;
          background-color: #ffffff;
          text-align: center;

          > option {
            height: 100px;
          }
        }
      }
    }

    > .text {
      flex: 5;

      display: flex;
      flex-direction: column;

      > .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 19px;

          color: #3b4857;
        }

        > .right {
          display: flex;
          flex-direction: row;
          align-items: center;
          > .old-price {
            margin-left: 138px;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;

            text-align: right;
            text-decoration-line: line-through;

            color: #ff685e;

            @media screen and (max-width: 768px) {
              display: none;
            }
          }

          > .price {
            margin-left: 8px;
            font-weight: 700;
            font-size: 18px;
            line-height: 25px;

            text-align: right;

            color: #3b4857;

            @media screen and (max-width: 768px) {
              display: none;
            }
          }
          > img {
            /* margin-left: 24px; */
            margin-left: 15px;
            margin-right: 10px;

            @media screen and (max-width: 768px) {
              margin-right: 0px;
            }
          }
        }
      }

      > .mobile-stock {
        margin-top: 12px;

        display: none;
        flex-direction: row;
        justify-content: space-between;

        @media screen and (max-width: 768px) {
          display: flex;
        }

        > .stock {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;

          > .text {
            margin-right: 3px;

            color: #8492a5;
          }

          > .number {
            color: #3b4857;
          }
        }

        > .price {
          .old-price {
            margin-right: 6px;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            text-align: right;
            text-decoration-line: line-through;
            color: #ff685e;
          }
          .now-price {
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            text-align: right;
            color: #3b4857;
          }
        }
      }

      > .description {
        margin-top: 12px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        color: #8492a5;
      }

      > .btn-list {
        margin-top: 20px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;

        @media screen and (max-width: 768px) {
          display: none;
        }

        > .left {
          display: flex;
          flex-direction: row;
          > .number {
            margin-right: 6px;

            width: 32px;
            height: 31px;
            background: #e2e8ff;
            border-radius: 3px;
            border: none;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;

            text-align: center;

            color: #657acb;
          }

          > .qty-group {
            position: relative;
            > .qty {
              height: 31px;
              width: 100px;
              padding: 7px 12px;
              background: #ffffff;

              border: 1px solid #d3dce6;
              outline: none;

              box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
              border-radius: 3px;

              font-weight: 600;
              font-size: 12px;
              line-height: 16px;

              color: #8492a5;

              ::-webkit-outer-spin-button,
              ::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            }
            > img {
              position: absolute;
              top: 8px;
              right: 6px;

              cursor: pointer;
            }
          }
        }
        /* justify-content: space-between; */

        > .right {
          display: flex;
          flex-direction: row;

          > .stock {
            margin-left: 12px;
            padding: 7px 12px;
            background: #ebeff5;
            border-radius: 3px;
            border: none;

            font-weight: 600;
            font-size: 12px;
            line-height: 16px;

            text-align: center;

            color: #8492a5;

            @media screen and (max-width: 768px) {
              display: none;
            }
            > span {
              color: #3b4857;
            }
          }
        }
      }
    }
  }

  > .mobile-btn-list {
    margin-top: 20px;
    margin-bottom: 24px;

    display: none;

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    /* justify-content: space-between; */

    > .left {
      display: flex;
      flex-direction: row;
      > .number {
        margin-right: 6px;

        width: 32px;
        height: 31px;
        background: #e2e8ff;
        border-radius: 3px;
        border: none;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        text-align: center;

        color: #657acb;
      }
    }

    > .right {
      display: flex;
      flex-direction: row;

      > .qty-group {
        position: relative;
        > .qty {
          height: 31px;
          width: 100px;
          padding: 7px 12px;
          background: #ffffff;

          border: 1px solid #d3dce6;
          outline: none;

          box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
          border-radius: 3px;

          font-weight: 600;
          font-size: 12px;
          line-height: 16px;

          color: #8492a5;

          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
        > img {
          position: absolute;
          top: 8px;
          right: 6px;

          cursor: pointer;
        }
      }
    }
  }
`;

export const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;

  background: #ffffff;
  /* bg white */

  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;

  /* max-width: 622px; */
  /* height: 1062px; */
  min-width: 622px;
  /* padding-bottom: 100px; */

  > .title {
    margin-top: 12px;
    margin-left: 28px;

    font-weight: 700;
    font-size: 14px;
    line-height: 19px;

    color: #3b4857;
  }

  hr {
    background: #e0e6ed;
    height: 2px;
  }

  > .order {
    display: flex;
    flex-direction: column;

    padding: 16px 28px;

    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;

      color: #3b4857;
    }

    .star {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 4px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #ff685e;
    }

    .description {
      margin-top: 8px;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #3b4857;
    }

    .btn-list {
      margin-top: 16px;

      display: flex;
      flex-direction: row;
      column-gap: 8px;
      justify-content: flex-start;

      > button {
        padding: 7px 12px;
        background: #ebeff5;
        border-radius: 3px;
        border: none;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        color: #8492a5;
      }
    }
    > .ref {
      margin-top: 16px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      color: #3b4857;
    }

    > .customer {
      margin-top: 12px;

      > .text {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        color: #3b4857;
      }

      > .upload {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 4px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        cursor: pointer;

        color: #657acb;
      }
    }

    > .about {
      margin-top: 12px;

      > .text {
        font-weight: 600;
        font-size: 11px;
        line-height: 160%;

        color: #8492a5;
      }

      > .download {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 4px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        text-align: right;

        color: #657acb;
      }
    }

    > .tab {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      column-gap: 24px;

      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #b0bbcb;

      > .tab-item {
        cursor: pointer;
      }

      > .active {
        color: #657acb;
      }
    }
  }

  > .order-table {
    position: relative;
    padding: 0 28px;

    > .header-left {
      position: absolute;
      left: 0px;
      top: 0;
      background: #ebeff5;
      /* background: red; */
      width: 28px;
      height: 33px;
      z-index: 1;
    }

    > .header-right {
      position: absolute;
      right: 0px;
      top: 0;
      background: #ebeff5;
      /* background: red; */
      width: 28px;
      height: 33px;
      /* z-index: 1; */
    }
  }

  > .table-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: -2px;
    width: 100%;
    height: 65px;
    background: #ebeff5;
    z-index: 0;

    > div {
      margin-left: 16px;
      margin-right: 16px;

      font-weight: 700;
      font-size: 18px;
      line-height: 25px;

      color: #3b4857;

      > span {
        margin-right: 8px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;

        text-align: right;

        color: #3b4857;
      }
    }
  }

  > .btn-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 28px;
    column-gap: 24px;

    margin-top: 32px;
    margin-bottom: 32px;

    > .cancel {
      height: 36px;
      width: 150px;
      background: #ffffff;

      border: 1px solid #d3dce6;

      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      border-radius: 3px;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;

      color: #657acb;
    }

    > .submit {
      height: 36px;
      width: 150px;
      background: #657acb;
      border: none;
      /* btn main */

      box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
      border-radius: 3px;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;

      color: #ffffff;
    }
  }
`;

export const OrderTable = styled.table`
  width: 100%;

  tr {
    border-style: none;

    border-bottom: 1px solid #e0e6ed;
    padding: 0 20px;
  }

  td {
    padding-right: 20px;
  }

  .header {
    border: none;
    border-style: hidden;
    background: #ebeff5;
    height: 33px;
  }

  .header-product {
    /* padding-left: 28px; */
    /* width: 180px; */
  }

  .body {
    > td {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    > .product {
      > img {
        width: 40px;
        height: 40px;
      }

      > span {
        margin-left: 12px;

        font-weight: 700;
        font-size: 14px;
        line-height: 19px;

        color: #3b4857;
      }
    }

    > .altsku {
      width: 130px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > .price {
      > .now-price {
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;

        color: #3b4857;
      }

      > .old-price {
        font-weight: 600;
        font-size: 10px;
        line-height: 14px;

        text-decoration-line: line-through;

        color: #8492a5;
      }
    }

    > .qty {
      max-width: 100px;
      position: relative;

      > input {
        /* width: 80%; */
        width: 100%;
        height: 38px;
        background: #ffffff;
        border: 1px solid #d3dce6;
        outline: none;
        /* padding-left: 30px; */
        text-align: center;

        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        border-radius: 3px;

        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
      > .minus {
        position: absolute;
        left: 10px;
        top: 14px;
        color: #b0bbcb;
        font-size: 30px;
        text-align: center;
        border: none;
        background: #fff;
        height: 5px;
      }

      > .plus {
        position: absolute;
        right: 25px;
        top: 16px;
        color: #b0bbcb;
        font-size: 30px;
        text-align: center;
        border: none;
        background: #fff;
        height: 3px;
      }
    }

    > .action {
      padding-right: 0;

      > img {
        cursor: pointer;
      }
    }
  }
`;

export const OrderAltSkuTable = styled.div`
  margin-bottom: 50px;
  > .header {
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
`;

export const NewOrderMain = styled.div`
  display: ${props => (props.show ? `block` : `none`)};
`;

export const OrderHeader = styled.div`
  padding: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    margin-left: 20px;

    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    color: #3b4857;
  }

  > img {
    cursor: pointer;
  }
`;

export const MobileFilter = styled.div`
  padding: 16px;

  display: ${props => (props.show ? `block` : `none`)};

  background: #717a9d;
  width: 100%;
  height: 100vh;

  > .header {
    display: flex;
    flex-direction: row;

    > img {
      cursor: pointer;
    }

    > span {
      margin-left: 16px;

      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      color: #ffffff;
    }
  }

  hr {
    background: #848db0;
    margin-left: -16px;
    width: 100vw;
  }

  .custom-select__placeholder {
    color: #fff;
  }

  .custom-select__single-value {
    color: #fff !important;
  }

  > .body {
    button {
      margin-top: 20px;
      padding: 8px;

      width: 100%;
      background: #ffffff;
      box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
      border-radius: 3px;
      border: none;
    }

    > .reset {
      margin-top: 24px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      > span {
        margin-left: 4px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        color: #feb0ab;
      }
    }
  }
`;

export const SeeOrder = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: fixed;
  bottom: 24px;
  right: 16px;

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? `flex` : `none`)};
  }

  height: 66px;
  width: 66px;
  background: #657acb;
  box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
  border-radius: 50%;

  > span {
    max-width: 33px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
  }
`;

export const AddProduct = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: fixed;
  bottom: 24px;
  right: 16px;

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? `flex` : `none`)};
  }

  height: 66px;
  width: 66px;
  background: #657acb;
  box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
  border-radius: 50%;

  > span {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
  }
`;

export const GoUp = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  position: fixed;
  bottom: 114px;
  right: 16px;

  height: 66px;
  width: 66px;
  background: #b0bbcb;
  box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
  border-radius: 50%;

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? `flex` : `none`)};
  }

  > img {
    width: 11px;
    height: 6px;
  }

  > span {
    margin-top: 4px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
  }
`;

export const OrderSummaryMobile = styled.div`
  margin: 20px 16px;

  display: none;
  flex-direction: column;

  background: #ffffff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;

  @media screen and (max-width: 768px) {
    display: ${props => (props.show ? `flex` : `none`)};
  }

  > .title {
    padding: 16px;

    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #3b4857;
  }

  > hr {
    margin: 0;
    background: #e0e6ed;
  }

  > .header {
    padding: 24px 16px;

    display: flex;
    flex-direction: column;

    > .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
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

    > .ref {
      margin-top: 16px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > .customer-po-ref {
      margin-top: 12px;

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

  > .products {
    display: flex;
    flex-direction: column;

    > .header {
      padding: 8px 16px;

      background: #ebeff5;

      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #3b4857;
    }

    > .body {
      padding: 10px 16px;
    }

    > .footer {
      width: 100%;

      display: flex;
      flex-direction: column;

      background: #ebeff5;

      > .one {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        color: #3b4857;
      }

      > .two {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        color: #3b4857;

        > .qty {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        > .altsku {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }

        .value {
          margin-left: 5px;

          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #3b4857;
        }
      }
    }
  }

  > .btn-list {
    padding: 24px 16px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > .cancel {
      padding: 8px;

      width: 120px;

      background: #ffffff;
      border: 1px solid #d3dce6;
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      border-radius: 3px;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #657acb;
    }

    > .submit {
      padding: 8px;

      width: 120px;

      background: #657acb;
      box-shadow: 0px 2px 3px rgba(101, 122, 203, 0.41);
      border-radius: 3px;
      border: none;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #ffffff;
    }
  }
`;

export const ProductsItem = styled.div`
  margin-top: 10px;

  display: flex;
  flex-direction: column;

  > .header {
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      width: 72px;
      height: 72px;
      cursor: pointer;
    }

    > .text {
      margin-left: 20px;

      display: flex;
      flex-direction: column;

      > .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #3b4857;
      }

      > .price {
        margin-top: 8px;

        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #3b4857;
      }

      > .old-price {
        margin-top: 4px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-decoration-line: line-through;
        color: #ff685e;
      }
    }

    > .close {
      position: absolute;
      top: 4px;
      right: 0;

      width: 12px;
      height: 12px;
    }
  }

  > .altsku {
    margin-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > span {
      width: 92px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > div {
      display: flex;
      flex-direction: row;
      width: calc(100% - 72px);

      > select {
        width: 100%;

        padding: 6px 12px;

        background: #ffffff;
        border: 1px solid #d3dce6;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        border-radius: 3px;
        outline: none;

        /* font-weight: 600; */
        /* font-size: 12px; */
        /* line-height: 16px; */
        text-align: center;
        color: #3b4857;
      }
    }
  }

  > .qty {
    margin-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > span {
      width: 92px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > div {
      width: calc(100% - 72px);

      position: relative;

      > .minus {
        position: absolute;
        top: 0;
        left: 12px;
        font-size: 16px;
      }

      > .plus {
        position: absolute;
        top: 0;
        right: 12px;
        font-size: 16px;
      }

      > input {
        width: 100%;
        padding: 6px;

        background: #ffffff;
        border: 1px solid #d3dce6;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
        border-radius: 3px;
        outline: none;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #3b4857;
      }
    }
  }

  > .stock {
    margin-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > span {
      width: 92px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }

    > div {
      padding: 7px;

      width: calc(100% - 72px);
      background: #ebeff5;
      border-radius: 3px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #3b4857;

      span {
        margin-right: 4px;
        color: #8492a5;
      }
    }
  }

  hr {
    margin: 18px 0px 0px 0px;
  }
`;
