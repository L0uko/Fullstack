const Persons = ({ personsToShow, removePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={(event) => removePerson(event, person)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
