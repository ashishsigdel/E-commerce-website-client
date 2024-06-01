import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function OrderList() {
  const { currentUser } = useSelector((state) => state.user);
  const [myOrders, setMyOrders] = useState([]);
  console.log(myOrders);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const res = await fetch("/api/user/get-orders");
        const data = await res.json();
        if (res.ok) {
          setMyOrders(data);
        } else {
          console.log(data.message);
        }
      };
      fetchOrders();
    } catch (error) {
      console.log(error.message);
    }
  }, [currentUser]);

  return (
    <div className="m-5">
      <h1 className="text-3xl font-semi-bold">Orders: </h1>
      <div className="flex gap-3 flex-wrap w-full m-5 mx-auto">
        {myOrders.map((order) => (
          <div key={order._id}>
            {order.orderStatus !== "Delivered" &&
              order.orderStatus !== "Cancelled" && (
                <ProductCard product={order} />
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
