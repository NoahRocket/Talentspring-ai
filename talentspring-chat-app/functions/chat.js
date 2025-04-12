/**
 * Netlify Function: chat.js
 * Purpose: Handles chat interactions between users and the OpenAI GPT model for the Talentspring AI Career Coach.
 * This function processes user messages, forwards them to the OpenAI API, and returns AI responses.
 * Environment variables required: OPENAI_API_KEY
 */

const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    const userMessage = requestBody.message;
    
    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing message parameter' }),
      };
    }

    // Initialize the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prepare the conversation for the API call
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

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: conversation,
      temperature: 0.7,
      max_tokens: 800,
    });

    // Return the AI's response
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
    console.error('Error processing chat request:', error);
    
    // Return an error response
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
