import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(selectNameFilter) ?? "";

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <ul className={css.cardList}>
        {filteredContacts.map((item) => (
          <Contact
            className={css.cardItem}
            key={item.id}
            id={item.id}
            name={item.name}
            number={item.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
