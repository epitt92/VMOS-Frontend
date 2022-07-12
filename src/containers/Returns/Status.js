import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from 'layout';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ApiLocations, ApiReturnOrders } from 'api';
import { Loading } from 'components';
import { checkValidExist, log } from 'helpers';

const Nav = styled.nav`
  .breadcrumb{
    .breadcrumb-item{
      a{
        color: #8492A5;
      }
    }
  }
`

const TitleDetail = styled.div`
  font-size: 18px;
  font-family: 'OpenSans Bold';
  color: #3B4857;
`

const Campaign = styled.div`
  background: #fff;
  box-shadow: 0px 1px 10px rgba(39, 52, 67, 0.08);
  border-radius: 5px;
  margin-top: 1.5rem;
  padding-bottom: 2rem;
  .start-date{
    padding: 0.375rem 0.75rem;
    background: #EBEFF5;
    border-radius: 5px;
    display: inline-flex;
    width: auto;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
  }
  .title{
    padding: 0.75rem 1.75rem;
    border-bottom: 1px solid #E0E6ED;
    > b{
      font-size: 1rem;
    }
  }
  .header{
    .status{
      padding: 0.125rem 1rem;
      border-radius: 30px;
      margin-left: 1.125rem;
      font-family: "OpenSans Semibold";
      font-size: 1rem;
    }
    .status-submitted{
      background: #7591F4;
      color: #fff;
    }
    .status-created{
      background: #D09248;
      color: #fff;
    }
    .status-approved{
      background: #79B616;
      color: #fff;
    }
    .statu-rejected{
      background: #F46B59;
      color: #fff;
    }
    .status-cancelled{
      background: #F46B59;
      color: #fff;
    }
    padding: 0.75rem 1.75rem;
    > div.d-flex{
      > span.date{
        padding: 0.375rem 0.75rem;
        background: #EBEFF5;
        border-radius: 5px;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        width: auto;
        margin-top: 1rem;
        margin-bottom: 0.75rem;
        color: #3B4857;
        &:first-of-type{
          margin-right: 0.625rem;
        }
        .state{
          color: #8492A5;
        }
      }
    }
    > b{
      font-size: 1.125rem;
      display: block;
      margin-bottom: 0.5rem;
    }
  }
  .content{
    margin-top: 1rem;
    padding-bottom: 2rem;
    .table > :not(:first-child){
      border-top: 0px;
    }
    .table{
      .row-content{
        img{
          width: 100px;
          height: auto;
        }
      }
    }
    .table > :not(caption) > * > *{
      padding: 1.25rem 1.25rem;
      text-align: center; 
      vertical-align: top;
      .btn-unassigned{
        display: inline-flex;
        align-items:center;
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
        &:after{
          margin-left: 0.25rem;
          content: '';
          width: 8px;
          height: 8px;
          display: inline-flex;
          background-repeat: no-repeat;
          background-image: url('/static/images/icons/arrow-down-small.svg');
        }
      }
    }
  }
`

const Order = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
  .btn-approve{
    margin-left: 10px;
    color: #79B616;
    background: rgba(121, 182, 22, 0.1);
    border: 1px solid #79B616;
  }
  .btn-reject{
    margin-left: 10px;
    color: #F46B59;
    background: rgba(244, 107, 89, 0.1);
    border: 1px solid #F46B59;
  }
`

const Status = ({ id }) => {
  const [detail, setDetail] = React.useState({
    data: {},
    items: []
  })
  const [loading, setLoading] = React.useState(true);

  const getDetail = async(code) => {
    try {
      const { data } = await ApiReturnOrders.detail(code);
      setDetail(prev => ({ ...prev, 
        data: data.data.modal, 
        items: data.data.items
      }));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  // const handleChange = (code, type) => async(e) => {
  //   const { value } = e.target
  //   setDetail(prev => 
  //     ({...prev, 
  //       data: prev.data.map((any) => {
  //         if(any.product_code === code){
  //           return{
  //             ...any,
  //             [type]: value
  //           }
  //         }
          
  //         return {...any}
  //       }),
  //   }));
  // }
  
  React.useEffect(() => {
    getDetail(id)
  }, [id])


  log(detail, 'info');

  return (
    <Layout>
      {
        loading ?
        <div className='d-flex w-100 align-items-center justify-content-center'>
          <Loading />
        </div>
      :
      <>
        <Nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link scroll={false} href={`/returns`}>
                <a>Returns </a>
              </Link>
            </li>
            <li className="breadcrumb-item"><a >{detail.data.title} </a></li>
          </ol>
        </Nav>
        <TitleDetail>{detail.data.title}</TitleDetail>
        <Campaign>
          <div className='title d-flex align-items-center'>
            <b>Return Details</b>
            {
              checkValidExist(detail.data.approvedAt) ? null
              : !checkValidExist(detail.data.rejectedAt) &&
              <Order>
                <span>Set Order Status:</span>
                <button className='btn btn-approve'>
                  Approve
                </button>
                <button className='btn btn-reject'>
                  Reject
                </button>
              </Order>
            }
          </div>
          <div className='header'>
            <b>
              {detail.data.title}
              <span className={`status status-${detail.data.status.toLowerCase()}`}>
                {detail.data.status}
              </span>
            </b>
            <p className='m-0'>
              Customer: Basic Point Bedok North
            </p>
            <div class="d-flex">
              {
                checkValidExist(detail.data.createdAt) 
                &&
                <span class="date">
                  <span class="state">
                    Created:
                  </span>&nbsp;
                  {detail.data.createdAt}
                </span>
              }
              {
                checkValidExist(detail.data.submittedAt)
                && 
                <span class="date">
                  <span class="state">Submitted:</span>
                  &nbsp;
                  {detail.data.submittedAt}
                </span>
              }
            </div>
            <span className='ref d-block mb-3'>
              {checkValidExist(detail.data.reference) && `#Ref: ${detail.data.reference}`}
              {checkValidExist(detail.data.customerReturnRef) && `#Customer Ref: ${detail.data.customerReturnRef}`}
            </span>
            <span className='d-block text-read'>
              {detail.data.description}
            </span>
          </div>
          <div className='content'>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th className='text-start' scope="col">Products</th>
                    <th className='text-center' scope="col">Alt SKU</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Defective Qty</th>
                  </tr>
                </thead>
                <tbody>
                {detail.items.map((any, index) => {
                  return(
                    <tr className='row-content' key={any.id}>
                      <td style={{width: '20%'}}>
                        <div className='d-flex align-items-start'>
                          <img src={any.product.image.url} />
                          <div>
                            <b className='d-block text-start'>{any.product.productCode}</b>
                            <span className='text-read'>{any.product.upc}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{any.altSku}</div>
                      </td>
                      <td>{any.quantity}</td>
                      <td>{any.defectiveQuantity}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </Campaign>
        </>
      }
    </Layout>
  );
}

export default Status;
