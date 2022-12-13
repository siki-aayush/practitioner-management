import { day } from "../interfaces";

import infoIcon from "../assets/info.svg";
import checkIcon from "../assets/check.svg";
import errorIcon from "../assets/error.svg";
import warningIcon from "../assets/warning.svg";

import { ToastTypes } from "../enum/toast.enum";


export const WEEK_DAYS: day[] = [
  day.sunday,
  day.monday,
  day.tuesday,
  day.wednesday,
  day.thursday,
  day.friday,
];

export const defaultToastPreferences: { [ key in ToastTypes ]: {
  title: string,
  backgroundColor: string,
  icon: any
} } = {
  success: {
    title: "Success",
    backgroundColor: "#5cb85c",
    icon: checkIcon,
  },
  danger: {
    title: "Danger",
    backgroundColor: "#d9534f",
    icon: errorIcon,
  },
  info: {
    title: "Info",
    backgroundColor: "#5bc0de",
    icon: infoIcon,
  },
  warning: {
    title: "Warning",
    backgroundColor: "#f0ad4e",
    icon: warningIcon,
  }
}