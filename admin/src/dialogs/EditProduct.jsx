import { Pencil, X } from "lucide-react";
import React, { useEffect } from "react";

const EditProduct = ({ id, product, categories, update }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <Pencil className="cursor-pointer" />
      </button>

      <Dialog id={id} product={product} categories={categories} update={update} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

const Dialog = ({ id, product, categories, update, open, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = React.useState({ ...product, category: product?.category?._id });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!data.success) {
        // show toast
        alert(data.error || "Something went wrong!");
        console.log(data.required);
        return;
      }

      update(id, data.data);
      setFormState({
        title: "",
        description: "",
        price: 0,
        mrp: 0,
        rating: 0,
        stock: 0,
        category: "",
      });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormState({ ...product, category: product.category._id });
  }, [product]);

  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}
    >
      <div className="bg-white p-4 m-4 w-[600px] relative rounded">
        <button onClick={onClose} className="absolute top-1 right-3 text-xs font-bold cursor-pointer">
          <X />
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Edit product</h1>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Title</label>
              <input
                name="title"
                className="w-full rounded border text-sm border-gray-300 p-1"
                type="text"
                placeholder="Enter the title"
                value={formState.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Description</label>
              <textarea
                name="description"
                className="w-full rounded border text-sm border-gray-300 p-1"
                type="text"
                placeholder="Enter the description"
                value={formState.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <label className="text-sm">Price</label>
                <input
                  name="price"
                  className="w-full rounded border text-sm border-gray-300 p-1"
                  type="number"
                  placeholder="Enter the price"
                  value={formState.price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label className="text-sm">MRP</label>
                <input
                  name="mrp"
                  className="w-full rounded border text-sm border-gray-300 p-1"
                  type="number"
                  placeholder="Enter the MRP"
                  value={formState.mrp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <label className="text-sm">Stock</label>
                <input
                  name="stock"
                  className="w-full rounded border text-sm border-gray-300 p-1"
                  type="number"
                  placeholder="Enter the stock"
                  value={formState.stock}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label className="text-sm">Rating</label>
                <input
                  name="rating"
                  className="w-full rounded border text-sm border-gray-300 p-1"
                  type="number"
                  placeholder="Enter the rating"
                  value={formState.rating}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">Category</label>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="w-full rounded border text-sm border-gray-300 p-1"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                disabled={loading}
                onClick={handleUpdate}
                className="mt-5 bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold"
              >
                {loading ? "updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;