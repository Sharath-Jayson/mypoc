import React, { useState, useMemo } from 'react';
import PaymentConfigurationScreen from '../screens/PaymentConfiguration';
import styled from 'styled-components';
import { ItemAddButton } from '../styles/styled-elements';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePayerConfig, createPayerConfig, updatePayerConfig } from '../reducers/PayerSlice';
import CreateEditForm from '../components/Payer/CreateEditForm';
import ReusableTable from '../components/ReusableTable';
import Modal from 'react-modal';
import { connect } from 'react-redux';

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

const MainContent = styled.div`
  margin-top: 2rem;
`;

const PayerConfigurationPage = (props) => {
  const [showNewPayerPopup, setShowNewPayerPopup] = useState(false);
  const [showEditPayerPopup, setShowEditPayerPopup] = useState(false);
  const [updatePayerPopupData, setupdatePayerPopupData] = useState({});

  const updatePayerPopup = (payerData) => {
    console.log(payerData);
    setShowEditPayerPopup(true);
    setupdatePayerPopupData(payerData);
  };

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
    <MainContent>
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

      <ReusableTable
        columns={columns}
        data={props.payers}
        initialState={{ sortBy: [{ id: 'payerId', desc: false }] }}
      />
    </MainContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayerConfigurationPage);
