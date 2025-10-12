import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const openRouterApi = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `OpenRouter-API-Key ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function getOpenAiCompletion(prompt, model = 'openrouter/auto') {
  try {
    const response = await openRouterApi.post('/chat/completions', {
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.data;
  } catch (error) {
    // Log error for debugging
    console.error('OpenRouter API error:', error.response?.data || error.message || error);
    // Return a user-friendly error message
    return {
      choices: [
        { message: { content: "Sorry, the AI service is currently unavailable. Please try again later." } }
      ],
      error: error.response?.data?.error?.message || error.message || "Unknown error"
    };
  }
}
