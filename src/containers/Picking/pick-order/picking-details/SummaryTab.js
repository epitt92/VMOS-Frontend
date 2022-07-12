import React from "react"
import { Loading } from "components";
import { usePickOrder } from "../hooks/PickOrderContext";
import OrderTableData from "containers/Picking/components/OrderTableData";

const Summary = ({ id }) => {
  const { orders, loadingOrders, handlePickOrder } = usePickOrder()

  if (loadingOrders) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }

  return (
    <OrderTableData id={id} data={orders} onDelete={handlePickOrder} />
  )
}
export default Summary
