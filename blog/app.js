const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config(); // Load environment variables

const app = express();

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit process with failure
    }
};

// Define the blog schema and model
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Blog = mongoose.model("Blog", blogSchema);

// GET: Retrieve all blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve blogs" });
    }
});

// POST: Retrieve a blog by its title
app.post('/blogs/:blogTitle', async (req, res) => {
    try {
        const blog = await Blog.findOne({ title: req.params.blogTitle });
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve blog" });
    }
});

// POST: Add a new blog
app.post('/blogs', async (req, res) => {
    const { title, content } = req.body;
    
    // Validation
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    try {
        const newBlog = new Blog({ title, content });
        await newBlog.save();
        res.status(201).json({ message: "Blog added!", blog: newBlog });
    } catch (err) {
        res.status(500).json({ error: "Failed to add blog" });
    }
});

// DELETE: Remove a blog by title
app.delete('/blogs', async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required to delete a blog" });
    }

    try {
        const result = await Blog.deleteOne({ title });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Blog deleted!" });
        } else {
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to delete blog" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});

// Connect to the database
connectDB();