import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ComplaintCard from '../components/ComplaintCard';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Link } from 'react-router';
import { TiMessageTyping } from 'react-icons/ti';

const Dashboard = () => {
  const [count, setCount] = useState();
  const [msg, setMsg] = useState();
  const [userData, setUserData] = useState([]);

  let navigate = useNavigate();
  let email = localStorage.getItem('email');
  let name = localStorage.getItem('userName');
  let id = localStorage.getItem('userId');
  let tokken = Cookies.get('token');
  let address = process.env.REACT_APP_ADDRESS;

  function handleClick() {
    navigate('/addcomplaint');
  }

  useEffect(() => {
   
    axios
    .get(`${address}/getAllComplaints/${id}`, {
      headers: {
        Authorization: tokken,
      },
    })
    .then((res) => {
      console.log(res.data);
   
        console.log(res.data.chats.length);
        setCount(res.data.chats.length);
        setUserData(res.data.result);
        setMsg(res.data.result.length);
      });
  }, []);

  return (
    <div >
      <div className="bg-teal-600 w-full h-[100px] p-3  max-sm:h-[4rem] ">
        <div className=" flex justify-between ">
          <div className=" w-full h-auto flex justify-between">
            <div className='w-half h-full flex'>
              <img
                className="inline-block shrink-0 size-[62px] rounded-full max-sm:size-[40px]"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Avatar"
              />
              <div className="ms-3 max-sm:hidden">
                <h3 className="font-semibold h-10 text-gray-800">{name}</h3>
                <p className="text-sm font-medium text-gray-400">{email}</p>
              </div>

            </div>
            {msg > 0 && (
              <div className="w-[100px]  h-[50px]  flex  text-white justify-center text-center  ">
                <div className=" w-full flex flex-col ">
                  <Link
                    to={'/userChat'}
                    state={{ userId: id }}
                    className="text-5xl flex justify-center"
                  >
                    <TiMessageTyping />
                  </Link>
                  <div className="ml-[-15px] h-[50px] max-sm:mt-[8px] ">
                  <p className='text-xs '> admin</p>
                  </div>
                </div>
                  {count > 0 && (
                    <p className="text-yellow-300  max-sm:text-sm">you have messages</p>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-screen overflow-scroll">
        <h1 className="text-5xl">Your Complaints</h1>
        {userData.map((complaint, index) => (
          <ComplaintCard
            key={index}
            id={complaint._id}
            title={complaint.title}
            desc={complaint.description}
            img={complaint.img}
            status={complaint.status}
          />
        ))}
        <button
          className="fixed bottom-10 right-10 bg-teal-600 h-[40px] w-[150px] rounded-xl"
          onClick={handleClick}
        >
          Add complaint +
        </button>
      </div>
    </div>
  );
};

export default Dashboard;