import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Stepper({ order }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const steps = ["Processing", "Dispatched", "Delivered"];
  const [error, setError] = useState(undefined);
  const initialStep =
    order.orderStatus === "Processing"
      ? 2
      : order.orderStatus === "Dispatched"
      ? 3
      : order.orderStatus === "Delivered"
      ? 4
      : 1;
  const isComplete = order.orderStatus === "Delivered" ? true : false;
  const isCanceled = order.orderStatus === "Cancelled" ? true : false;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [complete, setComplete] = useState(isComplete);

  const handleCancel = async () => {
    try {
      const res = await fetch(`/api/user/order/cancel-order/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Cancelled",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard?tab=canceled");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between mx-auto">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-36 step-item ${
              currentStep === i + 1 && "active"
            } ${(i + 1 < currentStep || complete) && "complete"} `}
          >
            <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-700 rounded-full font-semibold text-white step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      <div className="w-full sm:flex-row flex-col border shadow-lg mt-10 py-5 gap-3">
        {order.products.map((products) => (
          <div className="flex flex-col sm:flex-row w-full items-center px-5 border-b py-4">
            <img
              src={products.product.images[0]}
              alt={order.products[0].product.images[0]}
              className="w-20 h-20 object-cover mx-32"
            />
            <div className="ml-3">
              <h1 className="line-clamp-2 text-xl">{products.product.title}</h1>
              <p className="text-gray-500">
                Price: Rs. {products.product.price}
              </p>
              <p className="text-gray-500">Color: {order.products[0].color}</p>
              <p className="text-gray-500">
                Quantity: {order.products[0].count}
              </p>
            </div>
          </div>
        ))}
        <div className="w-32 mx-auto my-5 flex flex-col justify-end ">
          <button
            onClick={handleCancel}
            disabled={isComplete || isCanceled || currentStep === 3}
            className={`button ${
              isComplete || currentStep === 3 ? "disabled:bg-gray-500" : ""
            }`}
          >
            {isComplete
              ? "Delivered!"
              : currentStep === 3
              ? "Unable to cancel"
              : isCanceled
              ? "Cancelled"
              : "Cancel"}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <div className="flex w-full sm:flex-row flex-col border shadow-lg my-2 py-5 gap-3">
        <div className="flex-1 w-full items-center px-5 border-r">
          <div className="ml-3">
            <h1 className="line-clamp-2 text-xl">Delivery Address</h1>
            <p className="text-gray-700 line-clamp-3">{currentUser.address}</p>
            <p className="text-gray-500">Phone: {currentUser.mobile}</p>
          </div>
        </div>
        <div className="flex-1 flex-col justify-end pr-5">
          <div className="flex-1 w-full items-center px-5">
            <div className="ml-3">
              <h1 className="line-clamp-2 text-xl">Total Summary</h1>
              <p className="text-gray-700 line-clamp-3">
                Payment:{" "}
                {order.paymentIntent.method === "COD" && "Cash On Delivery"}
              </p>
              <p className="text-gray-700 line-clamp-3">
                Total: {order.paymentIntent.currency}
                {order.paymentIntent.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
