const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((persons) => (
        <li key={persons.name}>
          {persons.name} {persons.number}
        </li>
      ))}
    </ul>
  );
};
export default Persons;
