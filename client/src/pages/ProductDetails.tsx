import ImageContainer from "@/components/shared/ImageContainer";
import RelatedProducts from "@/components/shared/RelatedProducts";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { url } from "@/lib/utils";
import useUserStore from "@/store/user.store";
import { Loader, ShoppingCart} from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
// import type { IProduct } from "../types";

const ProductDetails = () => {
    const router = useNavigate();
  const { slug } = useParams();
  const { user, cart, addCartItem, removeCartItem } = useUserStore();

  const { data, loading } = useFetch(`${url}/product/${slug}`);
  // console.log(user);
  const [readMore, setReadMore] = React.useState(false);

  // console.log(data);
  
  // cart
  const addToCart = async () => {
    // check if user is logged in
    if (!user) {
      router(`/signin?redirect=/product/${slug}`);
      return;
    }

    // add item into client cart
    addCartItem({ item: data._id, quantity: 1 });

    // add item into server cart
    try {
      const res = await fetch(`${url}/user/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ item: data._id, quantity: 1 }),
      });
      const json = await res.json();
       if (!json.success) {
        toast.error(json.error || "something went wrong!");
        // remove item from client cart
        removeCartItem(data._id);
        return;
      }
    } catch {
      console.log("something went wrong!");
      toast.error("something went wrong!");
      // remove item from client cart
      removeCartItem(data._id);
    }
  };

  if (loading || !data)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <Loader className="animate-spin" size={40} />
      </div>
    );
      const isInCart = cart?.some((item) => item.item === data._id);
     
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="p-2 w-full">
          <ImageContainer data={data.images}  />
            
        </div>
        <div className="w-full p-2">
          <Link to={`/products/${data.category.slug}`} className="text-blue-500 font-semibold">
            {data.category.name}
          </Link>
          <h1 className="text-2xl font-semibold py-3">{data.title}</h1>
          <p className={readMore ? "" : "line-clamp-3"}>{data.description}</p>
          <p className="text-blue-500 font-semibold cursor-pointer" onClick={() => setReadMore(!readMore)}>
            Read {readMore ? "Less" : "More"}
          </p>

          <div className="py-6">
            <span className="font-semibold text-2xl">₹{data.price}</span>/
            <span className="line-through text-lg">₹{data.mrp}</span>
            <div className="text-xs italic">Inclusive of all taxes</div>
          </div>

          {/* <div>
          <span className="font-semibold">⭐{data.rating}/5</span>
        </div> */}

          <div className="flex gap-2 w-full justify-between">
          
          <Button
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"
              onClick={isInCart ? () => router("/cart") : addToCart}
            >
              <ShoppingCart /> {isInCart ? "Added! Go to Cart" : "Add to cart"}
            </Button>
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600 cursor-pointer">Buy Now</Button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <p className="text-sm italic">no reviews yet!</p>
      </div>
      <div className="py-10">
        <h1 className="text-2xl font-semibold">People also like this - </h1>
      </div>
      <div>
        <RelatedProducts/>
      </div>
    </div>
  );
};

export default ProductDetails;