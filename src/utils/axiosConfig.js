const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Accept: "application/json",
    // Check if getTokenFromLocalStorage and its token are not null before setting Authorization header
    Authorization: getTokenFromLocalStorage && getTokenFromLocalStorage.token !== null
      ? `Bearer ${getTokenFromLocalStorage.token}`
      : ""
  }
};
