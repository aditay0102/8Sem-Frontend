import React from 'react'
import { Link } from 'react-router'
import Cookies from 'js-cookie'

import { Header } from '../components/Header'
import Footer from '../components/Footer'

import Hero from '../components/Hero'

const Home = () => {

  
  function handleLogout(){
    Cookies.remove("token");
  }


  return (
    <div>
       
        <Header/>

        <section className='lg:h-screen lg:w-full sm:w-auto sm:h-auto '>          
          
          <img className="  lg:w-screen lg:h-[50rem] sm:h-auto sm:auto  md:w-screen md:h-auto " src="https://cdn.pixabay.com/photo/2021/04/08/14/01/complaint-6161776_1280.png" alt="image description" />
          
          <ul className='sm:absolute sm:  lg:flex-col  lg:justify-content-start lg:text-left lg:text-7xl text-white  absolute  lg:top-[35%] lg:left-[5rem] md:absolute max-sm:absolute max-sm:top-[15%] max-sm:left-[2rem]
          md:top-[25%] md:left-[5%] md:text-3xl
          md:bg-cyan-700
          '>
            <li >Happy</li> 
            <li>Workplace</li>
            <li>Leads to</li>
            <li>Productivity</li>
          </ul>
          <ul className='flex-col justify-content-start lg:text-left  lg:text-7xl text-white max-sm:text-red  absolute lg:top-[35%] lg:right-[3rem] max-sm:top-[15%] max-sm:right-[2rem] 
           md:top-[25%] md:right-[5%] md:text-3xl 
           md:bg-cyan-700
          '>
            <li >Easily</li>
            <li>Register</li> 
            <li>Your Complaints </li>
           
          </ul>
        

        </section>

        <Hero/>

        <Footer/> 



    </div>
  )
}

export default Home