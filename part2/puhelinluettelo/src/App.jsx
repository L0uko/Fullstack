import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const nameOnList = persons.find(({ name }) => name === nameObject.name);
    console.log("nameonlist = ", nameOnList);

    if (nameOnList) {
      const replaceNumber = window.confirm(
        `${newName} is already added to phonebook. Do you want to replace with a new one?`,
      );
      if (replaceNumber) {
        console.log("uusi person", nameOnList);
        personService
          .update(nameOnList.id, nameObject)
          .then((returnedPerson) => {
            console.log("returned person", returnedPerson);
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson,
              ),
            );
          });
      }
    } else {
      personService.create(nameObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const removePerson = (event, person) => {
    event.preventDefault();
    const confirmRemove = window.confirm(`Remove ${person.name}?`);
    if (confirmRemove) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((n) => n.id !== person.id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const handleFilterChange = (event) => {
    console.log("haku handlen sisällä");
    setNewFilter(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      </form>
      <h2>add a new number</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
