import React from 'react';
import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';
import { DeleteOutline } from '@material-ui/icons';

const PayerRow = (props) => {
  return (
    <tr>
      <td>{props.data.payerId}</td>
      <td>{props.data.payerName}</td>
      <td>{props.data.tradingPartnerId}</td>
      <td>{props.data.transactionTypes.join(', ')}</td>
      <td>{<input readOnly type="checkbox" checked={props.data.isActive} />}</td>
      <td>{props.data.status}</td>
      <td>{props.data.updatedOn}</td>
      <td>
        <EditOutline onClick={() => props.updatePayer(props.data)} />
      </td>
      <td>
        <DeleteOutline onClick={() => props.deletePayer({ payerId: props.data.payerId })} />
      </td>
    </tr>
  );
};

export default PayerRow;
