import React from 'react'
import axios from 'axios';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'


const ComplaintCard = ({id,title,desc ,img,status}) => {
    let image = `http://localhost:5000/images/${img}`;
    let navigate = useNavigate();
    let tokken = Cookies.get("token");
    let address = process.env.REACT_APP_ADDRESS;
    
function handleDeletion(){
   axios.delete(`${address}/deleteComplaint/${id}`,
    {
        headers: {
          'Authorization':   tokken
        }
    } 

   )
    .then((res)=>{
        console.log(res.data);

        if(res.data.success == true){
            window.location.reload(false);
        }
    })

}






    
  return (
    <div className="flex items-center justify-center w-full h-auto p-4">
            <div className={`lg:w-[89%]  flex flex-col lg:flex-row items-center justify-between p-4 rounded-md 
            ${status === 'completed' ? 'bg-green-400' : status === 'cancled' ? 'bg-red-400' : 'bg-white'} 
            border-2 border-teal-600 shadow-md w-full lg:max-w-[1200px] transition duration-430 delay-0 ease-in-out hover:transform hover:-translate-y-1 hover:scale-105  hover:bg-teal-100  text-left max-sm: flex max-sm:flex-col max-sm:  max-sm:border-0
            
            `}>
                <div className="w-full lg:w-[400px]   lg:mb-0  max-sm:w-[200px] max-sm:h-[150px] flex justify-center max-sm:mb-5 ">
                    <img src={image} alt="something" className="object-cover w-[90%] h-auto  rounded-md " />
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

                    <div className="text-sm lg:text-lg mb-4">
                        <span className="font-normal"></span>
                    </div>

                    <div className="flex gap-2 flex-wrap justify-end">
                        
                        <Link to={'/updatecomplaint'} state={{itemId: id}} className="bg-teal-600 px-4 py-2 text-white rounded w-full sm:w-auto" >
                            Edit
                        </Link>
                        <button className="bg-red-900 px-4 py-2 text-white rounded w-full sm:w-auto" onClick={handleDeletion}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ComplaintCard