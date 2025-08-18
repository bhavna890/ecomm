
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../component/Layout";

import { LoaderCircle, Pencil, X } from "lucide-react";
import ImageContainer from "../component/ImageContainer";

const Product = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imgDeleting, setImgDeleting] = useState(null);

  console.log(slug)

  useEffect(() => {
    const getProduct = async () => {
      try { 
        setLoading(true);
        const res = await fetch("http://localhost:4000/admin/product/" + slug, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.error || "Something went wrong!");
          return;
        }

        setData(data.data);
        setImages(data.data.images);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  const handleDeleteImg = async (public_id) => {
    try {
      setImgDeleting(public_id);
      const filteredImgs = images.filter((i) => i.public_id !== public_id);
      // update db
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${serverUrl}/admin/product/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ public_id }),
      });
      const result = await res.json();
      if (!result.success) {
        alert(result.error || "Something went wrong!");
        return;
      }

      setImages(filteredImgs);
    } catch (error) {
      console.log(error);
    } finally {
      setImgDeleting(null);
    }
  };

  if (loading) return <Layout>Loading...</Layout>;

  if (!data && !loading) return <Layout>Product not found!</Layout>;

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Details</h1>

          <button className="bg-blue-400 cursor-pointer p-1 text-sm px-2 rounded text-white font-semibold flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {images?.map((img, i) => (
            <div key={i} className="relative">
              {imgDeleting === img.public_id && (
                <div className="absolute inset-0 w-full h-full bg-black/50 z-50">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                    <LoaderCircle className="w-8 h-8 animate-spin" />
                  </div>
                </div>
              )}

              <img src={img.url} alt="" key={img} className="w-20 h-20 object-cover" />
              <X
                className="absolute top-0 right-2 cursor-pointer"
                size={20}
                color="red"
                onClick={() => handleDeleteImg(img.public_id)}
              />
            </div>
          ))}
        </div>

        {images?.length < 5 && <ImageContainer productId={data._id} limit={5 - images.length} />}

        <div>
          <label className="font-semibold">Title</label>
          <div className="border border-gray-300 p-2 rounded">{data.title}</div>
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <div className="border border-gray-300 p-2 rounded">{data.description}</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-semibold">Price</label>
            <div className="border border-gray-300 p-2 rounded">{data.price}</div>
          </div>

          <div>
            <label className="font-semibold">MRP</label>
            <div className="border border-gray-300 p-2 rounded">{data.mrp}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-semibold">Rating</label>
            <div className="border border-gray-300 p-2 rounded">{data.rating}</div>
          </div>

          <div>
            <label className="font-semibold">Stock</label>
            <div className="border border-gray-300 p-2 rounded">{data.stock}</div>
          </div>
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <div className="border border-gray-300 p-2 rounded">{data.category?.name || "-"}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;