import { Button, Select, SidebarItem, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCardSmall from "../components/ProductCardSmall";
import { Sidebar } from "flowbite-react";
import { HiFilter } from "react-icons/hi";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "",
    category: "uncategorized",
    page: "1",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    const pageFromUrl = urlParams.get("page");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/product/get?page=${pageFromUrl}&limit=12&searchTerm=${searchTermFromUrl}&sort=${sortFromUrl}`
      );
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
        if (data.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
      <div className="flex gap-3 max-w-6xl w-full mx-auto my-4 border-b px-2">
        <Link to={"/"}>Home</Link>
        <p>/</p>
        <p className="cursor-pointer text-orange-500">Search Result</p>
      </div>
      <div className="max-w-6xl bg-white w-full flex flex-col mx-auto p-2">
        <div className="flex sm:flex-row flex-col">
          <Sidebar aria-label="" className="w-full md:w-72 ">
            <form onSubmit={handleSubmit}>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Items>
                    <SidebarItem icon={HiFilter}>Filters</SidebarItem>
                  </Sidebar.Items>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="flex items-center gap-2 justify-center">
                  <span>SortBy: </span>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id="sort"
                  >
                    <option value="">Best Match</option>
                    <option value="-sold">Top sales</option>
                    <option value="-createdAt">Newest Arrival</option>
                    <option value="-price">High to low</option>
                    <option value="price">Low to high</option>
                  </Select>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <button type="submit" className="button">
                    Apply Filter
                  </button>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </form>
          </Sidebar>
          <div className="w-full justify-center align-items-center ">
            <div className="flex align-items-center gap-3">
              <div className="flex flex-wrap gap-2 ">
                {products.map((product) => (
                  <Link
                    className="hover:shadow-lg shadow-md bg-white rounded-md"
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
      </div>
    </>
  );
}
