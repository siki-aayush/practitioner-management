import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { Toast } from "../../interfaces/Toast";
import { removeToast } from "../../reducers/toastSlice";

import "./ToastNotification.css"

interface ToastProps {
  toastList: any[];
  position: string;
}

const ToastNotification = ({ toastList, position }: ToastProps) => {
  const dispatch = useDispatch();
  const [toasts, setToasts] = useState<Toast[]>(toastList);

  useEffect(() => {
    setToasts(toastList);
  }, [toastList]);

  const onClickHandler = (id: NodeJS.Timeout) => {
    dispatch(removeToast(id));
  };

  return (
    <>
      <div className={`notification-container ${position}`}>
        {toasts.map((toast, idx) => (
          <div
            className={`notification toast ${position} id-${toast.id}`}
            style={{ backgroundColor: toast.backgroundColor }}
            key={idx}
          >
            <button
              className="notification__btn"
              onClick={() => onClickHandler(toast.id)}
            >
              X
            </button>
            <div className="notification__image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification__title">{toast.title}</p>
              <p className="notification__message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToastNotification;
