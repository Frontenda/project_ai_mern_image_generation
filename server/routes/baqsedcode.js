//I have Nodejs Express app backend function:
"import express from 'express';
import * as dotenv from 'dotenv';
//import { Configuration, OpenAIApi } from 'openai';

//dotenv.config();

const router = express.Router();



const  apiKey =  process.env.AI_API_KEY;

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from REMIXO!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
"

But I need to change openAI API - (see const= aiResponse) to another API with code as an example: 

var axios = require('axios');
var data = '{\n    "key": "",\n    "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)), blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic neon, dark red city, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K",\n    "negative_prompt": "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",\n    "width": "512",\n    "height": "512",\n    "samples": "1",\n    "num_inference_steps": "20",\n    "seed": null,\n    "guidance_scale": 7.5,\n    "webhook": null,\n    "track_id": null\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://stablediffusionapi.com/api/v3/text2img',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

