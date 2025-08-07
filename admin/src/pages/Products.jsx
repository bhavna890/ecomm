import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import withAuth from "../component/withAuth";
import DeleteProduct from "../dialogs/DeleteProduct";
import AddProduct from "../dialogs/AddProduct";
import EditProduct from "../dialogs/EditProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [deleteProduct, setDeleteProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...data, { ...newProduct, category: categories.find((c) => c._id === newProduct.category) }]);
  };
  
  const updateProduct = (id, newData) => {
    setData(
      data.map((product) => {
        if (product._id === id) {
          return { ...product, ...newData, category: categories.find((c) => c._id === newData.category) };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/product`, {
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

        setProducts(data.data);

        // fetch categories
         const res2 = await fetch(`${url}/admin/category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data2 = await res2.json();

          if (!data2.success) {
          alert(data2.error || "Something went wrong!");
          return;
        }

        setCategories(data2.data);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Products</h2>
          <AddProduct add={addProduct} categories={categories} />
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                  <th className="px-4 py-2">TITLE</th>
                  <th className="px-4 py-2">DESCRIPTION</th>
                  <th className="px-4 py-2">CATEGORY</th>
                  <th className="px-4 py-2">PRICE / MRP</th>
                  <th className="px-4 py-2">STOCK</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{product.title}</td>
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">${product.price + " / " + product.mrp}</td>
                    <td className="px-4 py-2">{product.stock || 0}</td>
                    <td className="px-4 py-2 space-x-2">
                       </td>
                     
                       <td className="flex gap-2 px-6 py-4 text-sm text-gray-500">
                    <EditProduct id={product._id} product={product} categories={categories} update={updateProduct} />
                    <DeleteProduct id={product._id} remove={deleteProduct} />
                  </td>

                   
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Delete dialog
        {deleteProduct && (
          <DeleteProduct
            productId={deleteProductId}
            onClose={() => setDeleteProductId(null)}
            onDeleted={handleDeleted}
          />
        )} */}
      </div>
    </Layout>
  );
};

export default withAuth(Products);
