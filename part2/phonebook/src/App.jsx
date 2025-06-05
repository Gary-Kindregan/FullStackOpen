import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Banner from './components/Banner'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [bannerConfig, setBannerConfig] = useState(null)

    const effectHook = () => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }
    useEffect(effectHook, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const matchingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        if (matchingPerson) {
            if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(matchingPerson.id, { name: matchingPerson.name, number: newNumber })
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
                        setBannerConfig({ message: `${returnedPerson.name} number updated to ${returnedPerson.number}`, isErrorBanner: false })
                    })
                    .catch(error => {
                        setBannerConfig({ message: `Information of ${matchingPerson.name} has already removed from the server (number)`, isErrorBanner: true })
                        setPersons(persons.filter(person => person.id !== matchingPerson.id))
                    })

            }
        } else {
            personService
                .create({ name: newName, number: newNumber })
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setBannerConfig({ message: `${returnedPerson.name} added`, isErrorBanner: false })
                })
        }

        setTimeout(() => {
            setBannerConfig(null)
        }, 2000)
        setNewName('')
        setNewNumber('')
    }

    const handleDelete = (id) => {
        personService
            .remove(id)
            .then(returnedPerson => {
                setPersons(persons.filter(person => person.id !== returnedPerson.id))
            })
            .catch(error => {
                const matchingPerson = persons.find(person => person.id === id);
                setBannerConfig({ message: `Information of ${matchingPerson.name} has already removed from the server`, isErrorBanner: true })
                setPersons(persons.filter(person => person.id !== id))
            })

        setTimeout(() => {
            setBannerConfig(null)
        }, 2000)
    }

    const personsToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Banner config={bannerConfig} />
            <Filter onFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                name={newName}
                number={newNumber}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            {personsToShow.map(person => <Person key={person.id} person={person} onDelete={() => handleDelete(person.id)} />)}
        </div>
    )
}

export default App