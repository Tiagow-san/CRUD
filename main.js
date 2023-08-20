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
  clearInputs();
};

const clearInputs = () => {
  const inputs = document.querySelectorAll(".modal-field");
  inputs.forEach((input) => (input.value = ""));
};

const saveClient = () => {
  if (isValidInputs()) {
    const client = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
    };
    const index = document.getElementById('name').dataset.index
    if (index == 'new') {
    createClient(client);
    clearInputs();
    closeModal();
    updateTable();
  }
else {
  updateClient(index,client)
  updateTable()
  closeModal()
}
  }
};

const isValidInputs = () => {
  return document.getElementById("form").reportValidity();
};

const fillInputs = (client) => {
document.getElementById ('name').value = client.name
document.getElementById ('email').value = client.email
document.getElementById ('phone').value = client.phone
document.getElementById ('city').value = client.city
document.getElementById ('name').dataset.index = client.index
}
const editClient = (index) =>{
  const client = readClient()[index]
  client.index = index
  fillInputs(client)
  openModal()
}
const editDelete = (event) => {
  if (event.target.type == 'button') {
    const [action,index] = event.target.id.split('-')
    if (action == 'edit') {
      editClient(index)
      updateTable()
    }
    else {
      const client = readClient()[index]
      const warn = confirm (`Deseja realmente excluir o cliente ${client.name}?`)
      if (warn) {
      deleteClient(index)
      updateTable()
    }
    }
  }

}

//Events

document.getElementById("registerClient").addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("save").addEventListener("click", saveClient);

document.querySelector("#tableRecords>tbody").addEventListener("click",editDelete)
//Dunno

const createRow = (client,index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${client.name}</td>
  <td>${client.email}</td>
  <td>${client.phone}</td>
  <td>${client.city}</td>
  <td>
      <button type="button" class="button green" id ='edit-${index}'>editar</button>
      <button type="button" class="button red" id ='delete-${index}'>excluir</button>
  </td>
`;
  document.querySelector("#tableRecords>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableRecords>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};
updateTable()