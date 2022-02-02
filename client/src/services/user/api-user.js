import base from "../config";

const create = (user) => {
  return fetch(`${base}/user/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: user,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const list = () => {
  return fetch(`${base}/user`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { create, list };
