# Talentspring AI Career Coach MVP - Product Requirements Document

## Overview

**Project**: Talentspring AI Career Coach MVP  
**Objective**: Build a simple, accessible web-based chatbot that provides personalized career coaching for job-related queries (e.g., interview prep, resume advice, salary negotiations) to demonstrate core value within a 2-week development sprint.  
**Target Audience**: Job seekers, career starters, career changers, and professionals seeking quick, actionable advice.  
**Timeline**: 2 weeks (MVP delivery by April 25, 2025).  
**Tech Stack**:  
- **Frontend**: Tailwind CSS (for styling a responsive chat interface).  
- **Backend**: Node.js (to handle API calls to the LLM).  
- **LLM**: ChatGPT API (OpenAI, e.g., GPT-4o).  
- **Tools**: Windsurf (for UI prototyping), GitHub (version control), Netlify (deployment).  

## Scope

The MVP focuses on a minimal, functional product to validate the concept:  
- A single-page web app with a chat interface accessible via a public URL.  
- No account creation, login functionality, or user authentication.  
- A tailored ChatGPT system prompt to guide users through job-related questions.  
- No storage or display of conversation history (each session is stateless).  

Out-of-scope for MVP (future iterations):  
- User accounts or session persistence.  
- Database integration (e.g., job listings, user profiles).  
- Specialized microservices (e.g., Resume Optimizer, Cover Letter Generator).  
- Advanced features (e.g., voice input, mock interviews).  

## Functional Requirements

### 1. Chat Interface
- **Description**: A single-page web app with a clean, responsive chat interface where users can type questions and receive AI-generated career coaching responses.  
- **Features**:  
  - **Input Box**: A text input field where users enter job-related questions (e.g., “How do I prepare for a software engineer interview?” or “What’s a good salary negotiation strategy?”).  
  - **Chat Display Area**: A scrollable area showing the user’s question and the AI’s response in a conversational format (user on one side, AI on the other).  
  - **No History**: Conversations reset on page refresh; no previous messages are stored or displayed.  
  - **Loading Indicator**: A subtle animation (e.g., “typing” dots) while the AI processes the query.  
  - **Error Handling**: Display a friendly message (e.g., “Oops, something went wrong—try again!”) if the API call fails.  
- **UI Details**:  
  - Use Tailwind CSS for a professional, mobile-responsive design.  
  - Layout: Header with app name/logo (“Talentspring AI Career Coach”), main chat area (80% of screen), and input box at the bottom.  
  - Colors: Neutral palette (e.g., white background, blue accents for buttons).  
  - Font: Clean, readable (e.g., Inter or default Tailwind fonts).  
- **Windsurf Context**: Generate a single React component with Tailwind classes for a chat layout, including an input field, submit button, and dynamic message display.

### 2. ChatGPT API Integration
- **Description**: The backend connects user inputs to the ChatGPT API (via Node.js) and returns AI-generated responses to the frontend.  
- **Features**:  
  - **API Call**: Send user input to ChatGPT API and retrieve responses.  
  - **System Prompt**: Configure the API with a tailored prompt to ensure relevant, actionable career coaching, e.g.:  
    ```
    You are Talentspring AI Career Coach, a supportive and expert assistant for job seekers. Provide concise, practical advice on job-related topics like resume writing, interview preparation, salary negotiations, cover letters, and job search strategies. Tailor responses to the user’s question, offer specific examples (e.g., “For a resume, quantify achievements like ‘Increased sales by 15%’”), and ask clarifying questions if the input is vague (e.g., “Can you share the job role you’re targeting?”). Use an encouraging tone and avoid generic advice.
    ```
  - **Stateless Interaction**: Each API call is independent; no conversation context is stored beyond the current query.  
  - **Response Format**: Display AI responses as plain text with basic formatting (e.g., bullet points or paragraphs, handled by Tailwind styling).  
- **Backend Details**:  
  - Use Node.js with Express to create a single endpoint (e.g., `/api/chat`) that accepts user input, calls the ChatGPT API, and returns the response.  
  - Store the OpenAI API key securely as an environment variable.  
  - Handle API errors gracefully (e.g., rate limits, invalid inputs) and return user-friendly messages.  
- **Windsurf Context**: Generate a Node.js backend script with an Express server and OpenAI API integration, including the system prompt above.

### 3. Accessibility
- **Description**: The chat interface is publicly accessible via a URL without barriers.  
- **Features**:  
  - **No Authentication**: Users access the app directly via a Netlify-hosted URL (e.g., `talentspring-coach.netlify.app`).  
  - **Cross-Device Support**: Responsive design (via Tailwind) ensures usability on desktop, tablet, and mobile.  
  - **Performance**: Lightweight UI loads quickly (no heavy assets or scripts).  
- **Windsurf Context**: Ensure the generated frontend is optimized for responsiveness and minimal load time.

## Non-Functional Requirements

- **Performance**: Chat responses load within 2-3 seconds (assuming API latency).  
- **Security**:  
  - Store API keys in environment variables (not hardcoded).  
  - No user data is collected or stored, ensuring GDPR compliance.  
- **Scalability**: The app handles up to 100 concurrent users for MVP testing (Node.js and Netlify can scale further if needed).  
- **Maintainability**: Code is modular, with clear comments, and hosted on GitHub for version control.  

## User Flow

1. User navigates to the app URL (e.g., `talentspring-coach.netlify.app`).  
2. User sees a welcome header and an empty chat interface with an input box.  
3. User types a question (e.g., “How do I write a better cover letter?”) and presses “Send” (or Enter).  
4. A loading indicator appears while the backend calls the ChatGPT API.  
5. The AI’s response appears in the chat area below the user’s question.  
6. User can type another question, repeating the process.  
7. On page refresh, the chat resets (no history retained).  

## Assumptions

- The ChatGPT API uses GPT-4o, but can switch to another model if preferred.  
- No external data sources (e.g., job listings) are needed; the LLM generates advice based on its training and the system prompt.  
- Basic Tailwind styling is sufficient (no custom animations or complex UI beyond the chat).  
- Netlify handles deployment; no custom domain is required for MVP.  

## Deliverables

- **Frontend**: A React-based single-page app with Tailwind CSS, hosted on Netlify.  
- **Backend**: A Node.js/Express server with ChatGPT API integration, deployed alongside the frontend.  
- **Code**: A GitHub repo with all source code, a README for setup instructions, and environment variable configuration.  
- **Documentation**: Inline code comments and a basic handover guide (in README).  

## Success Criteria

- The app is live on Netlify and accessible via a public URL.  
- Users can ask job-related questions (e.g., resume tips, interview prep) and receive clear, relevant responses.  
- The interface is intuitive, responsive, and error-free for basic use cases.  
- The project is delivered within 2 weeks, ready for user testing and feedback.  

---

### Notes for Windsurf

- **Frontend**: Generate a React component (`ChatInterface.js`) with Tailwind CSS for a chat layout:  
  - Header: App name/logo.  
  - Main: Scrollable div for messages (user and AI).  
  - Footer: Text input and send button.  
  - Use Tailwind classes (e.g., `flex`, `w-full`, `sm:mx-auto`) for responsiveness.  
- **Backend**: Generate a Node.js script (`server.js`) with:  
  - Express server and `/api/chat` endpoint.  
  - OpenAI API client setup with the system prompt provided.  
  - Environment variable for `OPENAI_API_KEY`.  
