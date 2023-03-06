import { Component } from 'react';
import { nanoid } from 'nanoid';
import { SectionForm } from '../SectionForm/SectionForm';
import { SectionContacts } from '../SectionContacts/SectionContacts';
import { Filter } from '../Filter/Filter';
import styles from './app.module.css';
import { initialContacts } from 'data/initial-contacts';

class App extends Component {
  state = {
    contacts: [...initialContacts],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const existingContacts = contacts.map(({ name }) => name.toLowerCase());
    const nameToLowerCase = name.toLowerCase();

    if (existingContacts.includes(nameToLowerCase)) {
      return alert(`${name} is already in contacs.`);
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  onFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterToLowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterToLowerCase)
    );
  };

  onDeleteContact = deletedId => {
    console.log(deletedId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== deletedId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Phone book</h2>
        <SectionForm onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <div className={styles.contactListContainer}>
          <Filter inputValue={filter} onChange={this.onFilter} />
          <SectionContacts
            contacts={filteredContacts}
            onDelete={this.onDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export { App };
