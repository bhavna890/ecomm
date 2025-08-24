
// import React from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { toast } from "sonner";
// import { url } from "@/lib/utils";
// import useUserStore from "@/store/user.store";

// type WLProduct = {
//   _id: string;
//   slug: string;
//   title: string;
//   price: number;
//   mrp?: number;
//   images?: { url: string }[];
// };

// const ensureArray = <T,>(val: unknown, fallback: T[] = [] as T[]) =>
//   Array.isArray(val) ? (val as T[]) : fallback;

// const Wishlist = () => {
//   const navigate = useNavigate();
//   const { user, wishlist, setWishlist } = useUserStore() as any;

//   const [items, setItems] = React.useState<WLProduct[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     const load = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token || !user) {
//           navigate("/signin?redirect=/wishlist");
//           return;
//         }

//         const res = await fetch(`${url}/user/wishlist`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 401) {
//           navigate("/signin?redirect=/wishlist");
//           return;
//         }

//         const json = await res.json();

//         // shapes supported: array OR {wishlist:[...]} OR {data:[...]}
//         let arr: any[] = [];
//         if (Array.isArray(json)) arr = json;
//         else if (Array.isArray(json?.wishlist)) arr = json.wishlist;
//         else if (Array.isArray(json?.data)) arr = json.data;

//         // product docs may be at x.item or x
//         const prods: WLProduct[] = arr.map((x: any) => x?.item || x).filter(Boolean);
//         setItems(prods);

//         const ids = prods.map((p) => p._id);
//         setWishlist?.(ids);
//       } catch (e) {
//         console.error(e);
//         toast.error("Failed to load wishlist");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [navigate, setWishlist, user]);

//   const removeOne = async (productId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // optimistic
//     const prev = [...items];
//     setItems((it) => it.filter((p) => p._id !== productId));
//     const currentIds = ensureArray<string>(wishlist);
//     setWishlist?.(currentIds.filter((id) => id !== productId));

//     try {
//       const res = await fetch(`${url}/user/wishlist/${productId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (!json?.success) {
//         // revert
//         setItems(prev);
//         setWishlist?.(currentIds);
//         toast.error(json?.error || "Couldn't remove item");
//       } else {
//         toast.success("Removed");
//       }
//     } catch {
//       setItems(prev);
//       setWishlist?.(currentIds);
//       toast.error("Network error");
//     }
//   };

//   if (loading) return <div className="p-4">Loading wishlist...</div>;

//   return (
//     <div className="p-3">
//       <h1 className="text-xl font-semibold mb-3">My Wishlist</h1>

//       {items.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <div className="flex gap-2 flex-wrap">
//           {items.map((p) => (
//             <Link key={p._id} to={`/product/${p.slug}`}>
//               <Card className="relative w-[200px] p-0 overflow-hidden gap-0">
//                 <button
//                   className="absolute top-2 right-2 cursor-pointer"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     removeOne(p._id);
//                   }}
//                   aria-label="Remove from wishlist"
//                 >
//                   <Heart className="text-red-500" fill="currentColor" />
//                 </button>

//                 <div className="w-full h-[250px]">
//                   <img src={p.images?.[0]?.url} alt="" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-2">
//                   <h1 className="text-sm font-semibold line-clamp-2">{p.title}</h1>
//                   <div className="pt-3">
//                     <span className="font-semibold">₹{p.price}</span>/
//                     <span className="line-through text-xs"> {p.mrp}</span>
//                   </div>
//                 </div>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}

//       {items.length > 0 && (
//         <div className="mt-6">
//           <Link to="/products/all">
//             <Button className="cursor-pointer">Continue Shopping</Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

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
