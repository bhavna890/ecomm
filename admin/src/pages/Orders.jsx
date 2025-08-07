import React from "react";
import Layout from "../component/Layout";
import withAuth from "../component/withAuth";
import { useEffect, useState } from 'react';
import NewOrder from "../dialogs/NewOrder";

const Orders = () =>{
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
     const getOrder = (newOrder) => {
        setData([...data, newOrder]);
      };
      const updateOrder = (id, name, slug) => {
        setData(
          data.map((item) => {
            if(item._id === id){
              return{...item, name, slug};
            }
            return item;
          })
        );
      };
      const cancelOrder = (id) => {
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
  
          setOrders(data.data);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center p-3 border-b border-gray-300 h-[50px] select-none">
        <h2 className="text-2xl font-semibold">Orders</h2>

         <NewOrder add={getOrder} />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2">ORDER ID</th>
                <th className="px-4 py-2">CUSTOMER</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Shipped'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.totalAmount}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="text-blue-600 hover:underline">View</button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                     <button
                      className="text-red-500 hover:underline"
                      onClick={() => updateOrder(order._id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default withAuth(Orders);