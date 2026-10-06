const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const readPersons = () => {
  const database = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return database.persons;
};

const writePersons = (persons) => {
  fs.writeFileSync(dbPath, JSON.stringify({ persons }, null, 2));
};

app.get("/info", (request, response) => {
  response.send(`
    <p>PhoneBook has info for ${readPersons().length} people</p>
    <p>${new Date().toString()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(readPersons());
});

app.get("/api/persons/:id", (request, response) => {
  const person = readPersons().find(
    (person) => person.id === request.params.id,
  );

  person ? response.json(person) : response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const persons = readPersons();
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "name and number are required",
    });
  }

  if (persons.some((person) => person.name === name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    ...request.body,
    id: String(Math.floor(Math.random() * 999) + 1),
  };

  writePersons([...persons, person]);
  response.status(201).json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const persons = readPersons();
  const remainingPersons = persons.filter(
    (person) => person.id !== request.params.id,
  );

  writePersons(remainingPersons);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
