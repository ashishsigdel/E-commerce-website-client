import { IoIosStar } from "react-icons/io";

export default function ProductCardSmall({ product }) {
  return (
    <div className="w-[195px] sm:w-[215px]">
      <img
        src={product.images[0]}
        alt={product.images[0]}
        className="w-full aspect-square object-cover"
      />
      <div className="p-2">
        <h1 className="h-12 line-clamp-2">{product.title}</h1>
        <div className="flex gap-1 text-orange-500 text-2xl">
          <p>Rs.</p>
          <p>{product.price}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-yellow-400 flex gap-1 items-center">
            <IoIosStar />
            {product.totalrating}/5
          </p>
          <p className="text-gray-500">{product.sold} solds</p>
        </div>
      </div>
    </div>
  );
}
