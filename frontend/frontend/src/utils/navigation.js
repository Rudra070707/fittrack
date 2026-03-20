export const goProtectedOrLogin = (navigate, location, path) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/home/login", {
      state: { backgroundLocation: location }
    });
  } else {
    navigate(path);
  }
};