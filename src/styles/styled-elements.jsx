import styled from 'styled-components';
import { DeleteOutline } from '@material-ui/icons';
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';

export const TheList = styled.div`
  flex: 4;
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
`;
export const EditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: ${(props) => (props.primary ? 'DarkMagenta' : 'SeaGreen')};
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;
export const MyDeleteOutline = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;
export const MyEditOutline = styled(EditOutline)`
  color: blue;
  cursor: pointer;
`;

export const ItemContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

export const ItemAddButton = styled.button`
  width: 150px;
  border: none;
  padding: 12px;
  background-color: #1876f2;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 1rem;
`;
