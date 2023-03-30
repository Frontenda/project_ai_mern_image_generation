import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error(err); // Add this line to log the error on the server-side
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again', error: err.message });
  }
});


router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');

    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        format: 'png',
      },
      async (error, result) => {  
        if (error) {
          res.status(500).json({
            success: false,
            message: 'Unable to create a post, please try again',
          });
        } else {
          const newPost = await Post.create({
            name,
            prompt,
            photo: result.url,
          });

          res.status(200).json({ success: true, data: newPost });
        }
      }
    ).end(dataBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;
