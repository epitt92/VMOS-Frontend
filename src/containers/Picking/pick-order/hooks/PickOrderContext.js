import { ApiOrders } from 'api';
import React, { useEffect, useState } from 'react';
import { usePageLoading } from "components/PageLoading/PageLoading";

const PickOrderContext = React.createContext(
  {}
);

export const PickOrderProvider = (props) => {
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [orders, setOrders] = useState([])
  const { showPageLoading, closePageLoading } = usePageLoading()

  const handleAddProduct = () => {
    getOrders()
  }

  const handlePickOrder = async (id, data) => {
    showPageLoading()
    await ApiOrders.updateItems(id, [data])
    getOrders()
    closePageLoading()
  }

  const getOrders = async () => {
    setLoadingOrders(true);
    const resp = await apiOrders()
    setOrders(resp.data.data.items);
    setLoadingOrders(false);
  }

  const apiOrders = async () => {
    const result = await ApiOrders.getItems(props.id);
    return result
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <PickOrderContext.Provider
      value={{
        handleAddProduct,
        handlePickOrder,

        loadingOrders,
        orders,
        getOrders,
      }}

    >
      {props.children}
    </PickOrderContext.Provider>
  );
};

export const usePickOrder = () => React.useContext(PickOrderContext);
