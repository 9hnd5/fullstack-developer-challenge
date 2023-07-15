import React from "react";
import { NotificationContext } from "../App";

type Notify = {
  type: string;
  message: string;
};
export const useNotification = () => {
  const { toggleNotification } = React.useContext(NotificationContext);

  const notify = React.useCallback(
    (notify: Notify) => {
      toggleNotification(notify);
    },
    [toggleNotification]
  );

  return notify;
};
