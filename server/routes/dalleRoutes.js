import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const config = {
      method: 'post',
      url: 'https://stablediffusionapi.com/api/v3/text2img',
      headers: { },
      data: {
        key: process.env.AI_API_KEY,
        prompt: prompt,
        width: '512',
        height: '512',
        samples: '1',
        num_inference_steps: '20',
        seed: null,
        guidance_scale: 7.5,
        webhook: null,
        track_id: null
      },
    };

    const aiResponse = await axios(config);
    const image = aiResponse.data.output[0];

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

export default router;
