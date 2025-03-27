import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';

import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
  let address = process.env.REACT_APP_ADDRESS;
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: email,
      password: password
    };

    axios.post(`${address}/Login`, user)
      .then((res) => {
        
        console.log(res.data.success);
        Cookies.set('token', res.data.accessToken, { expires: 7 });
        
        if (res.data.success) {
          toast.success("Successfully logined")
          let str = res.data.user.name;
          let name = str.replace(/,/, '');
          localStorage.setItem("userName", name);
          
          str = res.data.user.email;
          let email = str.replace(/,/, '');
          localStorage.setItem("email", email);

          str = res.data.user._id;
          let id = str.replace(/,/, '');
          localStorage.setItem("userId", id);

          str = res.data.user.role;
          let role = str.replace(/,/, '');
          localStorage.setItem("role", role);


          // creating default header in axios for tokken and role 
          

          if(role == 1){  //  ```````````````````` -------           change it later 
            navigate('/adminDashboard')
          }
          else{
            navigate('/dashboard')

          }
        } 
      
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      
        
      });
  }

  return (
    <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
       
        <button onClick={()=>{console.log(address)}}>click</button>
        <form onSubmit={handleSubmit}>
          <div class="space-y-6">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" required />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" required />
            </div>

            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember-me" class="text-gray-800 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div class="!mt-8">
            <button type="submit" class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Login</button>
          </div>
          <p class="text-gray-800 text-sm mt-6 text-center">Don't have an account? <Link to="/signup" class="text-blue-600 font-semibold hover:underline ml-1">Register</Link></p>
        </form>
      </div>
      
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default Login;
