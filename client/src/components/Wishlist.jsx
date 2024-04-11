import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { currentUser } = useSelector((state) => state.user);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (currentUser.wishlist.length > 0) {
          const wishlistQueryString = currentUser.wishlist
            .map((productId) => `productId=${productId}`)
            .join("&");

          const res = await fetch(
            `/api/product/getproduct?${wishlistQueryString}`
          );
          const data = await res.json();
          if (res.ok) {
            setWishlistProducts(data.products);
            console.log(data);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [currentUser]);

  return (
    <div>
      {currentUser && currentUser.wishlist.length > 0 ? (
        <div className="m-6 p-3 w-full">
          <div className="my-4">
            <h1 className="text-2xl">My Wishlists</h1>
          </div>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Product image</Table.HeadCell>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Color</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {wishlistProducts.map((product) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Link to={`/products/${product.slug}`}>
                      <img
                        src={product.images}
                        alt="Product"
                        className="h-16"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/products/${product.slug}`}>
                      <p className="line-clamp-3 w-36">{product.title}</p>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{product.category}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{product.price}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{product.color}</p>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      ) : (
        <div className="m-6 flex flex-col gap-3">
          <p className="text-red-500 text-xl">You have no wishlist yet.</p>
        </div>
      )}
    </div>
  );
}
