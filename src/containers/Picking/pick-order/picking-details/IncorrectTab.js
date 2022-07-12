import React from "react"
import styled from '@emotion/styled';
import { usePickOrder } from "../hooks/PickOrderContext";
import OrderTableData from "containers/Picking/components/OrderTableData";

const Incorrect = () => {
  const { orders, loadingOrders } = usePickOrder()
  const items = orders.filter(data => data.pick_qty != data.quantity)

  if (loadingOrders) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }

  return (
    <OrderTableData data={items}/>
  )
}
export default Incorrect
