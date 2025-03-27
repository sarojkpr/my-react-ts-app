import React, { useState } from 'react';
import { Button } from '@mui/material'; // Import Material-UI Button
import LiveChatWidget from './LiveChatWidgetEmbedded'; // Assuming you have this component

const App: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [token, setToken] = useState<string>(''); // Replace with your token

  // Button click handler to toggle the chat widget visibility
  const handleLiveChatClick = async () => {
    // Assume you get a token dynamically or from an API call
    const fetchedToken = await getTokenFromApi();
    setToken(fetchedToken); // Set the token when fetched
    setShowWidget(true); // Show the chat widget when the button is clicked
  };

  // Simulate fetching a token (replace with your actual logic)
  const getTokenFromApi = async (): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve(""), 1000));
  };

  return (
    <div>
      <h1>Sample Portal</h1>
      {/* Button that triggers the LiveChatWidget */}
      <Button variant="contained" onClick={handleLiveChatClick}>
        Live Chat
      </Button>

      {/* Conditionally render the LiveChatWidget */}
      {showWidget && <LiveChatWidget token={token} />}
    </div>
  );
};

export default App;
