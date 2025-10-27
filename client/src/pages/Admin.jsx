import React, { useState } from 'react';

export  function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
        const response  = await fetch("http://localhost:3000/me/admin", {
            method: 'POST',
            body: formDataToSend
        });
         const data = await response.json();
      console.log('Success:', data);
      
      setMessage({ type: 'success', text: 'Blog published successfully! 🎉' });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          author: '',
          category: '',
          description: '',
          image: null
        });
        setPreview(null);
        setMessage({ type: '', text: '' });
      }, 2000);
        
    } catch (error) {
        console.log("Error while sending data to backend from admin", error.message)
    }
    
    alert('Blog submitted! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="World News">World News</option>
                <option value="Politics">Politics</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief summary "
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length} characters
            </p>
          </div>

          <div className="mb-8">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                {preview ? (
                  <div className="space-y-4">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-purple-600 font-medium">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="text-purple-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Publish Blog
            </button>
            <button
              onClick={() => {
                setFormData({
                  title: '',
                  author: '',
                  category: '',
                  description: '',
                  content: '',
                  image: null,
                  tags: ''
                });
                setPreview(null);
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {formData.title && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              {preview && (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="text-purple-700 font-medium text-sm mb-2">
                {formData.author || 'Author'} • {new Date().toLocaleDateString()}
              </div>
              <h2 className="text-2xl font-bold mb-2">{formData.title || 'Your Title Here'}</h2>
              <p className="text-gray-600 mb-3">{formData.description || 'Your description will appear here...'}</p>
              {formData.category && (
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                  {formData.category}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}