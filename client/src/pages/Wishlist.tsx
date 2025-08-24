import React, { useEffect, useState } from "react";
import type { IProduct, IWishlist, } from "@/types";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:4000/user/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {wishlist.map((w) => {
            const product = typeof w.item === "string" ? null : (w.item as IProduct);

            if (!product) return null;

            return (
              <div key={w._id} className="border rounded-xl p-3 shadow relative">
                <img
                  src={product._id}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
