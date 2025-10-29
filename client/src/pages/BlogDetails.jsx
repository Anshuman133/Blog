import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const BlogDetails = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogById(blogId);
    }, [blogId]);

    const fetchBlogById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/blog/${id}`);
            const data = await response.json();
            setBlog(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.log(`Error while fetch blogdetails: ${error.message}`);
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!blog) return <div>Blog not found</div>;

    return (
        <div className="min-h-screen bg-white py-12">
      <article className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
          {blog.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
              alt={blog.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">{blog.author}</p>
            <p className="text-sm text-gray-500">{blog.date}</p>
          </div>
        </div>

        {/* Three Dots Indicator */}
        <div className="flex justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>

        {/* Featured Image */}
        <div className="mb-10">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <p>{blog.description}</p>
        </div>  
      </article>
    </div>
    )
}