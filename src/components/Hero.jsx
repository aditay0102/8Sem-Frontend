import React from 'react'

const Hero = () => {
  return (
    <div class="flex h-auto justify-center items-center dark:bg-gray-900">
            <div class="text-center max-w-6xl mx-10">
                <p class="my-3 text-sm tracking-widest text-white from-blue-600-500 uppercase">Your moto is our Goal</p>
                <h1 class="my-3 text-3xl font-bold tracking-tight text-gray-800 md:text-5xl dark:text-gray-100">
                    The IT Department 
                    You Wish You Had.
                </h1>
                <div>
                    <p class="max-w-2xl mx-auto my-2 text-base text-gray-500 md:leading-relaxed md:text-xl dark:text-gray-400">
                        Our moto is create an ideal worplace for everyone so that our organisation can have the positive aura.  

                    </p>
                </div>
                <div class="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
                    <a
                        class="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
                        href="">Add Complaint 
                    </a>
                    <a class="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-2xl hover:shadow-neutral-400 hover:-tranneutral-y-px"
                        href="">Track Complaint
                    </a>
                </div>
            </div>
    </div>
  )
}

export default Hero