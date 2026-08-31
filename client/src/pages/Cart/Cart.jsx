import { Link } from "react-router-dom";
import "./Cart.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  // Calculate total items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 0),
    0
  );

  return (
    <>
      <NavBar />

      <section className="cart-page">

        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (

          <div className="empty-cart">
            <h2>Your cart is empty 🛒</h2>

            <p>
              Add some products to your cart to
              continue shopping.
            </p>

            <Link
              to="/shop"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>
          </div>

        ) : (

          <div className="cart-container">

            {/* =========================
                CART PRODUCTS
            ========================= */}

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* IMAGE */}

                  <div className="cart-item-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>No Image</span>
                    )}

                  </div>


                  {/* PRODUCT INFORMATION */}

                  <div className="cart-item-info">

                    <h2>{item.name}</h2>

                    <p>
  ₦{Number(item.price || 0).toLocaleString()}
</p>
                    {/* QUANTITY */}

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>


                  {/* RIGHT SIDE */}

                  <div className="cart-item-right">

                  <h3>
  ₦
  {(
    Number(item.price || 0) *
    Number(item.quantity || 0)
  ).toLocaleString()}
</h3>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>


            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <div className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">

                <span>Items</span>

                <strong>
                  {totalItems}
                </strong>

              </div>

              <div className="summary-row">

                <span>Subtotal</span>

                <strong>
                  ₦{totalPrice.toLocaleString()}
                </strong>

              </div>

              <hr />

              <div className="summary-total">

                <span>Total</span>

                <strong>
                  ₦{totalPrice.toLocaleString()}
                </strong>

              </div>


              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="continue-shopping"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        )}

      </section>

    </>
  );
}

export default Cart;