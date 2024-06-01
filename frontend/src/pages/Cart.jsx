import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import {
  applyCouponStart,
  applyCouponSuccess,
  applyCouponFailure,
} from "../redux/user/userSlice";

export default function Cart() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartProduct, setCartProduct] = useState({ products: [] }); // Initialize with an empty products array
  const [coupon, setCoupon] = useState("");
  const [totalAfterCoupon, setTotalAfterCoupon] = useState(0);
  const [couponApply, setCouponApply] = useState(false);
  console.log(couponApply);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/user/cart");
        const data = await res.json();
        if (res.ok) {
          setCartProduct(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [currentUser]);

  const applyVoucher = async (e) => {
    e.preventDefault();
    setTotalAfterCoupon(0);
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/user/cart");
        const data = await res.json();
        if (res.ok) {
          setCartProduct(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    try {
      dispatch(applyCouponStart());
      const res = await fetch(`/api/user/cart/applycoupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupon: coupon }),
      });
      const data = await res.json();
      if (res.ok) {
        setTotalAfterCoupon(data);
        setCouponApply(true);
        fetchCart();
        dispatch(applyCouponSuccess());
      } else {
        console.log(data.message);
        dispatch(applyCouponFailure(data.message));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(applyCouponFailure(error.message));
    }
  };

  const handleOrder = async () => {
    const clearCart = async () => {
      try {
        const res = await fetch("/api/user/empty-cart", {
          method: "DELETE",
        });
        if (res.ok) {
          navigate("/dashboard?tab=order-status");
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    try {
      const res = await fetch("/api/user/cart/cash-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          COD: true,
          couponApplied: couponApply,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (productId) => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/user/cart");
        const data = await res.json();
        if (res.ok) {
          setCartProduct(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    try {
      const res = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        fetchCart();
        setCartProduct((prevCartProduct) => {
          const updatedProducts = prevCartProduct.products.filter(
            (product) => product.product._id !== productId
          );

          return {
            ...prevCartProduct,
            products: updatedProducts,
          };
        });
      } else {
        console.log(`Failed to remove product from the cart`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {cartProduct !== null && cartProduct.products.length > 0 ? (
        <div className="max-w-6xl min-h-screen bg-white w-full flex flex-col mx-auto my-5 p-2">
          <div className="flex sm:flex-row flex-col sm:gap-10 mx-2">
            <div className="sm:w-2/3 w-full flex items-center justify-center">
              <div className="w-full h-full">
                <h1 className="text-2xl py-3 border-b w-full">
                  Selected Products:{" "}
                </h1>
                {cartProduct.products.map((product) => (
                  <div key={product.id} className="py-4 border-b items-center">
                    <Link
                      to={`/products/${product.product.slug}`}
                      className="flex gap-2 hover:shadow-sm p-3"
                    >
                      <div className="">
                        <img
                          src={product.product.images[0]}
                          alt={product.product.title}
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="flex sm:flex-row ml-10 flex-col justify-between">
                        <div>
                          <h1 className="sm:text-xl line-clamp-2">
                            {product.product.title}
                          </h1>
                          <p className="text-gray-400">{`Color: ${product.product.color}`}</p>
                          <div className="flex gap-10 items-center">
                            <p className="text-orange-500 text-2xl">{`Rs. ${product.product.price}`}</p>
                            <div className="w-10 h-10  flex items-center justify-center gap-1">
                              <p className="bg-slate-100 px-3 py-2 rounded-md">
                                {product.count}
                              </p>
                              <p> items</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(product.product._id)}
                        className="button "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:w-1/3 w-full flex items-center justify-center">
              <div className="w-full h-full flex flex-col gap-2">
                <h1 className="text-xl py-3 w-full">Order Summary: </h1>
                <p className="text-gray-400">{`Subtotal (${cartProduct.products.length} items)`}</p>
                <form onSubmit={applyVoucher}>
                  <div className="flex gap-3 items-center justify-between">
                    <TextInput
                      id="coupon"
                      type="text"
                      placeholder="Enter Voucher Code"
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    />

                    <Button type="submit" gradientMonochrome="success">
                      {loading ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  {error && <p className="my-2 text-red-500">{error}</p>}
                </form>
                <div className="flex justify-between mt-3 border-t pt-3 items-center">
                  <p>Total</p>
                  <div>
                    <p className="text-2xl text-orange-500">
                      Rs. {cartProduct.cartTotal}
                    </p>
                    {totalAfterCoupon !== 0 && (
                      <p className="text-xl text-orange-500">{`- Rs. ${(
                        cartProduct.cartTotal - cartProduct.totalAfterDiscount
                      ).toFixed(2)}`}</p>
                    )}
                  </div>
                </div>
                {totalAfterCoupon !== 0 &&
                  totalAfterCoupon === cartProduct.totalAfterDiscount && (
                    <div className="flex justify-between mt-3 border-t pt-3 items-center">
                      <p>SubTotal: </p>
                      <p className="text-2xl text-orange-500">{`Rs. ${cartProduct.totalAfterDiscount}`}</p>
                    </div>
                  )}
                <button onClick={handleOrder} className="button my-5">
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-5 p-3 min-h-screen">
          <p className="text-2xl text-red-500">You have no product in cart.</p>
        </div>
      )}
    </>
  );
}
