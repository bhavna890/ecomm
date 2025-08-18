import { Trash2Icon } from "lucide-react";
import React from "react";

const DeleteCategory = ({ id, remove }) => {
    const [ open, setOpen ] = React.useState(false);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Trash2Icon onClick={() => setOpen(true)} className="text-red-500 cursor-pointer"/>

                <Dialog id = {id} remove={remove} open={open} onClose={onClose}/>
        </div>
    );
};
const Dialog = ({ id, remove, open, onClose}) => {
    const [loading, setLoading] = React.useState(false);

    const handleDelete =async () => {
        console.log(id);

        try {
            setLoading(true);
            const url = import.meta.env.VITE_SERVER_URL;
            const res = await fetch(`${url}/admin/category/${id}`, {
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();

            if(!data.success){
                alert(data.error || "failed to delete category");
                return;
            }
            // remove category from fromtend
            remove(id);
            onClose();
        } catch (error) {
           console.log(error); 
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className={`${open ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}>
            <div className="bg-white p-4 m-4 w-[300px] relative rounded">
                <button onClick={onClose} className="absolute top-1 right-3 text-xs font-bold">X</button>
                <h1> Are you sure you want to delete this category?</h1>
            <div>
                <button disabled={loading} onClick={onClose}
                className="bg-gray-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                <button disabled={loading}
                onClick={handleDelete}
                className="bg-red-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
            </div>
        </div>
    );
};

export default DeleteCategory;