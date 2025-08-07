import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import withAuth from "../component/withAuth";
import NewCategory from "../dialogs/NewCategory";
import EditCategory from "../dialogs/EditCategory";
import DeleteCategory from "../dialogs/DeleteCategory";


const Categories = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const addCategory = (newCategory) => {
      setData([...data, newCategory]);
    };
    const updateCategory = (id, name, slug) => {
      setData(
        data.map((item) => {
          if(item._id === id){
            return{...item, name, slug};
          }
          return item;
        })
      );
    };
    const deleteCategory = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/category`, {
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none">
        <h1 className="font-bold">Categories</h1>

        <NewCategory add={addCategory} />
      </div>

      <div className="flex justify-center items-center">{!data.length && loading && <h1>Loading...</h1>}</div>

      {data.length !== 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="border border-x-0 border-gray-300">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total || 0}</td>
                  <td className="flex gap-2 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <EditCategory id={item._id} name={item.name} edit={updateCategory} />
                    <DeleteCategory id={item._id} remove={deleteCategory} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  ); 
}

export default withAuth(Categories);