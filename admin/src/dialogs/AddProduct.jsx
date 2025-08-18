import React from 'react';

const AddProduct = ({ add, categories }) => {
  const [open, setOpen] = React.useState(false);

  const onclose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold"
      >
        Add Product
      </button>

      <Dialog add={add} categories={categories} open={open} onclose={onclose} />
    </div>
  );
};

const Dialog = ({ add,categories, open, onclose }) => {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    price: 0,
    mrp: 0,
    rating: 0,
    stock: 0,
    category: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const { title, description, price, mrp, rating, category } = form;

    if (!title || !description || !price || !mrp || !rating || !category) {
      alert('All required fields must be filled.');
      return;
    }

    if (Number(mrp) < Number(price)) {
      alert('MRP must be greater than price.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/admin/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || 'Something went wrong!');
        console.log(data.required)
        return;
      }

      add(data.data);
      setForm({
        title: '',
        description: '',
        price: 0,
        mrp: 0,
        rating: 0,
        stock: 0,
        category: '',
      });
      onclose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className={`${open ? 'flex' : 'hidden'
        } fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}
    >
      <div className="bg-white p-4 m-4 w-[400px] relative rounded">
        <button
          onClick={onclose}
          className="absolute top-1 right-3 text-xs font-bold cursor-pointer"
        >
          x
        </button>
        <div className="flex flex-col gap-2 text-sm">
          <h1 className="font-bold">Add new product</h1>

          {/* {['title', 'description', 'price', 'mrp', 'rating', 'stock', 'category'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize">{field}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                type={['price', 'mrp', 'rating', 'stock'].includes(field) ? 'number' : 'text'}
                className="rounded border text-sm border-gray-300 p-1"
              />
            </div>
          ))} */}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <label className="text-sm">Title</label>
              <input className='w-full rounded border text-sm border-green-300 p-1'
                type='text' placeholder='Enter the title' name='title'
                value={form.title} onChange={handleChange}/>
            </div>
            <div className='flex flex-col gap-1'>
              <label className="text-sm">Description</label>
              <textarea className='w-full rounded border text-sm border-green-300 p-1'
                type='text' placeholder='Enter the description'name='description' 
                  value={form.description}
                onChange={handleChange}/>
            </div>
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className="text-sm">Price</label>
                <input className='w-full rounded border text-sm border-green-300 p-1'
                  type='number' placeholder='Enter the price' name='price'
                   value={form.price}
                  onChange={handleChange} />
              </div>
           
                <div className='w-full'>
                  <label className="text-sm">MRP</label>
                  <input className='w-full rounded border text-sm border-green-300 p-1'
                    type='number' placeholder='Enter the mrp' name='mrp' 
                     value={form.mrp}
                  onChange={handleChange} />
                </div>
            </div>
            <div className='flex gap-2'>
               <div className='w-full'>
              <label className="text-sm">Stock</label>
              <input className='w-full rounded border text-sm border-green-300 p-1'
              type='number' placeholder='Enter the stock' name ="stock"
               value={form.stock}
                  onChange={handleChange}/>
            </div>
              <div className='w-full'>
                  <label className="text-sm">Rating</label>
                  <input className='w-full rounded border text-sm border-green-300 p-1'
                    type='number' placeholder='Enter the rating' name='rating' 
                     value={form.rating}
                  onChange={handleChange}/>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
              <label className="text-sm">Category</label>
              <select 
               name='category'
                value={form.category}
                onChange={handleChange}
               className='w-full rounded border text-sm border-gray-300 p-1'>
                <option value=''> Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={loading}
              className={`float-right w-fit bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50 ${loading && 'disabled:cursor-progress'
                }`}
              onClick={handleCreate}
            >
              {loading ? 'Adding...' : 'Add product'}
            </button>

          </div>
        </div>
      </div>
      </div>
      );
};

      export default AddProduct;
             

