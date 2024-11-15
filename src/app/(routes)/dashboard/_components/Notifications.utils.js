export function addNotification(message, type = "info") {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      type,
    };
  
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push(newNotification);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }
  
  export function getNotifications() {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  }
  
  export function clearNotifications() {
    localStorage.removeItem("notifications");
  }
  