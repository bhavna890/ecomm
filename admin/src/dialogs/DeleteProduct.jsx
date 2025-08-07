import { Trash, X } from "lucide-react";
import React from "react";

const DeleteProduct = ({ id, remove }) => {
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Trash onClick={() => setOpen(true)} className="text-red-500 cursor-pointer" />

      <Dialog id={id} remove={remove} open={open} onClose={onClose} />
    </div>
  );
};

const Dialog = ({ id, remove, open, onClose }) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.error || "failed to delte product!");
        return;
      }

      // remove product from frontend
      remove(id);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}
    >
      <div className="bg-white p-4 m-4 w-[300px] relative rounded">
        <button onClick={onClose} className="absolute top-1 right-3 text-xs font-bold">
          <X />
        </button>

        <h1>Are you sure you want to delete this product?</h1>

        <div className="flex justify-end gap-2 mt-2">
          <button
            disabled={loading}
            onClick={onClose}
            className="bg-gray-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;

// import React, { useState } from "react";

// const DeleteProduct = ({ productId, onClose, onDeleted }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       const url = import.meta.env.VITE_SERVER_URL;

//       const res = await fetch(`${url}/admin/product/${productId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const contentType = res.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await res.json();

//         if (!data.success) {
//           alert(data.error || "Failed to delete product.");
//           return;
//         }

//         onDeleted(productId);
//         onClose();
//       } else {
//         const errorText = await res.text();
//         console.error("Non-JSON response:", errorText);
//         alert("Unexpected response from server.");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Failed to delete product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white rounded p-6 w-[300px]">
//         <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//         <p className="text-sm mb-6">Are you sure you want to delete this product?</p>
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={onClose}
//             className="px-3 py-1 text-sm rounded bg-gray-300 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDelete}
//             disabled={loading}
//             className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteProduct;


