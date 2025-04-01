import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminComplaint from '../components/AdminComplaint';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
const AdminDashboard = () => {
const[data,setData] = useState([]);
let navigate = useNavigate();

let address = process.env.REACT_APP_ADDRESS;

useEffect(()=>{
  let id = localStorage.getItem('role');
  console.log(id);
  if(id != 1){
    toast.error("login as Admin for access ");
    navigate('/login');
  }
    axios.get(`${address}/AllComplaints`)
    .then((res)=>{
        console.log(res.data);
        setData(res.data);
    })

},[])

  return (
    <div className='bg-gray-100'><h1 className='text-xl '>All Complaints</h1>

        {
             data.map((complaint,index) => (
                <AdminComplaint id={complaint._id} title={complaint.title} desc = {complaint.description} img={complaint.img} status={complaint.status} date={complaint.createdAt} user={complaint.userName} userEmail={complaint.userEmail} userId={complaint.userId}  />
            ))
        }
        <Toaster/>
    </div>
    
    // admin should be able to see all complaints   
  )
}

export default AdminDashboard