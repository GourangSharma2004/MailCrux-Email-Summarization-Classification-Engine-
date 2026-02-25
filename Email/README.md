# Smart Email Manager

A modern application that simplifies email management with AI-powered filtering, summarization, and organization.

## Features

- **NLP-based Email Processing**: Automatically categorizes, analyzes sentiment, and identifies important emails
- **Smart Filtering**: Distinguishes between important, personal messages and promotional content
- **Daily Email Summaries**: Get personalized daily summaries of your inbox
- **Gmail Integration**: Securely connect your Gmail account
- **Modern Interface**: Clean, intuitive UI inspired by Gmail
- **Action Item Extraction**: Automatically identifies action items and requests in emails
- **Importance Scoring**: Prioritizes emails based on their content and context
- **Sentiment Analysis**: Analyzes the tone and sentiment of emails
- **Data Visualization**: Charts and graphs to visualize your email patterns
- **Mobile-Responsive**: Works on all device sizes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google APIs (Gmail)
- Natural Language Processing (NLP)
- OpenAI integration
- JWT Authentication

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Chart.js
- React Icons

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Google Cloud Platform account (for Gmail API)
- OpenAI API key (optional, for enhanced NLP features)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/smart-email-manager.git
cd smart-email-manager
```

2. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
OPENAI_API_KEY=your_openai_api_key
```

3. Install dependencies
```
npm run install-all
```

4. Start the development server
```
npm run dev
```

## Configuration

### Google API Setup
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gmail API
4. Create OAuth 2.0 credentials
5. Set up the consent screen
6. Add the redirect URI: `http://localhost:5000/api/auth/google/callback`

### OpenAI API Setup (Optional)
1. Sign up for an [OpenAI API key](https://openai.com/api/)
2. Add the key to your `.env` file

## Usage

1. Create an account or log in with Google
2. Connect your Gmail account
3. Allow the application to sync your emails
4. View your smart inbox with categorized emails
5. Check daily summaries of your email activity
6. Manage your email preferences in settings

## License

This project is licensed under the MIT License - see the LICENSE file for details. 