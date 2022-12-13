import { AppDispatch } from "../redux/store";
import { ToastTypes } from "../enum/toastTypes.enum";
import { defaultToastPreferences } from "../constants";
import { addToast, removeToast } from "../reducers/toastSlice";

export const generateToast = (dispatch: AppDispatch, message: string, type: ToastTypes, timeout = 2000) => {
  const id = setTimeout(() => {
    dispatch(removeToast(id));
  }, timeout);

  dispatch(
    addToast({
      ...defaultToastPreferences[ type ],
      id,
      description: message,
    })
  );
}