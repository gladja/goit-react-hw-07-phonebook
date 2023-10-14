import { BtnDel, Item, List, Row } from './ContactList.styled';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, getAllContacts } from '../../redux/api-request';
import { useEffect } from 'react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts.items);
  const filter = useSelector(state => state.phonebook.filter )
  const isLoading = useSelector(state => state.phonebook.contacts.isLoading )
  const error = useSelector(state => state.phonebook.contacts.error )

  useEffect(() => {
    dispatch(getAllContacts());
  }, [ dispatch ]);

  const handleDelete = (id) => {
    dispatch(deleteContacts(id));
  };

  const contactsFilterResult = contacts?.filter(el => {
    return el.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <List>
      {isLoading && <h2>Loading...</h2>}
      {error && <h3>{error}</h3>}
      {contactsFilterResult && !isLoading && contactsFilterResult.map(({ id, name, number }) => (
        <Item key={id}>
          <Row>{name}</Row>
          <Row> {number}</Row>
          <BtnDel
            onClick={() => handleDelete(id)}
          >
            <IconContext.Provider value={{ color: 'grey', size: 25 }}>
            <AiFillDelete/>
            </IconContext.Provider>
          </BtnDel>
        </Item>
      ))}
    </List>
  );
};
