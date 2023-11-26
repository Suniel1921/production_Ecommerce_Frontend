import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //remove cart item if click on remove button
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      toast.success("item deleted");
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //for total cart item price sum
  const toalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      // return total;
      // to show usd curency  icon
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      // const {data} = await axios.get(`api/v1/produt/braintree/token`)
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/braintree/token`
      );
      console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment

  const handlePayment = async () => {
    console.log("handlePayment function called");
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(`Payment failed. Please try again. ${error}`);
    }
  };

  return (
    <>
      <section className="container">
        <div className="cartContainer">
          <div className="items">
            <div className="authChecking">
              <div>
                <h2> Hello ! {auth?.token && auth.user.name}</h2>
                <h4>
                  {cart?.length ? (
                    <span>
                      You have {cart?.length} items in your cart
                      {auth?.token ? "" : " Please login to checkout"}
                    </span>
                  ) : (
                    "Your Cart is Empty"
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* added item cart show with checkout option */}

        <div className="addedCartContainer">
          <div className="left_cart_Items">
            {cart.map((p) => (
              <>
                <div className="cart_content">
                  <img
                    src={`${
                      import.meta.env.VITE_REACT_APP_BACKEND_PORT
                    }/productPhoto/${p._id}`}
                    alt=""
                  />
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <h4>Price $ {p.price}</h4>
                    <button
                      className="removeBtn both_Btn "
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="right_checkout_option">
            <h2>Your Cart Summary</h2>
            <p>Checkout | Total | Payment</p>
            <hr />
            <h3>Total : {toalPrice()} </h3>

            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    // onInstance={(instance) => setInstance(instance)}
                    onInstance={(instance) => {
                      console.log("DropIn instance initialized:", instance);
                      setInstance(instance);
                    }}
                  />

                  <button className="both_Btn paymentBtn" onClick={handlePayment}
                   disabled={!clientToken || !cart?.length || loading || !instance}>
                    {/* disabled={!loading || !instance || !auth?.user?.address} */}
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
