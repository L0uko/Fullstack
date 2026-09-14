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
    const nameOnList = persons.some((person) => person.name === newName);

    if (nameOnList) {
      alert(`${newName} is already added to phonebook`);
    } else {
      console.log("postattava objekti = ", nameObject);
      personService.create(nameObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
      setNewName("");
      setNewNumber("");
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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
