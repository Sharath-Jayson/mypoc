import React from 'react';
import styled, { css } from 'styled-components';
import { CardList } from '@styled-icons/bootstrap/CardList';
import { TaskListSquareRtl } from '@styled-icons/fluentui-system-filled/TaskListSquareRtl';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 12px;
`;
const SidebarListItem = styled.li`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 6px;
  &:hover {
    background-color: rgb(240, 240, 255);
  }
  ${({ active }) =>
    active &&
    `
    background-color: rgb(240, 240, 255);
  `}
`;
const sharedStyle = css`
  margin-right: 5px;
  font-size: 20px !important;
`;
const MyPayerListIcon = styled(CardList)`
  ${sharedStyle}
`;
const MyPayerConfigIcon = styled(TaskListSquareRtl)`
  ${sharedStyle}
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarList>
            <Link to="/payer-configuration" className="link">
              <SidebarListItem active={window.location.pathname === '/payer-configuration'}>
                <MyPayerListIcon size="20" />
                Payer Configuration
              </SidebarListItem>
            </Link>
            <Link to="/payer-status" className="link">
              <SidebarListItem active={window.location.pathname === '/payer-status'}>
                <MyPayerConfigIcon size="20" />
                Payer Status
              </SidebarListItem>
            </Link>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
