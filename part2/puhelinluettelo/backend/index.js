require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Note = require("./models/persons");

const app = express();
app.use(express.json());
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.get("/api/persons", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.send(`
    <p>PhoneBook has info for ${notes.length} people</p>
    <p>${new Date().toString()}</p>
  `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Note({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  console.log("pilkottu content == ", name, number);
  Note.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end;
      }
      person.name = name;
      person.number = number;
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
