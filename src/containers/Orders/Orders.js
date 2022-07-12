import React, { forwardRef } from 'react';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Loading, Input, Select, Pagination } from 'components';
import { ApiLocations, ApiOrders } from 'api';
import { checkValidExist } from 'helpers';
import { useDebounce } from 'use-debounce';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const Title = styled.h5`
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

const Filter = styled.div`
  font-weight: 600;

  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;

  padding-bottom: 39px;

  @media screen and (max-width: 768px) {
    box-shadow: none;
    background: none;
  }

  .title {
    padding: 0.75rem 1.5rem;
    display: flex;
    border-bottom: 1px solid #e0e6ed;
    margin-bottom: 1.75rem;
  }

  .statuses-label {
    margin-bottom: 8px !important;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  .customer {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  .apply {
    margin-top: 24px;
    padding: 8px 16px;

    width: 100%;

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

  .reset {
    margin-top: 24px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    span {
      margin-left: 6px;

      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      text-align: right;
      color: #b0bbcb;
    }
  }

  .statuses {
    position: relative;
    .statuses-input {
      background: #ffffff;
      /* grey/4 */

      border: 1px solid #d3dce6;
      box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      border-radius: 3px;

      height: 36px;
    }

    .status-input {
      position: absolute;
      background: #ffffff;
      width: 99%;
      max-height: 33px;
      /* box shadow large */

      box-shadow: 0px 3px 18px rgba(39, 52, 67, 0.2);
      border-radius: 3px;

      padding: 0.3rem 1rem;
      border-bottom: 0px solid #e0e6ed;
      margin-bottom: 0rem;
      z-index: 0;
      .status-badge {
        border-radius: 30px;
        padding: 2px 10px;
        font-size: 0.75rem;
        text-transform: capitalize;
      }
      .created {
        color: #d09248;
        background: rgba(208, 146, 72, 0.1);
        border: 1px solid #d09248;
      }
      .submitted {
        color: #7591f4;
        border: 1px solid #7591f4;
        background: rgba(117, 145, 244, 0.1);
      }
      .preprocessing {
        color: #79b616;
        border: 1px solid #79b616;
        background: rgba(121, 182, 22, 0.1);
      }
      .processing {
        color: #f46b59;
        border: 1px solid #f46b59;
        background: rgba(244, 107, 89, 0.1);
      }
      .cancelled {
        color: #f46b59;
        border: 1px solid #f46b59;
        background: rgba(244, 107, 89, 0.1);
      }
      .draft {
        color: #d09248;
        background: rgba(208, 146, 72, 0.1);
        border: 1px solid #d09248;
      }
      .readyForDelivery {
        color: #3db36c;
        background: rgba(61, 179, 108, 0.1);
        border: 1px solid #3db36c;
      }
      .packing {
        color: #4cabe0;
        background: rgba(76, 171, 224, 0.1);
        border: 1px solid #4cabe0;
      }
      .packed {
        color: #a56fdc;
        background: rgba(165, 111, 220, 0.1);
        border: 1px solid #a56fdc;
      }
      .delivering {
        color: #2fb8b0;
        background: rgba(47, 184, 176, 0.1);
        border: 1px solid #2fb8b0;
      }
      .complete {
        color: #79b616;
        background: rgba(121, 182, 22, 0.1);
        border: 1px solid #79b616;
      }
      .void {
        color: #978684;
        background: rgba(151, 134, 132, 0.1);
        border: 1px solid #978684;
      }
      .prepacking {
        color: #f8678a;
        background: rgba(248, 103, 138, 0.1);
        border: 1px solid #f8678a;
      }
      .prepacked {
        color: #da5fb8;
        background: rgba(218, 95, 184, 0.1);
        border: 1px solid #da5fb8;
      }
      > span {
        display: block;
        margin-bottom: 1.25rem;
      }
      .radio-button input[type='radio'] {
        display: none;
      }
      .radio-button {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;

        > span {
          left: 3px;
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: #657acb;
          z-index: 3;
          border-radius: 50%;
        }
      }
      .radio-button label {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 1.5rem;
        cursor: pointer;
      }
      .radio-button label::before,
      .radio-button label::after {
        position: absolute;
        content: '';
        top: 50%;
        border-radius: 100%;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }
      .radio-button label::before {
        left: 0;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        background: #fff;
        border: 1px solid #b0bbcb;
      }
      .radio-button label:hover::before {
        background: #fff;
        border: 1px solid #657acb;
      }
      .radio-button label::after {
        opacity: 0;
        left: 4.2px;
        width: 8px;
        height: 8px;
        margin-top: -4px;
        background: #657acb;
        -webkit-transform: scale(2);
        transform: scale(2);
      }
      .radio-button input[type='radio']:checked + label::before {
        background: #fff;
        border: 1px solid #657acb;
      }
      .radio-button input[type='radio']:checked + label::after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    .status {
      position: absolute;
      background: #ffffff;
      display: ${props => (props.show ? 'block' : 'none')};
      width: 100%;
      /* box shadow large */

      box-shadow: 0px 3px 18px rgba(39, 52, 67, 0.2);
      border-radius: 3px;

      padding: 0.75rem 1.5rem;
      border-bottom: 0px solid #e0e6ed;
      margin-bottom: 0rem;
      z-index: 1;
      .status-badge {
        border-radius: 30px;
        padding: 2px 10px;
        font-size: 0.75rem;
        text-transform: capitalize;
      }
      .created {
        color: #d09248;
        background: rgba(208, 146, 72, 0.1);
        border: 1px solid #d09248;
      }
      .submitted {
        color: #7591f4;
        border: 1px solid #7591f4;
        background: rgba(117, 145, 244, 0.1);
      }
      .preprocessing {
        color: #79b616;
        border: 1px solid #79b616;
        background: rgba(121, 182, 22, 0.1);
      }
      .processing {
        color: #f46b59;
        border: 1px solid #f46b59;
        background: rgba(244, 107, 89, 0.1);
      }
      .cancelled {
        color: #f46b59;
        border: 1px solid #f46b59;
        background: rgba(244, 107, 89, 0.1);
      }
      .draft {
        color: #d09248;
        background: rgba(208, 146, 72, 0.1);
        border: 1px solid #d09248;
      }
      .readyForDelivery {
        color: #3db36c;
        background: rgba(61, 179, 108, 0.1);
        border: 1px solid #3db36c;
      }
      .packing {
        color: #4cabe0;
        background: rgba(76, 171, 224, 0.1);
        border: 1px solid #4cabe0;
      }
      .packed {
        color: #a56fdc;
        background: rgba(165, 111, 220, 0.1);
        border: 1px solid #a56fdc;
      }
      .delivering {
        color: #2fb8b0;
        background: rgba(47, 184, 176, 0.1);
        border: 1px solid #2fb8b0;
      }
      .complete {
        color: #79b616;
        background: rgba(121, 182, 22, 0.1);
        border: 1px solid #79b616;
      }
      .void {
        color: #978684;
        background: rgba(151, 134, 132, 0.1);
        border: 1px solid #978684;
      }
      .prepacking {
        color: #f8678a;
        background: rgba(248, 103, 138, 0.1);
        border: 1px solid #f8678a;
      }
      .prepacked {
        color: #da5fb8;
        background: rgba(218, 95, 184, 0.1);
        border: 1px solid #da5fb8;
      }
      > span {
        display: block;
        margin-bottom: 1.25rem;
      }
      .radio-button input[type='radio'] {
        display: none;
      }
      .radio-button {
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;
      }
      .radio-button label {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 1.5rem;
        cursor: pointer;
      }
      .radio-button label::before,
      .radio-button label::after {
        position: absolute;
        content: '';
        top: 50%;
        border-radius: 100%;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }
      .radio-button label::before {
        left: 0;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        background: #fff;
        border: 1px solid #b0bbcb;
      }
      .radio-button label:hover::before {
        background: #fff;
      }
      .radio-button label::after {
        opacity: 0;
        left: 4.2px;
        width: 8px;
        height: 8px;
        margin-top: -4px;
        background: #657acb;
        -webkit-transform: scale(2);
        transform: scale(2);
      }
      .radio-button input[type='radio']:checked + label::before {
        background: #fff;
        border: 1px solid #657acb;
      }
      .radio-button input[type='radio']:checked + label::after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  }

  .filter {
    padding: 0 1.5rem;
  }

  .order {
    margin-top: 40px;
    > span {
      padding: 0.75rem 1.5rem;
      display: flex;
      border-bottom: 1px solid #e0e6ed;
      margin-bottom: 19px;
    }

    .status {
      padding: 0 1.5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 39px;

      label {
        font-size: 14px;
        line-height: 150%;

        color: #8492a5;
      }
    }

    .order-field {
      margin-top: 19px;
      padding: 0rem 1.5rem;
      padding-bottom: 1.5rem;
    }

    .submit {
      padding: 0 24px;
      display: flex;
      flex-direction: row;
      justify-content: end;

      .btn {
        color: #fff;
        width: 116px;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
`;

const OrdersList = styled.div`
  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 3px;
  .sort {
    background: #ebeff5;
    padding: 0.5125rem 1.5rem;
    display: flex;
    align-items: center;
    height: 44px;
  }
  .head {
    display: flex;
    padding: 0.3125rem 1.5rem;
    align-items: center;
    > span {
      display: inline-flex;
    }
    .search-return {
      margin-left: auto;
      .form-control {
        &:focus {
          box-shadow: none;
          outline: 0;
        }
        &::placeholder {
          color: #b0bbcb;
        }
      }
    }
  }
`;

const OrdersItem = styled.div`
  padding: 1.1875rem 0rem;
  border-bottom: 1px solid #e0e6ed;
  position: relative;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  > .header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 10px;

    > .status {
      color: #fff;
      border-radius: 30px;
      padding: 2px 10px;
      font-size: 0.75rem;
      text-transform: capitalize;
      &.submitted {
        background: #7591f4;
      }
      &.void {
        background: #978684;
      }
      &.created {
        background: #d09248;
      }
      &.processing {
        background: #f46b59;
      }
      &.cancelled {
        background: #f46b59;
      }
      &.preprocessing {
        background: #79b616;
      }
      &.complete {
        background: #79b616;
      }
      &.draft {
        background: #d09248;
      }
      &.readyForDelivery {
        background: #3db36c;
      }
      &.packing {
        background: #4cabe0;
      }
      &.packed {
        background: #a56fdc;
      }
      &.delivering {
        background: #2fb8b0;
      }
      &.prepacking {
        background: #f8678a;
      }
      &.prepacked {
        background: #da5fb8;
      }
    }
  }

  > .customer {
    margin-top: 7px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  > .customer-po-ref {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #3b4857;
  }

  > .description {
    color: #8492a5;
  }
  > div.d-flex {
    flex-wrap: wrap;
    > span.date {
      padding: 0.375rem 0.75rem;
      background: #ebeff5;
      border-radius: 5px;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      width: auto;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
      color: #3b4857;
      margin-right: 0.625rem;
      &:first-of-type {
        margin-right: 0.625rem;
      }
      .state {
        color: #8492a5;
      }
    }
  }
  &:last-of-type {
    border: 0px;
  }
`;

const Sort = styled.div`
  display: inline-flex;
  align-items: center;

  > span {
    @media screen and (max-width: 768px) {
      margin-top: 2px;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #3b4857;
    }
  }

  > select {
    padding: 0px;
    color: #8492a5;
    font-size: 0.875rem;
    option:checked {
      color: #8492a5;
    }
    option {
      color: #8492a5;
    }
    &:focus {
      box-shadow: unset;
      color: #8492a5;
      outline: 0;
    }
    box-shadow: unset;
    outline: 0;
  }
`;

const PaginationAndSearch = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0rem 0rem;
  padding-top: 0rem;
  margin-left: ${props => (props.marginLeft ? `auto` : `unset`)};
  > span {
    padding-bottom: 0rem;
    display: flex;
  }
  > ul {
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
    display: flex;
    border-bottom: ${props => (props.border ? `1px solid #E0E6ED` : `0px solid #E0E6ED`)};
    width: 100%;
    padding-bottom: 0rem;
    li {
      display: inline-flex;
      margin-right: 0.3125rem;
      &.active {
        span {
          color: #657acb;
          border: 1px solid #657acb;
        }
      }
      span {
        &.prev-arrow,
        &.next-arrow {
          &:hover {
          }
        }
        cursor: pointer;
        img {
          width: 10px;
          height: auto;
        }
        display: inline-flex;
        border: 1px solid #d3dce6;
        width: 28px;
        height: 28px;
        align-items: center;
        justify-content: center;
        color: #8492a5;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0px 2px 3px rgba(39, 52, 67, 0.06);
      }
    }
  }
`;

const OrderDesktop = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }

  > .row {
    /* @media screen and (max-width: 1000px) {
      display: flex;
      flex-direction: column;
    } */
  }
`;

const OrderMobile = styled.div`
  padding: 20px 16px;

  display: none;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  > .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #3b4857;
  }

  > .filter-title {
    margin-top: 20px;
    padding: 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background: #ffffff;
    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
    border-radius: 3px;

    cursor: pointer;

    > span {
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #3b4857;
    }
  }

  > .neworder-title {
    margin-top: 8px;
    padding: 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background: #ffffff;
    box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
    border-radius: 3px;

    cursor: pointer;

    > span {
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #3b4857;
    }
  }

  > .order-table {
    margin-top: 28px;

    display: flex;
    flex-direction: column;

    > .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      > span {
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #3b4857;
      }

      > .search {
        position: relative;

        > input {
          padding-left: 20px;

          width: 70px;
          height: 20px;
          border: none;
          outline: none;
          background: #fbfbfb;
        }

        > img {
          position: absolute;
          top: 4px;
        }
      }
    }

    > hr {
      background: #e0e6ed;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }

    > .item {
      margin-top: 16px;

      padding: 12px;

      display: flex;
      flex-direction: column;

      width: 100%;
      /* height: 306px; */

      background: #ffffff;
      box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
      border-radius: 3px;

      > .status {
        /* margin: 12px; */
        padding: 3px;

        height: 21px;

        border-radius: 24px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        color: #ffffff;

        &.submitted {
          background: #7591f4;
        }
        &.void {
          background: #978684;
        }
        &.created {
          background: #d09248;
        }
        &.processing {
          background: #f46b59;
        }
        &.cancelled {
          background: #f46b59;
        }
        &.preprocessing {
          background: #79b616;
        }
        &.complete {
          background: #79b616;
        }
        &.draft {
          background: #d09248;
        }
        &.readyForDelivery {
          background: #3db36c;
        }
        &.packing {
          background: #4cabe0;
        }
        &.packed {
          background: #a56fdc;
        }
        &.delivering {
          background: #2fb8b0;
        }
        &.prepacking {
          background: #f8678a;
        }
        &.prepacked {
          background: #da5fb8;
        }
      }

      > .name {
        margin-top: 16px;

        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #3b4857;
        cursor: pointer;
      }

      > .description {
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

      > .reference {
        margin-top: 16px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #3b4857;
      }

      > .po-ref {
        margin-top: 8px;

        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #3b4857;
      }

      > .some {
        margin-top: 9px;

        font-weight: 600;
        font-size: 11px;
        line-height: 160%;
        color: #8492a5;
      }
    }

    > .page {
      margin-top: 24px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const MobileFilter = styled.div`
  /* position: fixed;
  top: 0; */

  display: ${props => (props.show ? `block` : `none`)};

  height: 500px;
  width: 100%;
  /* background: red; */

  > .header {
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
  }

  > hr {
    margin-top: 0px !important;
    background: #d3dce6;
    height: 1px !important;
  }
`;

const MobileNewOrder = styled.div`
  display: ${props => (props.show ? `block` : `none`)};

  > .header {
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
  }

  > hr {
    margin-top: 0px !important;
    background: #d3dce6;
    height: 1px !important;
  }
`;

const GoUp = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  position: fixed;
  bottom: 68px;
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

const OrderContainer = styled.div`
  display: ${props => (props.show ? `block` : `none`)};
`;

const Status = ({ statu }) => {
  return (
    <div className="status-input">
      <div className="radio-button">
        <span></span>
        {statu === 'all' ? (
          <label htmlFor="all">All</label>
        ) : (
          <label htmlFor={statu}>
            <span className={`${statu} status-badge`}>
              {statu === 'readyForDelivery' ? 'Ready For Delivery' : statu}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

const Orders = ({ search = '', sort = '', sortOrder = '', status = '' }) => {
  const myRef = React.createRef();

  const router = useRouter();
  const [keywords, setKeywords] = React.useState(search);
  const [newKeywords] = useDebounce(keywords, 2000);
  const [searchLoading] = React.useState(checkValidExist(search));
  const [loading, setLoading] = React.useState(true);
  const [statuShow, setStatuShow] = React.useState(false);
  const [returns, setReturns] = React.useState({
    date: Date.now(),
    paginate: 1,
    totalPages: 0,
    customerOptions: [],
    title: '',
    titleError: '',
    customerRef: '',
    customerRefError: '',
    description: '',
    limitPage: 10,
    offSet: 0,
    sort,
    sortOrder,
    status: [],
    data: [],
    bylocation: {},
    tolocation: {},
    fromlocation: { label: 'WH-WH', value: -1 },
    newOrderType: 'sales',
  });

  const [show, setShow] = React.useState('main'); //main, filter, new
  const [showScroll, setShowScroll] = React.useState(false);
  const statusList = [
    'created',
    'submitted',
    'preprocessing',
    'processing',
    'draft',
    'readyForDelivery',
    'packing',
    'packed',
    'delivering',
    'complete',
    'cancelled',
    'void',
    'prepacking',
    'prepacked',
  ];

  const handleNextPrev = page => {
    setReturns(prev => ({ ...prev, paginate: page }));
  };

  const getLocations = async (activePage = 0, limit = 1000) => {
    try {
      const { data } = await ApiLocations.indexLocation('', activePage, limit);

      setReturns(prev => ({
        ...prev,
        customerOptions: data.data.items.map(any => {
          return {
            label: `${any.description}`,
            value: any.id,
            location: any.location,
            debtor: any.udfDebtor,
          };
        }),
      }));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getOrders = async (page, per_page, status, search, sortOrder, bylocation) => {
    try {
      setLoading(true);
      const response = await ApiOrders.gets(page, per_page, status, search, sortOrder, bylocation);
      setReturns(prev => ({ ...prev, data: response.data.data.items, totalPages: response.data.data.totalPages }));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleInput = type => e => {
    const { value } = e.target;
    setReturns(prev => ({ ...prev, [type]: value }));
  };

  const handlebylocation = newValue => {
    setReturns(prev => ({ ...prev, bylocation: newValue }));
  };

  const handletolocation = newValue => {
    setReturns(prev => ({ ...prev, tolocation: newValue }));
  };

  const handlefromlocation = newValue => {
    setReturns(prev => ({ ...prev, fromlocation: newValue }));
  };

  const handleSearch = async e => {
    const { value } = e.target;
    setKeywords(value ? value.toLowerCase() : '');
  };

  const handleStatu = item => {
    if (item === 'all') {
      setReturns(prev => ({ ...prev, status: [] }));
    } else if (item !== '' || item !== 'all') {
      let status = returns.status;
      if (status.findIndex(e => e === item) > -1) {
        status.splice(
          status.findIndex(e => e === item),
          1
        );
      } else {
        status.push(item);
      }
      setReturns(prev => ({ ...prev, status: status }));
    }
  };

  const DatePickerInput = forwardRef(({ onClick }, ref) => (
    <div ref={ref}>
      <Input
        label={
          checkValidExist(returns.titleError) ? (
            <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
              {returns.titleError}
            </span>
          ) : (
            <span className="d-block" style={{ marginBottom: '0.625rem' }}>
              Due Date*
            </span>
          )
        }
        autoWidth={true}
        required="required"
        placeholder="Select"
        value={moment(returns.date).format('DD:MM:YYYY')}
        name="title"
        title="Order title"
        onChange={onClick}
        onClick={onClick}
      />
    </div>
  ));
  DatePickerInput.displayName = 'DatePickerInput';

  const handleCheckbox = e => {
    setReturns(prev => ({ ...prev, newOrderType: e.target.id }));
  };

  const create = async () => {
    try {
      const objectToSend = {
        consignment: returns.newOrderType === 'consignment' ? true : false,
        active: returns.newOrderType === 'sales' ? true : false,
        name: returns.title,
        date: new Date(returns.date).getTime(),
        customer_name: returns.tolocation.location,
        customer_po_ref: '',
        status_id: 1,
        description: '',
        debtor: returns.tolocation.debtor,
        submitted_at: Date.now(),
        FromLocation: returns.fromlocation.location
          ? returns.fromlocation.location
          : process.env.NEXT_PUBLIC_FROM_LOCATION,
      };

      const { data } = await ApiOrders.create(objectToSend);
      console.log(objectToSend);
      if (data.success) {
        const response = data.data;
        router.push(`/orders/new-order/${response.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const scrollGoUp = () => {
    window.scrollTo(0, 0);
  };

  const onScroll = () => {
    const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    if (scrollY > 0) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  React.useEffect(() => {
    getOrders(
      returns.paginate,
      returns.limitPage,
      returns.status,
      keywords,
      returns.sortOrder,
      returns.bylocation.value
    ).then(() => setLoading(false));
    getLocations();
    window.addEventListener('scroll', onScroll);
  }, [returns.paginate, returns.limitPage, returns.status.length, keywords, returns.bylocation, returns.sortOrder]);

  return (
    <>
      <OrderContainer show={show === 'main' ? true : false}>
        <Layout>
          <OrderDesktop>
            <Title>Orders</Title>
            <div className="row">
              <div className="col-md-4">
                <Filter show={statuShow}>
                  <div className="title">
                    <span>Filter</span>
                  </div>

                  <form className="filter">
                    <Select
                      label={
                        <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                          By Location
                        </span>
                      }
                      options={returns.customerOptions}
                      onChange={handlebylocation}
                      background={`#fff`}
                      border={`#D3DCE6`}
                      margin={`1.25rem`}
                      colorHover={`#fff`}
                      colorSelected={`#fff`}
                      color={`#212529`}
                      backgroundSelected={`#828BAE`}
                      custom={true}
                      value={returns.bylocation}
                      placeholder={`Select Location`}
                    />
                    <div className="statuses">
                      <div className="statuses-input" onClick={() => setStatuShow(!statuShow)}>
                        <Status
                          statu={returns.status.length === 0 ? 'all' : returns.status[returns.status.length - 1]}
                        />
                      </div>
                      <div className="status">
                        <div
                          className="radio-button"
                          onClick={() => {
                            setStatuShow(false);
                            handleStatu('all');
                          }}>
                          <input
                            className="form-control"
                            type="radio"
                            id="all"
                            name="status"
                            checked={returns.status.length < 1 ? true : false}
                            onChange={() => {
                              setStatuShow(false);
                              handleStatu('all');
                            }}
                          />
                          <label htmlFor="all">All</label>
                        </div>
                        {statusList.map((item, key) => (
                          <div
                            key={key}
                            onClick={() => {
                              setStatuShow(false);
                              handleStatu(item);
                            }}
                            className="radio-button">
                            <input
                              className="form-control"
                              type="radio"
                              checked={returns.status.findIndex(e => e === item) > -1 ? true : false}
                              onChange={() => {
                                setStatuShow(false);
                                handleStatu(item);
                              }}
                            />
                            <label htmlFor={item}>
                              <span className={`${item} status-badge`}>
                                {item === 'readyForDelivery' ? 'Ready For Delivery' : item}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                  <form action="" className="order">
                    <span>New Order</span>
                    <div className="status">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="consignment"
                          name="status"
                          checked={returns.newOrderType === 'consignment'}
                          onChange={handleCheckbox}
                        />
                        <label className="form-check-label" htmlFor="all">
                          Consignment
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="sales"
                          name="status"
                          checked={returns.newOrderType === 'sales'}
                          onChange={handleCheckbox}
                        />
                        <label className="form-check-label" htmlFor="all">
                          Sales Outright
                        </label>
                      </div>
                    </div>
                    <div className="order-field">
                      <Input
                        label={
                          checkValidExist(returns.titleError) ? (
                            <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
                              {returns.titleError}
                            </span>
                          ) : (
                            <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                              Order title
                            </span>
                          )
                        }
                        autoWidth={true}
                        required="required"
                        placeholder="Title"
                        value={returns.title}
                        name="title"
                        title="Order title"
                        onChange={handleInput('title')}
                      />

                      <DatePicker
                        onChange={e => setReturns(prev => ({ ...prev, date: e }))}
                        customInput={<DatePickerInput />}
                        dateFormat="dd/MM/yyyy"
                      />
                      <Select
                        label={
                          <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                            From Location *
                          </span>
                        }
                        options={returns.customerOptions}
                        onChange={handlefromlocation}
                        background={`#fff`}
                        border={`#D3DCE6`}
                        margin={`1.25rem`}
                        colorHover={`#fff`}
                        colorSelected={`#fff`}
                        color={`#212529`}
                        backgroundSelected={`#828BAE`}
                        custom={true}
                        value={returns.fromlocation}
                        placeholder={`Select`}
                      />
                      <Select
                        label={
                          <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                            To Location *
                          </span>
                        }
                        options={returns.customerOptions}
                        onChange={handletolocation}
                        background={`#fff`}
                        border={`#D3DCE6`}
                        margin={`1.25rem`}
                        colorHover={`#fff`}
                        colorSelected={`#fff`}
                        color={`#212529`}
                        backgroundSelected={`#828BAE`}
                        custom={true}
                        value={returns.tolocation}
                        placeholder={`Select`}
                      />
                    </div>
                    <div className="submit">
                      <button type="button" onClick={create} className="btn btn-primary">
                        Create
                      </button>
                    </div>
                  </form>
                </Filter>
              </div>
              <div className="col-md-8">
                <OrdersList>
                  <div className="head">
                    <span>Order List</span>
                    <div className="input-group w-auto search-return border-0">
                      <span className="input-group-text pe-1 bg-transparent border-0" id="basic-addon1">
                        <img src="/static/images/icons/search.svg" alt="Search" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Search orders..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="sort">
                    {checkValidExist(newKeywords) ? null : (
                      <Sort>
                        <span style={{ width: '80px' }} className="d-flex">
                          Sort by:
                        </span>
                        <select
                          className="form-control border-0 bg-transparent"
                          onChange={event => {
                            setReturns(prev => ({ ...prev, sortOrder: event.target.value }));
                          }}
                          value={returns.sortOrder}>
                          <option value="asc">Date Created (ASC)</option>
                          <option value="desc">Date Created (DESC)</option>
                        </select>
                      </Sort>
                    )}
                    <PaginationAndSearch marginLeft={!checkValidExist(newKeywords)} border={false}>
                      {checkValidExist(newKeywords) ? (
                        <>
                          <span>
                            Search result for : &nbsp;<b>{newKeywords}</b>
                          </span>
                        </>
                      ) : (
                        <Pagination
                          page={returns.paginate}
                          limit={10}
                          count={returns.totalPages * 10}
                          onPageChange={handleNextPrev}
                          style={{ paddingLeft: '.5rem' }}
                        />
                      )}
                    </PaginationAndSearch>
                  </div>
                  <div className="list">
                    {loading || searchLoading ? (
                      <div className="d-flex py-4 align-items-center justify-content-center">
                        <Loading />
                      </div>
                    ) : (
                      returns.data.map(any => {
                        return (
                          <OrdersItem key={any.id}>
                            <div className="header">
                              {any.status?.toLowerCase() === 'created' ? (
                                <Link href={`/orders/new-order/${any.id}`}>
                                  <a style={{ color: '#212529' }} className="d-block">
                                    {any.name}
                                  </a>
                                </Link>
                              ) : (
                                <Link href={`/orders/order-details/${any.id}`}>
                                  <a style={{ color: '#212529' }} className="d-block">
                                    {any.name}
                                  </a>
                                </Link>
                              )}
                              <span className={`status ${any.status?.toLowerCase()}`}>{any.status}</span>
                            </div>
                            {checkValidExist(any.customer) && <div className="customer">Customer: {any.customer} </div>}
                            <div className="d-flex">
                              {checkValidExist(any.created_at) && (
                                <span className="date">
                                  <span className="state">Created:</span>
                                  &nbsp;{moment(any.created_at).format('DD/MM/YYYY')}
                                </span>
                              )}
                              {checkValidExist(any.submitted_at) && (
                                <span className="date">
                                  <span className="state">Submitted:</span>
                                  &nbsp;{moment(any.submitted_at).format('DD/MM/YYYY')}
                                </span>
                              )}
                              {checkValidExist(any.due_at) && (
                                <span className="date">
                                  <span className="state">Due:</span>
                                  &nbsp;{moment(any.due_at).format('DD/MM/YYYY')}
                                </span>
                              )}
                            </div>
                            <span className="ref d-block mb-1">
                              {checkValidExist(any.reference) && `#Ref: ${any.reference} &nbsp;&nbsp;`}

                              {checkValidExist(any.invoice_ref) && `#Invoice Ref: ${any.invoice_ref}`}
                            </span>
                            <span className="ref d-block mb-1">
                              {checkValidExist(any.customer_po_ref) && `#Customer PO Ref: ${any.customer_po_ref}`}
                            </span>
                            <span className="description">{any.description}</span>
                          </OrdersItem>
                        );
                      })
                    )}
                  </div>
                </OrdersList>
              </div>
            </div>
          </OrderDesktop>

          <OrderMobile ref={myRef} onScroll={onScroll}>
            <div className="title">Orders</div>
            <div className="filter-title" onClick={() => setShow('filter')}>
              <span>Filter</span>
              <img src="/static/images/icons/arrow-right.svg" />
            </div>
            <div className="neworder-title" onClick={() => setShow('new')}>
              <span>Create New Order</span>
              <img src="/static/images/icons/arrow-right.svg" />
            </div>
            <div className="order-table">
              <div className="header">
                <span>Orders List</span>
                <div className="search">
                  <img src="/static/images/icons/search.svg" />
                  <input type="text" placeholder="Search" />
                </div>
              </div>
              <hr />
              <div className="sort">
                <Sort>
                  <span style={{ width: '80px' }} className="d-flex">
                    Sort by:
                  </span>
                  <select
                    className="form-control border-0 bg-transparent"
                    onChange={event => {
                      setReturns(prev => ({ ...prev, sortOrder: event.target.value }));
                    }}
                    value={returns.sortOrder}>
                    <option value="asc">Date Created (ASC)</option>
                    <option value="desc">Date Created (DESC)</option>
                  </select>
                </Sort>
              </div>
              {loading || searchLoading ? (
                <div className="d-flex py-4 align-items-center justify-content-center">
                  <Loading />
                </div>
              ) : (
                returns.data.map((item, index) => (
                  <div key={index} className="item">
                    <div className={`status ${item.status?.toLowerCase()}`}>{item.status?.toLowerCase()}</div>
                    {item.status?.toLowerCase() === 'created' ? (
                      <Link href={`/orders/new-order/${item.id}`}>
                        <div className="name">{item.name}</div>
                      </Link>
                    ) : (
                      <Link href={`/orders/order-details/${item.id}`}>
                        <div className="name">{item.name}</div>
                      </Link>
                    )}
                    <div className="description">Customer: {item.description}</div>
                    <div className="date-list">
                      <div className="header">
                        {checkValidExist(item.created_at) && (
                          <span className="date">
                            <span className="state">Created:</span>
                            <span>{item.created_at}</span>
                          </span>
                        )}
                        {checkValidExist(item.submitted_at) && (
                          <span className="date">
                            <span className="state">Submitted:</span>
                            <span>{item.submitted_at}</span>
                          </span>
                        )}
                      </div>
                      <div className="footer">
                        {checkValidExist(item.due_at) && (
                          <span className="date">
                            <span className="state">Due:</span>
                            <span>{item.due_at}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="reference">#Ref: {item.reference} </div>
                    <div className="po-ref">#Customer PO Ref: {item.customer_po_ref}</div>
                    <div className="some">Some description text about this return</div>
                  </div>
                ))
              )}
              <div className="page">
                {/* <PaginationAndSearch border={false}>
                  <ul>
                    <li>
                      <span
                        className="prev-arrow"
                        onClick={handleNextPrev(returns.paginate - 1, returns.groupedPagination)}>
                        <img src="/static/images/icons/prev-arrow.svg" />
                      </span>
                    </li>
                    {returns.groupedPagination[returns.parentPaginate].map(any => {
                      return (
                        <li className={`${any === returns.paginate ? `active` : ``}`} key={any}>
                          <span
                            onClick={any === returns.paginate ? null : handleNextPrev(any, returns.groupedPagination)}>
                            {any}
                          </span>
                        </li>
                      );
                    })}
                    <li>...</li>
                    <li className={`${lastItem === returns.paginate ? `active` : ``}`}>
                      <span onClick={handleNextPrev(lastItem, returns.groupedPagination)}>{lastItem}</span>
                    </li>
                    <li>
                      <span
                        className="next-arrow"
                        onClick={handleNextPrev(returns.paginate + 1, returns.groupedPagination, 'search')}>
                        <img src="/static/images/icons/next-arrow.svg" />
                      </span>
                    </li>
                  </ul>
                </PaginationAndSearch> */}
              </div>
            </div>
            <GoUp show={showScroll} onClick={scrollGoUp}>
              <img src="/static/images/icons/arrow-up.svg" />
              <span>Go Up</span>
            </GoUp>
          </OrderMobile>
        </Layout>
      </OrderContainer>
      <MobileFilter show={show === 'filter' ? true : false}>
        <div className="header">
          <img src="/static/images/icons/arrow-left.svg" onClick={() => setShow('main')} />
          <span>Filter orders</span>
        </div>
        <hr />
        <Filter show={statuShow}>
          <form className="filter">
            <Select
              label={
                <span className="d-block customer" style={{ marginBottom: '0.625rem' }}>
                  By Customer
                </span>
              }
              options={returns.customerOptions}
              onChange={handlebylocation}
              background={`#fff`}
              border={`#D3DCE6`}
              margin={`1.25rem`}
              colorHover={`#fff`}
              colorSelected={`#fff`}
              color={`#212529`}
              backgroundSelected={`#828BAE`}
              custom={true}
              value={returns.bylocation}
              placeholder={`Select Location`}
            />
            <div className="statuses-label">Caption</div>
            <div className="statuses">
              <div className="statuses-input" onClick={handleStatu}>
                <Status statu={returns.status} />
              </div>
              <div className="status">
                <div className="radio-button">
                  <input className="form-control" type="radio" id="all" name="status" />
                  <label
                    onClick={() => {
                      handleStatu();
                      setReturns(prev => ({ ...prev, status: 'all' }));
                    }}
                    htmlFor="all">
                    All
                  </label>
                </div>
                {statusList.map((item, key) => (
                  <div key={key} className="radio-button">
                    <input className="form-control" type="radio" id={item} name="status" />
                    <label htmlFor={item}>
                      <span
                        onClick={() => {
                          handleStatu();
                          setReturns(prev => ({ ...prev, status: item }));
                        }}
                        className={`${item} status-badge`}>
                        {item === 'readyForDelivery' ? 'Ready For Delivery' : item}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button className="apply" onClick={() => setShow('main')} type="button">
              Apply
            </button>
            <div className="reset">
              <img src="/static/images/icons/x-circle.svg" />
              <span>Reset Filter</span>
            </div>
          </form>
          {/* New other */}
        </Filter>
      </MobileFilter>
      <MobileNewOrder show={show === 'new' ? true : false}>
        <div className="header">
          <img src="/static/images/icons/arrow-left.svg" onClick={() => setShow('main')} />
          <span>New Orders</span>
        </div>
        <hr />
        <Filter show={statuShow}>
          {/* New other */}
          <form action="" className="order">
            <div className="status">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="consignment"
                  name="status"
                  checked={returns.newOrderType === 'consignment'}
                  // onClick={handleCheckbox}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="all">
                  Consignment
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="sales"
                  name="status"
                  checked={returns.newOrderType === 'sales'}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label" htmlFor="all">
                  Sales Outright
                </label>
              </div>
            </div>
            <div className="order-field">
              <Input
                label={
                  checkValidExist(returns.titleError) ? (
                    <span className="text-danger d-block" style={{ marginBottom: '0.625rem' }}>
                      {returns.titleError}
                    </span>
                  ) : (
                    <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                      Order title
                    </span>
                  )
                }
                required="required"
                placeholder="Title"
                value={returns.title}
                name="title"
                title="Order title"
                onChange={handleInput('title')}
              />

              <DatePicker
                onChange={e => setReturns(prev => ({ ...prev, date: e }))}
                customInput={<DatePickerInput />}
                dateFormat="dd/MM/yyyy"
              />
              <Select
                label={
                  <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                    From Location *
                  </span>
                }
                options={returns.customerOptions}
                onChange={handlefromlocation}
                background={`#fff`}
                border={`#D3DCE6`}
                margin={`1.25rem`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                custom={true}
                value={returns.fromlocation}
                placeholder={`Select`}
              />
              <Select
                label={
                  <span className="d-block" style={{ marginBottom: '0.625rem' }}>
                    To Location *
                  </span>
                }
                options={returns.customerOptions}
                onChange={handletolocation}
                background={`#fff`}
                border={`#D3DCE6`}
                margin={`1.25rem`}
                colorHover={`#fff`}
                colorSelected={`#fff`}
                color={`#212529`}
                backgroundSelected={`#828BAE`}
                custom={true}
                value={returns.tolocation}
                placeholder={`Select`}
              />
            </div>
            <div className="submit">
              <button type="button" onClick={create} className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </Filter>
      </MobileNewOrder>
    </>
  );
};

export default Orders;
