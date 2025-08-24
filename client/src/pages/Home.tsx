import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
// import { url } from "@/lib/utils";
import type { IProduct } from "@/types";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: categories, loading: categoriesLoading } = useFetch("http://localhost:4000/categories" );
  const { data: products, loading: productsLoading } = useFetch("http://localhost:4000/products");

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-3">All Categories</h1>
      {categoriesLoading && <p>loading categories</p>}
      <div className="flex gap-2">
        {categories &&
          categories.map((category: any) => (
            <Category
              key={category._id}
              name={category.name}
              slug={category.slug}
            />
          ))}
      </div>

      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {productsLoading && <p>loading products</p>}
      <div className="flex gap-2 flex-wrap">
        {products &&
          products.map((product: any) => (
            <Product key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
};

const Category = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <Link to={`/products/${slug}`}>
      <Button className="cursor-pointer hover:bg-gray-400" variant={"link"}>
        {name}
      </Button>
    </Link>
  );
};

const Product = (data: IProduct) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  // Fetch wishlist on component load
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:4000/user/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log( result);

        if (result?.wishlist && Array.isArray(result.wishlist)) {
          setWishlist(result.wishlist);
          // check if this product is already in wishlist
          setIsWishlisted(result.wishlist.some((item: any) => item._id === data._id));
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Failed to load wishlist:", error);
      }
    };

    fetchWishlist();
  }, [data._id, token]);

  // Toggle wishlist (add/remove)
  const isInWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (isWishlisted) {
        // Remove from wishlist
        await fetch(`http://localhost:4000/user/wishlist/${data._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsWishlisted(false);
        setWishlist((prev) => prev.filter((item) => item._id !== data._id));
      } else {
        // Add to wishlist
        await fetch("http://localhost:4000/user/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: data._id }),
        });
        setIsWishlisted(true);
        setWishlist((prev) => [...prev, { _id: data._id }]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  return (
    <Link to={`/product/${data.slug}`}>
      <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
        <div
          onClick={isInWishlist}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <Heart
            className={`transition ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-black"
            }`}
          />
        </div>
        <div className="w-full h-[250px]">
          <img
            src={data.images[0].url}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
          <div className="pt-3">
            <span className="font-semibold">₹{data.price}</span>/
            <span className="line-through text-xs"> {data.mrp}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Home;


