require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const Note = require("./models/persons");

const app = express();
const dbPath = path.join(__dirname, "db.json");
app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
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

app.get("/api/persons/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Note({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const persons = readPersons();
  const remainingPersons = persons.filter(
    (person) => person.id !== request.params.id,
  );

  writePersons(remainingPersons);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
