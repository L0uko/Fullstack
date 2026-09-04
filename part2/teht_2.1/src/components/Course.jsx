const Course = (props) => {
  console.log("Course.jsx sisältö", props);
  const { course } = props;

  const Header = (props) => {
    const course = props;
    return <h1>{course.course.name}</h1>;
  };

  const Content = (props) => {
    const courses = props.course.parts;
    console.log("logaa partit", courses);
    return (
      <ul>
        {courses.map((course) => (
          <Part key={course.id} course={course} />
        ))}
      </ul>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.course.name}, {props.course.exercises}
      </p>
    );
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

export default Course;
