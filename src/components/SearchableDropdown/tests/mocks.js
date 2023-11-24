import { matchSorter } from 'match-sorter';

export const items = [
  {
    id: 41,
    first_name: 'Catherine',
    last_name: 'Desmond',
    email: 'Clara.Rice@yahoo.com',
    username: 'Vince_Conn76@yahoo.com',
  },
  {
    id: 42,
    first_name: 'Laurence',
    last_name: 'Dante',
    email: 'Verda_White@hotmail.com',
    username: 'Wilhelmine.Beahan82@hotmail.com',
  },
  {
    id: 3,
    first_name: 'Forrest',
    last_name: 'Ernesto',
    email: 'Louisa_Erdman98@gmail.com',
    username: 'Delores70@gmail.com',
  },
  {
    id: 4,
    first_name: 'Zaria',
    last_name: 'Jasper',
    email: 'Pauline_Thompson@yahoo.com',
    username: 'Ramon.Hegmann20@gmail.com',
  },
  {
    id: 5,
    first_name: 'Clementine',
    last_name: 'Rupert',
    email: 'Kenton50@gmail.com',
    username: 'Terrill81@gmail.com',
  },
  {
    id: 6,
    first_name: 'Ramiro',
    last_name: 'Mathew',
    email: 'Audie.Spencer94@gmail.com',
    username: 'Brenda.Kulas@hotmail.com',
  },
  {
    id: 7,
    first_name: 'Modesta',
    last_name: 'Teagan',
    email: 'Abner57@hotmail.com',
    username: 'Walter_Reichert22@hotmail.com',
  },
  {
    id: 8,
    first_name: 'Macie',
    last_name: 'Leora',
    email: 'Ward_Wintheiser88@gmail.com',
    username: 'Juston_Hirthe@yahoo.com',
  },
  {
    id: 9,
    first_name: 'Ophelia',
    last_name: 'Bertrand',
    email: 'Eulalia.Buckridge@hotmail.com',
    username: 'Lori_Halvorson@yahoo.com',
  },
  {
    id: 10,
    first_name: 'Anahi',
    last_name: 'Gerard',
    email: 'Adalberto.Christiansen@hotmail.com',
    username: 'Kaylie_Feest@gmail.com',
  },
];

export const search = ({ variables: { searchString, ids } }) => {
  if (ids && Object.keys(ids).length) {
    return items.filter(u => ids.includes(u.id));
  }
  if (searchString && searchString.length) {
    return matchSorter(items, searchString.substr(1, searchString.length - 2), {
      keys: ['id', 'first_name'],
    });
  }
  return items;
};

export const GET_USERS = `
  query getUsers($searchString: String, $conditions: [wft_user_bool_exp!]) {
    wft_user(
      where: {
        _and: $conditions
        _or: { id: { _ilike: $searchString }}}
      limit: 10
      offset: 0
      order_by: { id: desc }
    ) {
      id
      first_name
    }
  }`;

export const defaultProps = {
  placeholder: 'Search User',
  primaryKey: 'id',
  labelKey: 'first_name',
  query: {
    queryString: GET_USERS,
    queryKey: 'wft_user',
    queryVariables: { conditions: [] },
  },
};
