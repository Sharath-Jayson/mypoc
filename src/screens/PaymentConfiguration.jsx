import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import PayerRow from '../components/Payer/PayerRow';
import { connect } from 'react-redux';
import { deletePayerConfig, createPayerConfig, updatePayerConfig } from '../reducers/PayerSlice';
import CreateEditForm from '../components/Payer/OldCreateEditForm';
import { ItemAddButton } from '../styles/styled-elements';
// import Modal from "../components/Modal"
// import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import ReusableTable from '../components/ReusableTable';
// import { EditOutline } from '@styled-icons/evaicons-outline/EditOutline';
// import { DeleteOutline } from '@material-ui/icons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%'
  }
};

const Styles = styled.table`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    th {
      background-color: #59bfff;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const PayerConfigurationScreen = (props) => {
  const [showNewPayerPopup, setShowNewPayerPopup] = useState(false);
  const [showEditPayerPopup, setShowEditPayerPopup] = useState(false);
  const [updatePayerPopupData, setupdatePayerPopupData] = useState({});

  // const [tableData, setTableData] = useState(props.payers)

  console.log(props);

  const updatePayerPopup = (payerData) => {
    console.log(payerData);
    setShowEditPayerPopup(true);
    setupdatePayerPopupData(payerData);
  };

  const deletePayer = () => [];

  const columns = useMemo(() => [
    {
      Header: 'Payer ID',
      accessor: 'payerId'
    },
    {
      Header: 'Payer Name',
      accessor: 'payerName'
    },
    {
      Header: 'Trading Partner ID',
      accessor: 'tradingPartnerId'
    },
    {
      Header: 'Transaction Types',
      accessor: 'transactionTypes',
      disableSortBy: true,

      Cell: (cellProps) => {
        return <span>{cellProps.value.join(', ')}</span>;
      }
    },
    {
      Header: 'Is Active',
      accessor: 'isActive',
      Cell: ({ cell: { value } }) => <input type="checkbox" disabled defaultChecked={value} />
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Updated On',
      accessor: 'updatedOn'
    },
    {
      Header: 'Edit',
      disableSortBy: true,
      // cell props has access to row value
      Cell: (cellProps) => {
        return <EditIcon onClick={() => updatePayerPopup(cellProps.row.values)} {...cellProps} />;
      }
    },
    {
      Header: 'Delete',
      disableSortBy: true,
      // cell props has access to row value
      Cell: (cellProps) => {
        return (
          <DeleteIcon
            onClick={() => props.deletePayer({ payerId: cellProps.row.values.payerId })}
          />
        );
      }
    }
  ]);

  return (
    <>
      <Modal
        isOpen={showNewPayerPopup}
        onRequestClose={() => setShowNewPayerPopup(false)}
        style={modalCustomStyles}
        contentLabel="Add New Payer"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <p>
          {' '}
          <button
            style={{ float: 'right', padding: '0.25rem' }}
            onClick={() => setShowNewPayerPopup(false)}
          >
            &times;
          </button>
        </p>
        <CreateEditForm
          addPayer={props.createPayer}
          data={{}}
          mode="CREATE"
          formTitle="Create Payer"
          onSubmit={() => setShowNewPayerPopup(false)}
          closeModal={() => setShowNewPayerPopup(false)}
        />
      </Modal>

      <Modal
        isOpen={showEditPayerPopup}
        onRequestClose={() => setShowEditPayerPopup(false)}
        style={modalCustomStyles}
        contentLabel="Edit Payer"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <p>
          {' '}
          <button
            style={{ float: 'right', padding: '0.25rem' }}
            onClick={() => setShowEditPayerPopup(false)}
          >
            &times;
          </button>
        </p>

        <CreateEditForm
          updatePayer={props.updatePayer}
          data={updatePayerPopupData}
          onSubmit={() => setShowEditPayerPopup(false)}
          mode="UPDATE"
          closeModal={() => setShowEditPayerPopup(false)}
          formTitle="Update Payer"
        />
      </Modal>

      <ItemAddButton onClick={() => setShowNewPayerPopup(true)}>Create Payer</ItemAddButton>

      <Styles>
        <ReusableTable
          columns={columns}
          data={props.payers}
          initialState={{ sortBy: [{ id: 'payerId', desc: false }] }}
        />
      </Styles>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    payers: state.payers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePayer: (obj) => {
      dispatch(deletePayerConfig(obj));
    },
    createPayer: (obj) => {
      dispatch(createPayerConfig(obj));
    },
    updatePayer: (obj) => {
      dispatch(updatePayerConfig(obj));
    }
  };
};

// export default PayerConfigurationLayout;
export default connect(mapStateToProps, mapDispatchToProps)(PayerConfigurationScreen);
