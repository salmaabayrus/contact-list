const express = require("express");
const app = express();
const fs = require("fs");

const dummy = require("./db/dummy.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: `HELLO WORLD`,
  });
});

// CREATE
app.post("/contact", (req, res) => {
  let id;
  if (dummy.length === 0) {
    id = 1;
  } else {
    id = dummy[dummy.length - 1].id + 1;
  }

  let { firstName, lastName, numberPhone, address } = req.body;
  console.log(firstName, lastName, numberPhone, address);
  let contact = {
    id,
    firstName,
    lastName,
    numberPhone,
    address,
  };

  dummy.push(contact);

  fs.writeFileSync("./db/dummy.json", JSON.stringify(dummy));

  res.status(201).json(contact);
});

// READ
app.get("/contact/list", (req, res) => {
  res.status(200).json(dummy);
});

app.get("/contact/:id", (req, res) => {
  let id = req.params.id;
  let contact = dummy.find((contact) => contact.id == id);
  res.status(200).json(contact);
});

// UPDATE
app.put("/contact/:id", (req, res) => {
  let id = req.params.id;
  let contact = dummy.find((contact) => contact.id == id);

  let { firstName, lastName, numberPhone, address } = req.body;
  if (firstName) contact.firstName = firstName;
  if (lastName) contact.lastName = lastName;
  if (numberPhone) contact.numberPhone = numberPhone;
  if (address) contact.address = address;

  fs.writeFileSync("./db/dummy.json", JSON.stringify(dummy));

  res.status(200).json(contact);
});

// DELETE
app.delete("/contact/:id", (req, res) => {
  let id = req.params.id;
  let contact = dummy.filter((contact) => contact.id != id);

  fs.writeFileSync("./db/dummy.json", JSON.stringify(contact));

  res.status(200).json({
    message: `Contact with id ${id} deleted`,
  });
});

app.listen(3000, () => {
  console.log(`server running on http://localhost:3000`);
});
