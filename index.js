const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const personsData = [
  {
    id: uuidv4(),
    name: "Arto Bellas",
    number: "040-123456"
  },
  {
    id: uuidv4(),
    name: "Ada Lovelace",
    number: "039-457834"
  },
  {
    id: uuidv4(),
    name: "Dan Vargas",
    number: "040-178142"
  },
  {
    id: uuidv4(),
    name: "Jaquin Velazques",
    number: "020-984321"
  }
];

app
  .route("/api/persons")
  .get((req, res) => {
    res.json(personsData);
  })
  .post((req, res) => {
    const { name, number } = req.body;
    if (!name || name.length < 3)
      return res.status(400).send("Name is required");
    if (!number || number.length < 3)
      return res.status(400).send("Number is required");

    const indexOfName = personsData.findIndex((elem) => elem.name === name);
    if (indexOfName === -1) {
      const newPerson = { id: uuidv4(), name, number }
      personsData.push(newPerson);
      return res.status(201).json(newPerson);
    }

    return res.status(400).send("Name must be unique");
  });

app
  .route("/api/persons/:idPerson")
  .get((req, res) => {
    const idPerson = +req.params.idPerson;
    const person = personsData.find((elem) => elem.id === idPerson);

    if (person) return res.json(person);
    else return res.status(404).send("No record was found");
  })
  .delete((req, res) => {
    const idPerson = +req.params.idPerson;
    const personIndex = personsData.findIndex((elem) => elem.id === idPerson);

    if (personIndex === -1) return res.status(404).send("No record was found");

    personsData.splice(personIndex, 1);
    return res.json(personsData);
  });

app.get("/info", (req, res) => {
  let actualDate = new Date();
  let textInfo =
    `Phonebook has info for ${personsData.length} people <br>` + actualDate;
  res.send(textInfo);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running with express");
});
