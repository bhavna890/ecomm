// import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/card'
import type { IProduct } from '@/types'
import { Heart } from 'lucide-react'
// import { Button } from '../ui/button'
import { useFetch } from '@/hooks/useFetch'


const RelatedProducts = () => {
  const { data: products} = useFetch("http://localhost:4000/products");

  return (
 
      <div className="flex gap-2 flex-wrap">
        {products && products.map((product: any) => <Product key={product._id} {...product} />)}
      </div>
    // </div>
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
  )
}
export default RelatedProducts