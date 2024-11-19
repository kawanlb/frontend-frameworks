import { useState, useEffect } from "react";
import { toast } from "sonner";
import { addNotification, getNotifications, clearNotifications } from "@/app/(routes)/dashboard/_components/Notifications.utils";

function NotificationList({ onClose }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = getNotifications();
    setNotifications(storedNotifications);
  }, []);

  const removeNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    toast("Notificação removida", { type: "info" });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    clearNotifications();
    toast("Todas as notificações foram limpas", { type: "info" });
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative">
          <h2 className="text-xl font-bold mb-4">Notificações</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 mb-2 border rounded-md transition-transform transform hover:scale-105 ${
                    notification.type === "success"
                      ? "bg-green-100 border-green-500 text-green-800"
                      : notification.type === "error"
                      ? "bg-red-100 border-red-500 text-red-800"
                      : "bg-gray-100 border-gray-500 text-gray-800"
                  }`}
                >
                  <p>{notification.message}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-red-500 ml-2 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                onClick={clearAllNotifications}
                className="mt-4 text-sm text-blue-500 hover:underline"
              >
                Limpar todas as notificações
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma notificação disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationList;
