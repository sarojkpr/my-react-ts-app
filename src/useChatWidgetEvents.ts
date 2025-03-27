import { useEffect } from "react";
import { eventManager } from "./EventManager"; // import the event manager

const useChatWidgetEvents = () => {
  useEffect(() => {
    // Event handler logic for the lcw:chatQueued event
    const onChatQueued = () => {
      console.log("Chat widget is queued.");
      // Your custom logic for this event
    };

    const onOccChatClosed = () => {
        console.log("OCC Chat closed.");
        // Your custom logic for this event
      };

    
    // Subscribe to the lcw:chatQueued event
    eventManager.subscribe("lcw:occCustomChatQueued", onChatQueued);
    eventManager.subscribe("lcw:occCustomChatClosed", onOccChatClosed);


    // Cleanup the event subscription when the component unmounts
    return () => {
      eventManager.unsubscribe("lcw:occCustomChatQueued", onChatQueued);
      eventManager.unsubscribe("lcw:occCustomChatClosed", onOccChatClosed);
      //MOre events can be unsubscribed here
    };
  }, []);
};

export default useChatWidgetEvents;
