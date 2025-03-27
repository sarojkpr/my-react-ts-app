class EventManager {
    private listeners: { [key: string]: Function[] } = {};
  
    // Subscribe to an event
    subscribe(event: string, listener: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  
    // Emit an event to notify listeners
    emit(event: string, ...args: any[]) {
      if (this.listeners[event]) {
        this.listeners[event].forEach((listener) => listener(...args));
      }
    }
  
    // Unsubscribe from an event
    unsubscribe(event: string, listener: Function) {
      if (!this.listeners[event]) return;
  
      this.listeners[event] = this.listeners[event].filter(
        (l) => l !== listener
      );
    }
  }
  
  // Initialize the event manager
  export const eventManager = new EventManager();
  