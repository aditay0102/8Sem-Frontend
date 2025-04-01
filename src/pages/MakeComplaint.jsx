import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MakeComplaint = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImage] = useState('');
  const [imgPreview, setImgPreview] = useState(null);

  let email = localStorage.getItem('email');
  let name = localStorage.getItem('userName');
  let id = localStorage.getItem('userId');
  let address = process.env.REACT_APP_ADDRESS;

  let navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !desc) {
      // Display alert if either title or description is empty
      
      toast.error("Please fill out both the title and description fields.");
      return; // Prevent submission
    }
    
    const obj = {
      userName: name,
      userEmail: email,
      useId: id,
      img: img,
      title,
      description: desc,
    };
  
   
      toast.success("Complaint added");
      const res = await axios.post(`${address}/addComplaint/${id}`, obj);
      if (res.data.success) {
        navigate('/dashboard');
      } else {
        console.log(res);
      }
   
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setImage(file.name);
      setImgPreview(URL.createObjectURL(file)); // Generate image preview URL
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full bg-blue-100 mx-auto border border-gray-300 rounded-2xl p-8">
        <h1>Make Complaint</h1>
        <div className="space-y-6">
          <div>
            <label className="text-gray-800 text-sm mb-2 block flex justify-start">Title</label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block flex justify-start">Description</label>
            <textarea
              required
              rows='5'
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              placeholder="Enter details"
            />
          </div>
          <form method="POST" action={`${address}/upload`}  enctype="multipart/form-data" >
            <div>
              <input
                className="w-full text-gray-500 font-medium text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                type="file"
                name="file"
                onChange={handleImageChange}
                required
              />
              {imgPreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-800 ">Image Preview:</p>
                  <img src={imgPreview} alt="Preview" className="w-[200px] h-auto rounded-md border border-gray-300" />
                </div>
              )}
            </div>
              <button>upload</button>
          </form>
        </div>
        <div className="!mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Submit Complaint
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default MakeComplaint;