import React from 'react';
import styled from 'styled-components';
import PayerRow from '../components/Payer/PayerRow';

function PayerConfigurationLayout() {
    return (
        <>
            <div>Payer Configuration</div>
            <table>
                <th>
                    <td>Name</td>
                    <td>Skill</td>
                    <td>Status</td>
                </th>
                <tbody>
                    <PayerRow />
                    <PayerRow />
                    <PayerRow />
                </tbody>
            </table>
        </>
    );
}

export default PayerConfigurationLayout;
