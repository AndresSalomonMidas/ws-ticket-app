export const getUserStorage = () => {
  const name = localStorage.getItem("name");
  const desktop = localStorage.getItem("desktop");

  const user = { name, desktop };

  return user;
};
