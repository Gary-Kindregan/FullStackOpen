const Course = ({ course }) => {
    return (
        <>
            <Header message={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

const Header = ({ message }) => <h1>{message}</h1>

const Content = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0);
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <strong>total of {total} exercises</strong>
        </>
    )
}

const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
}

export default Course;