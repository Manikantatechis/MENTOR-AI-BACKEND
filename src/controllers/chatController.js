const asyncHandler = require("express-async-handler");
const OpenAI = require("openai");

const chat = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { messages } = req.body
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPEN_AI_MODEL_ID,
      messages,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
    return res.json(response);
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message);
  } 
});

module.exports = chat;
