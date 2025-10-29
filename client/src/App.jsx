import React, { useEffect, useState } from 'react';
import Arrow from '../src/assets/up-right-arrow.png';
import {Link} from 'react-router-dom';


const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const response = await fetch("http://localhost:3000/");
        const res = await response.json();
        setPosts(res);
      } catch (error) {
        console.log("Error while fetch data from backend for home", error);
      }
    };
    fetchPosts();
  }, []);

  return (
       <div className=' sm:mx-10  md:mx-26 mt-10'> 
 
      {/* Top home */}
       <div className='flex justify-center border-y-2 pb-4 border-gray-400 '>
        <h1 className='lg:text-[270px] md:text-[150px] text-7xl font-sans font-bold leading-none '>THE BLOG</h1>
       </div>

      {/* Blog Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts && posts.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md flex flex-col h-full">
            <img 
               src={item.image}
               alt={item.title}
               className="h-56 w-full object-cover rounded-t-xl"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className=" mb-1 flex justify-between">
                <span className='text-purple-700 font-medium text-sm'> {item.author} </span>
                <Link to=  {`/blog/${item._id}`} > 
                <img className='w-8 h-8' src={Arrow} alt="arrow" /></Link>
              </div>
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
