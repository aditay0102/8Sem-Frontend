import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const UpdateComplaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let id = location.state.itemId;
  let address = process.env.REACT_APP_ADDRESS;

  let token = Cookies.get("token");
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImage] = useState('');
  const [imgPreview, setImgPreview] = useState(null); // State for image preview

  const handleSubmit = async () => {
    if (!title || !desc) {
      // Display alert if either title or description is empty
      
      toast.error("Please fill out both the title and description fields.");
      return; // Prevent submission
    }
    const obj = {
      img,
      title,
      description: desc
    };

    try {
      const res = await axios.put(
        `${address}/editComplaint/${id}`,
        obj,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      if (res.data.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setImage(file.name);
      setImgPreview(URL.createObjectURL(file)); // Create image preview URL
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div className="w-[50vw] max-sm:w-full h-[100vh] p-6 bg-white border border-gray-300 sm:rounded-md">
        <div>
          <label className="block mb-6">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border outline-none border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Add title of complaint"
            />
          </label>

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

          <label className="block mb-6">
            <span className="text-gray-700">Description</span>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border outline-none border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              rows="7"
              placeholder="Please describe your problem in details"
            ></textarea>
          </label>
          <div className="mb-6">
            <button
              onClick={handleSubmit}
              className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
            >
              Submit
            </button>
          </div>
        </div>
        <Toaster/>
      </div>
    </div>
  );
};

export default UpdateComplaint;