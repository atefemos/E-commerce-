export const isLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};

export const loggedOut = () => {
  localStorage.clear();
  window.location.reload();
};
