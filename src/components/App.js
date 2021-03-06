import { Component } from "react";
import ContactList from "./ContactList/ContactList.jsx";
import Form from "./Form/Form";
import Filter from "./Filter/Filter.jsx";
import shortid from "shortid";
import s from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number }) => {
    let duplicate = this.state.contacts.find(
      (contact) => contact.name === name
    );

    if (duplicate) {
      alert("Такой контакт уже существует!");
    } else {
      const contact = {
        name,
        number,
        id: shortid.generate(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const VisibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={s.phone}>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className={s.contact}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={VisibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
