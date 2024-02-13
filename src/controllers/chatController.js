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
      temperature: process.env.TEMPERATURE,
      max_tokens: parseInt(process.env.MAX_TOKENS),
      top_p: process.env.TOP_P,
      frequency_penalty: process.env.FREQUENCY_PENALTY,
      presence_penalty: process.env.PRESENSE_PENALTY,
    });
  
    return res.json(response);
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message);
  } 
});

module.exports = chat;
