import { BtnDel, Item, List, Row } from './ContactList.styled';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, getAllContacts } from '../../redux/api-request';
import { useEffect } from 'react';
import { selectContacts, selectError, selectFilter, selectIsLoading } from '../../redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

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
      {contactsFilterResult && !isLoading && contactsFilterResult.map(({ id, name, phone }) => (
        <Item key={id}>
          <Row>{name}</Row>
          <Row>
            <Row> {phone}</Row>
            <BtnDel
              onClick={() => handleDelete(id)}
            >
              <IconContext.Provider value={{ color: 'white', size: 20 }}>
                <AiFillDelete />
              </IconContext.Provider>
            </BtnDel>
          </Row>
        </Item>
      ))}
    </List>
  );
};
