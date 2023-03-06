import { useState } from 'react';
import { nanoid } from 'nanoid';
import { SectionForm } from '../SectionForm/SectionForm';
import { SectionContacts } from '../SectionContacts/SectionContacts';
import { Filter } from '../Filter/Filter';
import styles from './app.module.css';
import { initialContacts } from 'data/initial-contacts';
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    ...initialContacts,
  ]);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
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

    setContacts(prevState => [newContact, ...prevState]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const filterToLowerCase = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const onDeleteContact = deletedId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== deletedId)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Phone book</h2>
      <SectionForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <div className={styles.contactListContainer}>
        <Filter inputValue={filter} onChange={onFilter} />
        <SectionContacts
          contacts={filteredContacts}
          onDelete={onDeleteContact}
        />
      </div>
    </div>
  );
};

export { App };
