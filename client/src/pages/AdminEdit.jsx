import React from 'react'
import { useEffect , useState} from 'react';

const AdminEdit = () => {
 const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const response = await fetch("http://localhost:3000/");
        const res = await response.json();
        setPosts(res);
      } catch (error) {
        console.log("Error while fetch data from backend for Admin/edit", error);
      }
    };
    fetchPosts();
  }, []);

  const handleClick = async (postId) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      if (response.ok) {
        // Remove post from state if deletion was successful
        setPosts(posts.filter(post => post._id !== postId));
        alert('Blog post deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to delete post: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post. Please try again.');
    }
  }

  return (
         <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">All Blogs</h1>
              <p className="text-emerald-500 text-sm mt-1">Active Blogs</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Author Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Blog Title</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
                {posts.map((item) => (
                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{item.author}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.title}</td>
                  <td className="py-4 px-6 text-sm text-emerald-500">Online</td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => handleClick(item._id)}
                      className="text-sm font-semibold text-red-600 hover:text-red-800  hover:cursor-pointer transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminEdit;