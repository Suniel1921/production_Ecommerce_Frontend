import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/UserContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getMyOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/getUserOrder`
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

  return (
    <>
      <div className="container">
        <UserMenu />
        <h4>My Order</h4>

        <div className="orderList">
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
                  <td>{order.status}</td>
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
    </>
  );
};

export default Order;
