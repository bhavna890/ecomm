import { PencilIcon } from 'lucide-react';
import React from 'react'

const EditCategory = ({ id, name, edit }) => {
    const [open, setOpen] = React.useState(false);

    const onClose = () => {
        setOpen(false);
    };
  return (
       <div>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <PencilIcon className="cursor-pointer" />
      </button>

      <Dialog id={id} name={name} edit={edit} open={open} onClose={onClose} />
    </div>
  );
};
  const Dialog = ({ id, name, edit, open, onClose }) => {
  const [input, setInput] = React.useState(name || "");
  const [loading, setLoading] = React.useState(false);

  const handleEdit = async () => {
    // create category api call
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/admin/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: input.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        // show toast
        alert(data.error || "Something went wrong!");
        return;
      }

      console.log(data);
      const n = data.data.name;
      const s = data.data.slug;

      edit(id, n, s);
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
          X
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Edit category</h1>

          <div className="flex gap-2 items-center mt-3">
            <label>Name:</label>
            <input
              className="w-full rounded border text-sm border-gray-300 p-1"
              type="text"
              placeholder="Enter the category name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button
            disabled={!input || loading}
            className={`float-right w-fit bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 ${
              !input && "disabled:cursor-not-allowed"
            } ${loading && "disabled:cursor-progress"}`}
            onClick={handleEdit}
          >
            {loading ? "updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default EditCategory;