import { APISettings } from "../config.js";
import { useNoteStore } from "../../store";

export async function getData(isAuth, path) {
  const store = useNoteStore();
  if (isAuth)
    APISettings.headers.set(
      "Authorization",
      "Bearer " + store.userToken.accessToken
    );
  return fetch(APISettings.baseURL + path, {
    method: "GET",
    headers: APISettings.headers,
  }).then(function (response) {
    if (response.status != 200) {
      throw response.status;
    } else {
      return response.json();
    }
  });
}

export async function postData(isAuth, data, path) {
  const store = useNoteStore();
  APISettings.headers.set("Content-Type", "application/json");
  if (isAuth)
    APISettings.headers.set(
      "Authorization",
      "Bearer " + store.userToken.accessToken
    );

  return fetch(APISettings.baseURL + path, {
    method: "POST",
    headers: APISettings.headers,
    body: JSON.stringify(data),
  }).then(function (response) {
    if (response.status != 201 && response.status != 200) {
      return response.json();
    } else {
      return response.json();
    }
  });
}

export async function deleteData(isAuth, path) {
  const store = useNoteStore();
  if (isAuth)
    APISettings.headers.set(
      "Authorization",
      "Bearer " + store.userToken.accessToken
    );
  APISettings.headers.set("Content-Type", "application/json");

  return fetch(APISettings.baseURL + `${path}`, {
    method: "DELETE",
    headers: APISettings.headers,
  }).then(function (response) {
    if (response.status != 201) {
      throw response.status;
    } else {
      return response.json();
    }
  });
}

export async function putData(isAuth, data, path) {
  const store = useNoteStore();
  if (isAuth)
    APISettings.headers.set(
      "Authorization",
      "Bearer " + store.userToken.accessToken
    );
  APISettings.headers.set("Content-Type", "application/json");

  return fetch(APISettings.baseURL + `${path}`, {
    method: "PUT",
    headers: APISettings.headers,
    body: JSON.stringify(data),
  }).then(function (response) {
    if (response.status != 201) {
      throw response.status;
    } else {
      return response.json();
    }
  });
}
