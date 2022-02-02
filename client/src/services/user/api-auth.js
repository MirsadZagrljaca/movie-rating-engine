import base from "../config";

const signin = (user) => {
  return fetch(`${base}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const signout = () => {
  return fetch(`${base}/logout`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { signin, signout };
