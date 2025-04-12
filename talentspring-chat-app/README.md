# Talentspring AI Career Coach MVP

A web-based chatbot for career coaching using ChatGPT integrated with React and Tailwind CSS.

## Features

- **Interactive Chat Interface**: Responsive design that works on both desktop and mobile devices
- **AI-Powered Responses**: Leverages OpenAI's GPT-4o model for intelligent career advice
- **Modern Styling**: Clean, professional UI built with Tailwind CSS
- **Serverless Backend**: Netlify Functions handle API requests without maintaining a separate server

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **AI Integration**: OpenAI API
- **Deployment**: Netlify

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Local Development**
   - Create a `.env` file in the project root with your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - Start the development server:
     ```
     npm start
     ```
   - For local serverless function testing, install Netlify CLI:
     ```
     npm install -g netlify-cli
     netlify dev
     ```

3. **Production Deployment**
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Add `OPENAI_API_KEY` in Netlify's Site Settings > Environment Variables
   - Deploy!

## Project Structure

- `src/ChatInterface.js`: Main chat UI component
- `functions/chat.js`: Netlify serverless function for OpenAI API integration
- `tailwind.config.js`: Custom theme configuration
- `netlify.toml`: Netlify deployment configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
