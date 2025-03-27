import React, { useEffect } from "react";

declare global {
  interface Window {
    __lcw_chatQueuedDispatched?: boolean;
  }
}

async function initializeChatWidget(token: string) {
  try {
    const onReady = () => {
      console.log("Chat widget is ready.");
      (window as any).Microsoft?.Omnichannel?.LiveChatWidget?.SDK.setOccAuthTokenProvider(() => token);

      // Simulate chat queued event
      setTimeout(() => {
        console.log("Token set successfully.");
        (window as any).Microsoft?.Omnichannel?.LiveChatWidget?.SDK.startChat();
      }, 3000);

      window.removeEventListener("lcw:ready", onReady); // Clean up after execution
    };

    if (token) {
      window.addEventListener("lcw:ready", onReady);

      // Listen for 'lcw:chatQueued' event
      window.addEventListener("lcw:chatQueued", () => {
        // Dispatch a different custom event to avoid a loop
        window.dispatchEvent(new CustomEvent("lcw:occCustomChatQueued"));
      });

      // Event listener for occChatClosed
      window.addEventListener("lcw:occChatClosed", () => {
        window.dispatchEvent(new CustomEvent("lcw:occCustomChatClosed"));
      });

    } else {
      console.error("Token is null or undefined. Chat widget will not load.");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

interface LiveChatWidgetProps {
  token: string;
}

const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ token }) => {
  useEffect(() => {
    (window as any).lcwcustomization = () => ({
      styleProps: { generalStyles: { width: "450px", height: "650px" } },
      chatButtonProps: { controlProps: { hideChatSubtitle: true } },
      loadingPaneProps: {
        controlProps: { hideTitle: false, hideSpinner: true, hideSpinnerText: true },
        styleProps: {
          generalStyleProps: { backgroundColor: "#315fa2" },
          subtitleStyleProps: { color: "#000000" },
        }
      }
    });

    const scriptId = "Microsoft_Omnichannel_LCWidget";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://occclient-embed-csg8gbdpfxdhebbn.z01.azurefd.net/occ-em-ready/v2scripts/LiveChatBootstrapper.js";
      script.setAttribute("data-lcw-version", "test");
      script.setAttribute("data-partner-code", "aiacceleration");
      script.setAttribute("data-locale", "en-us");
      script.setAttribute("data-color-override", "#8D81FF");
      script.setAttribute("data-org-id", "bfd9d87a-79b7-4bb7-acf0-48b3b855b4da");
      script.setAttribute("data-target-environment", "int");
      script.setAttribute("data-customization-callback", "lcwcustomization");
      script.setAttribute("data-hide-chat-button", "true");
      document.body.appendChild(script);
      script.onload = () => initializeChatWidget(token);
    }
  }, [token]);

  return null;
};

export default LiveChatWidget;
