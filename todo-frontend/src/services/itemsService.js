import axios from "axios";
const API_URL = "https://todo-react-app-w88p.onrender.com";

export const addItemToServer = async (task, date) => {
  const response = await fetch("API_URL/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const getItemsFromServer = async () => {
  const response = await fetch("API_URL/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    `API_URL/api/todo/${id}/completed`,
    {
      method: "PUT",
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`API_URL/api/todo/${id}`, {
    method: "DELETE",
  });
  return id;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
