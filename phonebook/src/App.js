import React from 'react';
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: '',
      notificationClass: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  updateNumber = (person) => {
    if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha humero uudella?`)) {
      const changedPerson = { ...person, number: this.state.newNumber }

      personService
        .update(person.id, changedPerson)
        .then(changedPerson => {
          const persons = this.state.persons.filter(other => other.id !== person.id)
          this.setState({
            persons: persons.concat(changedPerson),
            newName: '',
            newNumber: ''
          })
        })
        .catch(error => {
          this.setState({
            notification: `Henkilön ${person.name} numeron päivitys epäonnistui - henkilöä ei ole enää olemassa puhelinluettelossa`,
            notificationClass: 'error',
            persons: this.state.persons.filter(p => p.id !== person.id)
          })

          this.nullifyNotification()
        })
    }
  }

  nullifyNotification = () => {
    setTimeout(() => {
      this.setState({
        notification: null,
        notificationClass: null
      })
    }, 5000)
  }

  addPerson = (event) => {
    event.preventDefault()
    let found = this.state.persons.find(person => person.name === this.state.newName)

    if (found) {
      this.updateNumber(found)
    } else {
      let personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
  
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            notification: `Lisättiin ${newPerson.name}`,
            notificationClass: 'success',
            newName: '',
            newNumber: ''
          })

          this.nullifyNotification()
        })
    }
  }

  removePerson = (id) => {
    return () => {
      const person = this.state.persons.find(person => person.id === id)

      if (window.confirm(`Poistetaanko ${person.name}?`)) {
        personService
          .remove(id)
          .then(response => {
          const persons = this.state.persons.filter(person => person.id !== id)
            this.setState({
              persons
            })
          })
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} className={this.state.notificationClass} />
        <Filter 
          filter={this.state.filter} 
          handleFilterChange={this.handleFilterChange}
        />
        <EntryForm 
          addPerson={this.addPerson}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
        />
        <Entries 
          persons={this.state.persons}
          filter={this.state.filter}
          removePerson={this.removePerson}  
        />
      </div>
    )
  }
}

export default App;
