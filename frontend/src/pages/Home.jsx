import React, { useEffect, useState } from "react";
import ProductCardSmall from "../components/ProductCardSmall";
import { Link } from "react-router-dom";
import { Banner, Carousel } from "flowbite-react";

export default function Home() {
  const [products, setProducts] = useState();
  const [productsTrend, setProductsTrend] = useState();
  const [productsRecent, setProductsRecent] = useState();
  console.log(productsTrend);
  const BannerImage = [
    "https://icms-image.slatic.net/images/ims-web/45ab55b4-4e47-4c61-8107-96d5b2e5d8f6.jpg_1200x1200.jpg",
    "https://icms-image.slatic.net/images/ims-web/ba960ea0-649c-4ad3-9a15-68ff406b248b.jpg",
    "https://icms-image.slatic.net/images/ims-web/d07e1cb5-5a83-4012-83f9-dacc88a1d4d1.jpg",
    "https://icms-image.slatic.net/images/ims-web/a67609fd-34d9-41fe-9919-758e8ccce73d.png",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/get?page=1&limit=9&sort=-sold`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/api/product/get?page=1&limit=10&sort=-totalrating`
        );
        const data = await res.json();
        if (res.ok) {
          setProductsTrend(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/api/product/get?page=1&limit=10&sort=-createdAt`
        );
        const data = await res.json();
        if (res.ok) {
          setProductsRecent(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="max-w-6xl w-full flex flex-col mx-auto my-5 p-2">
      <div className="h-56 sm:h-96 xl:h-96 2xl:h-96">
        <Carousel>
          {BannerImage.map((images) => (
            <img
              className="flex h-full items-center justify-center"
              src={images}
              alt=""
            />
          ))}
        </Carousel>
      </div>

      {products && products.length > 0 && (
        <div div className="my-5">
          {" "}
          <h1 className="text-2xl px-2 my-2 text-gray-600">Just For You</h1>
          <div className="w-full grid justify-center align-items-center ">
            <div className="flex align-items-center  overflow-y-auto">
              <div className="card flex-0 mx-2 flex gap-2 ">
                {products.map((product) => (
                  <Link
                    className="hover:shadow-md bg-white rounded-md"
                    to={`/products/${product.slug}`}
                    key={product._id}
                  >
                    <ProductCardSmall product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {productsTrend && productsTrend.length > 0 && (
        <div div className="my-5">
          {" "}
          <h1 className="text-2xl px-2 my-2 text-gray-600">Best Rating</h1>
          <div className="w-full grid justify-center align-items-center ">
            <div className="flex align-items-center  overflow-y-auto">
              <div className="card flex-0 mx-2 flex gap-2 ">
                {productsTrend.map((product) => (
                  <Link
                    className="hover:shadow-md bg-white rounded-md"
                    to={`/products/${product.slug}`}
                    key={product._id}
                  >
                    <ProductCardSmall product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {productsRecent && productsRecent.length > 0 && (
        <div div className="my-5">
          {" "}
          <h1 className="text-2xl px-2 my-2 text-gray-600">Recent Products</h1>
          <div className="w-full grid justify-center align-items-center ">
            <div className="flex align-items-center  overflow-y-auto">
              <div className="card flex-0 mx-2 flex gap-2 ">
                {productsRecent.map((product) => (
                  <Link
                    className="hover:shadow-md bg-white rounded-md"
                    to={`/products/${product.slug}`}
                    key={product._id}
                  >
                    <ProductCardSmall product={product} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
