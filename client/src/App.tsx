import React from "react";
import "./App.css";
import { Notification } from "./components/Notification";
import { Histogram } from "./modules/histogram";

type NotificationContextType = {
  notification?: {
    type: string;
    message: string;
  };
  toggleNotification: (
    data: { type: string; message: string } | undefined
  ) => void;
};
export const NotificationContext = React.createContext<NotificationContextType>(
  {} as NotificationContextType
);
function App() {
  const [notification, setNotification] = React.useState<
    | {
        type: string;
        message: string;
      }
    | undefined
  >(undefined);

  const handleToggleNotification = React.useCallback(
    (data: { type: string; message: string } | undefined) => {
      setNotification(data);
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{ notification, toggleNotification: handleToggleNotification }}
    >
      <Histogram />
      {notification && <Notification />}
    </NotificationContext.Provider>
  );
}

export default App;
