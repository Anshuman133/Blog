import express from 'express';
import 'dotenv/config';
import cors from 'cors'; 
import Blog from './db/model.js';
import fs from 'fs';
import { upload } from './middlewares/multer.middlewares.js';
import { uploadOnCloudinary } from './utils/cloudinary.js';
import { connectDB } from './db/db.js';

connectDB()
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/', async(req, res) =>{
    try {
        const blogs  = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.status(500).json({error : "Failed to fetch blogs"})
        
    }
});

app.get('/blog/:blogId', async(req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.log('Error fetching blog:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}); 

app.post('/me/admin',upload.single('image'), async (req, res) =>{
    try{
        const {title, description, author, category} = req.body;
        const localFilePath = req.file.path;

         // Upload temp file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
    // Clean up temp file
    fs.unlinkSync(localFilePath);

    // Now save blog data (with image cloudinary URL) to MongoDB
    const newBlog = await Blog.create({
      title,
      description,
      author,
      category,
      image: cloudinaryResponse.url,
    });

    res.status(201).json(newBlog);

    }catch(error){
         res.status(500).json({ error: "Upload failed", details: error.message });
    }
    

});


app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPost = await Blog.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

app.listen(port , () =>{`Backend Running on :  ${port}`});