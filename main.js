"use strict";

//DB Interactions
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

//CRUD - Create, Read, Update, Delete
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.pop(index);
  setLocalStorage(dbClient);
};

//UI Interactions
const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
  clearInputs()}

const clearInputs = () => {
    const inputs = document.querySelectorAll('.modal-field')
    inputs.forEach(input => input.value = '')
}

const saveClient = () => {
  if (isValidInputs()) {
    const client = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      city: document.getElementById('city').value,
    };
    createClient(client)
    clearInputs()
    closeModal()
  }
};

const isValidInputs = () => {
  return document.getElementById("form").reportValidity();
};

//Events

document.getElementById("registerClient").addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("save").addEventListener("click", saveClient);
