import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { Link } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';


const AdminComplaint = ({ id, title, desc, img, status, date, user, userEmail,userId }) => {
    let image = `http://localhost:5000/images/${img}`;
    let navigate = useNavigate();
    let tokken = Cookies.get("token");
    const dateOnly = date.split("T")[0];
    let address = process.env.REACT_APP_ADDRESS;
    
   
    let role = localStorage.getItem('role');

    function handleDeletion() {
        axios.delete(`${address}/updateStatusComplaints/${id}`,
            {
                headers: {
                    'Authorization': tokken,
                    
                }
            }
        )
        .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
                window.location.reload(false);
            }
        });
    }

    function handleStatus(newStatus) {
        axios.put(`${address}/updateStatusComplaints/${id}`, { status: newStatus },
            {
                headers: {
                    'Authorization': tokken,
                    'role' : role
                }
            }
        )
        .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
                window.location.reload(false);
            }
            else{
                toast.error("login as Admin for access ");
                navigate('/login');
            }
        });
    }

    return (
        <div className="flex items-center justify-center w-full h-auto p-4">
            <div className="flex flex-col lg:flex-row items-center justify-between p-4 rounded-md bg-white shadow-md w-full lg:max-w-[1200px] transition duration-430 delay-0 ease-in-out hover:transform hover:-translate-y-1 hover:scale-105 hover:border-2 border-teal-600 text-left
            ">
                <div className="w-full lg:w-[400px] mb-4 lg:mb-0">
                    <img src={image} alt="something" className="object-cover w-full h-auto rounded-md" />
                </div>
                <div className="w-full lg:ml-6">
                    <h1 className="font-bold text-2xl lg:text-3xl mb-2 flex justify-start">{title}</h1>
                    
                    <hr className="h-[1px] my-2 border-0 bg-gray-700" />

                    <div className="text-sm lg:text-lg mb-4">
                        <p className="font-normal ">{desc}</p>
                    </div>

                    <hr className="h-[1px] my-2 border-0 bg-gray-700" />

                    <div className="text-sm lg:text-lg mb-2 t">
                        <span className="font-semibold ">Status:</span> <span className="font-normal">{status}</span>
                    </div>
                    <div className="text-sm lg:text-lg mb-2 t">
                        <span className="font-semibold ">Send by:</span> <span className="font-normal">{user}</span>
                    </div>
                    <div className="text-sm lg:text-lg mb-2 t">
                        <span className="font-semibold ">UserEmail:</span> <span className="font-normal">{userEmail}</span>
                    </div>

                    <div className="text-sm lg:text-lg mb-4">
                        <span className="font-normal">{dateOnly}</span>
                    </div>

                    <div className="flex gap-2 flex-wrap justify-end">
                        <Link to={'/message' } state={{userId : userId}}  className="bg-teal-600 px-4 py-2 text-white rounded w-full sm:w-auto" onClick={() => handleStatus("accepted")}>
                            Message 
                        </Link>
                        <button className="bg-teal-600 px-4 py-2 text-white rounded w-full sm:w-auto" onClick={() => handleStatus("accepted")}>
                            Accept
                        </button>
                        <button className="bg-green-600 px-4 py-2 text-white rounded w-full sm:w-auto" onClick={() => handleStatus("completed")}>
                            Complete
                        </button>
                        <button className="bg-red-900 px-4 py-2 text-white rounded w-full sm:w-auto" onClick={() => handleStatus("cancled")}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default AdminComplaint;