import React from 'react'

const NewCategory = ({ add }) => {
    const [open, setOpen] = React.useState(false);

    const onclose =() => {
        setOpen(false);
    };

  return (
    <div>
        <button onClick={() => setOpen(true)}
            className='bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold'>
            New Category
            </button>

            <Dialog add={add} open={open} onclose={onclose}/>
    </div>
  );
};

const Dialog = ({ add, open, onclose}) => {
    const [input, setInput] =React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleCreate = async () => {
        // create category api call
        try {
            setLoading(true);
            const res = await
            fetch("http://localhost:4000/admin/category",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
                body:JSON.stringify({name: input.trim()}),
            });
            const data = await res.json();

            if(!data.success){
                // show toast
                alert(data.error || "something went wrong!");
                return;
            }
            add(data.data);
            setInput("");
            onclose();
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false);
        }
         
    };
    return (
        <div className={`${open ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}>
           <div className='bg-white p-4 m-4 w-[300px] relative rounded'> 
            <button onClick={onclose} className='absolute top-1 right-3 text-xs font-bold cursor-pointer'>x</button>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold'>Add new category</h1>
                <div className='flex gap-2 items-center mt-3'>
                    <label>Name:</label>
                    <input className='w-full rounded border text-sm border-gray-300 p-1' type="text" placeholder='Enter the category name' 
                    value={input} onChange={(e) => setInput(e.target.value)}/> 
                </div>
                <button disabled={!input || loading}
                className={`float-right w-fit bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 ${!input && "disabled:cursor-not-allowed"} ${loading && "disabled:cursor-progress"}`}
                onClick={handleCreate}>
                    {loading ? "creating...": "Create"}
                </button>
            </div>
            </div> 
        </div>
    )        
}

export default NewCategory;