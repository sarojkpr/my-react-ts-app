import { useEffect } from "react";

const useChatWidgetEvents = () => {
  useEffect(() => {
    // Event handler logic for the lcw:chatQueued event
    const onChatQueued = () => {
      console.log("Chat widget is queued custom event.");
      // Your custom logic for this event
    };

    const onOccChatClosed = () => {
      console.log("OCC Chat closed.");
      // Your custom logic for this event
    };

    // Subscribe to the custom events on window
    window.addEventListener("lcw:occCustomChatQueued", onChatQueued);
    window.addEventListener("lcw:occCustomChatClosed", onOccChatClosed);

    // Cleanup the event listeners when the component unmounts
    return () => {
      window.removeEventListener("lcw:occCustomChatQueued", onChatQueued);
      window.removeEventListener("lcw:occCustomChatClosed", onOccChatClosed);
    };
  }, []);
};

export default useChatWidgetEvents;
