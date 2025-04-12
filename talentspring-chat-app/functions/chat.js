/**
 * Netlify Function: chat.js
 * Purpose: Handles chat interactions between users and the OpenAI GPT model for the Talentspring AI Career Coach.
 * This function processes user messages, forwards them to the OpenAI API, and returns AI responses.
 * Environment variables required: OPENAI_API_KEY
 */

const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
  // Only allow POST requests for security and proper API usage
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body to extract the user's message
    const requestBody = JSON.parse(event.body);
    const userMessage = requestBody.message;
    
    // Validate that a message was provided
    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing message parameter' }),
      };
    }

    // Initialize the OpenAI client with API key from environment variables
    // IMPORTANT: Make sure to set OPENAI_API_KEY in your Netlify environment variables
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prepare the conversation with system instructions and user message
    // The system message defines the AI's persona and behavioral guidelines
    const conversation = [
      {
        role: 'system',
        content: 'You are Talentspring AI Career Coach, a supportive and expert assistant for job seekers. Provide concise, practical advice on job-related topics like resume writing, interview preparation, salary negotiations, cover letters, and job search strategies. Tailor responses to the user\'s question, offer specific examples (e.g., "For a resume, quantify achievements like \'Increased sales by 15%\'"), and ask clarifying questions if the input is vague (e.g., "Can you share the job role you\'re targeting?"). Use an encouraging tone and avoid generic advice.'
      },
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call the OpenAI Chat Completions API with our conversation
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Using the GPT-4o model for high-quality responses
      messages: conversation,
      temperature: 0.7, // Setting a balanced temperature for creativity vs consistency
      max_tokens: 800, // Limiting response length to prevent excessively long messages
    });

    // Return a successful response with the AI's reply
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          content: response.choices[0].message.content
        }
      }),
    };
  } catch (error) {
    // Log the error for debugging in Netlify's function logs
    console.error('Error processing chat request:', error);
    
    // Return a user-friendly error message without exposing technical details
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        data: {
          content: 'Oops, something went wrong—try again!'
        }
      }),
    };
  }
};
