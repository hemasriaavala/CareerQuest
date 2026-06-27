// src/services/storage.js

export const saveUser = (user) => {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getUser = () => {
  const user =
    localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
};

export const saveMission = (
  mission
) => {
  localStorage.setItem(
    "mission",
    JSON.stringify(mission)
  );
};

export const getMission = () => {
  const mission =
    localStorage.getItem(
      "mission"
    );

  return mission
    ? JSON.parse(mission)
    : null;
};

export const saveSetting = (
  key,
  value
) => {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
};

export const getSetting = (
  key
) => {
  const value =
    localStorage.getItem(key);

  return value
    ? JSON.parse(value)
    : null;
};

export const clearStorage = () => {
  localStorage.clear();
};