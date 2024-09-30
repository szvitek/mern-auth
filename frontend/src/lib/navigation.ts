import { NavigateFunction } from "react-router-dom";

export let navigate: null | NavigateFunction = null;

export const setNavigate = (fn: NavigateFunction) => {
  navigate = fn;
};
