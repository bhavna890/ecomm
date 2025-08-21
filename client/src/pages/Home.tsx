import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import type { IProduct } from "@/types";
import { Heart } from "lucide-react";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "sonner";

const Home = () => {
  const { data: categories, loading: categoriesLoading } = useFetch("http://localhost:4000/categories");
  const { data: products, loading: productsLoading } = useFetch("http://localhost:4000/products");

  return (
    <div className="p-3">
      <h1 className="text-xl font-semibold mb-3">All Categories</h1>
      {categoriesLoading && <p>loading categories</p>}
      <div className="flex gap-2">
        {categories &&
          categories.map((category: any) => <Category key={category._id} name={category.name} slug={category.slug} />)}
      </div>

      <h1 className="text-xl font-semibold my-3">All Products</h1>
      {productsLoading && <p>loading products</p>}
      <div className="flex gap-2 flex-wrap">
        {products && products.map((product: any) => <Product key={product._id} {...product} />)}
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
  return (
    <Link to={`/product/${data.slug}`}>
      <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
        <div className="absolute top-2 right-2 cursor-pointer">
          <Heart className="text-black" />
        </div>
        <div className="w-full h-[250px]">
          <img src={data.images[0].url} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-2">
          <h1 className="text-sm font-semibold line-clamp-2">{data.title}</h1>
          <div className="pt-3">
            <span className="font-semibold">₹{data.price}</span>/<span className="line-through text-xs"> {data.mrp}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Home;