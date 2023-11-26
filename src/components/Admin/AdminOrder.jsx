import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/UserContext";
import { Select } from "antd";
// import { option } = Select

const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Processing",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setStatusChange] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getMyOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allOrders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (auth?.token) getMyOrders();
  }, [auth?.token]);

  const orderStatusHandler = async (id, value) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/upateOrderStatus/${id}`,
        { status: value }
      );
      getMyOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <div className="menuContent">
          <AdminMenu />
          
          <div className="orderList">
          <h2> Manage All Orders</h2>
            <table className="tableContainer">
              <thead>
                <tr className="tableRow">
                  <th scope="col">S.No</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Orders Date</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Select bordered={false} onChange={(value) => orderStatusHandler(order._id, value)} defaultValue={order.status}>
                        {status.map((s, i) => (
                          <Option key={i} value={s}>{s}</Option>))}
                      </Select>
                    </td>
                    <td>{order.buyer.name}</td>
                    {/* <td>{moment(order.ordersDate).format("MMMM D, YYYY")}</td> */}
                    <td>{moment(order.createAt).fromNow()}</td>
                    <td>{order.payment.success ? "Success" : "Failed"}</td>
                    <td>{order.products.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="container">
              {orders.map((order, orderIndex) => (
                <div key={orderIndex} className="orderContainer">
                  {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="cart_content">
                      <img
                        src={`${
                          import.meta.env.VITE_REACT_APP_BACKEND_PORT
                        }/productPhoto/${product._id}`}
                        alt=""
                      />
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <h4>Price $ {product.price}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminOrder;
