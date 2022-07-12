import React  from "react"
import { Loading } from "components";
import OrderTableData from "containers/Picking/components/OrderTableData";

const Summary = ({ loading, data }) => {
  if (loading) {
    return (
      <div className="d-flex w-100 py-4 align-items-center justify-content-center">
        <Loading />
      </div>
    )
  }
  return (
    <OrderTableData data={data}/>
  )
}


export default Summary
