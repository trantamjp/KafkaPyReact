import React from "react";
import { useTable } from 'react-table'
import { Table as BTable, Button, Spinner, Modal } from "react-bootstrap";

import { LOGIN_API_URL, LOGOUT_API_URL, VIEWPAGE_API_URL } from '../config'

const userList = [
  {
    username: "mike.hillyer@sakilastaff.com",
    fullName: "Mike Hillyer"
  },
  {
    username: "jon.stephens@sakilastaff.com",
    fullName: "Jon Stephens"
  }
];

const pageList = [
  {
    page: "/page1",
    url: "..."
  },
  {
    page: "/page2",
    url: "..."
  },
  {
    page: "/page3",
    url: "..."
  }
];

function Loading({ loading }) {
  return (
    <Modal
      show={loading}
      size="sm"
      centered
      backdrop="static"
      onHide={() => { }}>
      <Modal.Body><Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        className="mr-2"
        aria-hidden="true" />Loading...</Modal.Body>
    </Modal>
  );
}

const Table = ({ data, columns: originalColumns, loading }) => {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: originalColumns,
    data,
  });

  // Render the UI for your table
  return (
    <div>
      <h3>Publisher</h3>
      <p>Let's publish some events by clicking on the following buttons</p>
      <BTable {...getTableProps()} striped bordered hover size="sm">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>

      <Loading loading={loading} />

    </div>
  )
}

export const ProducerTable = () => {

  const [loading, setLoading] = React.useState(false)

  const handleLogin = (username) => {
    setLoading(true);
    return fetch(LOGIN_API_URL,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username
        })
      }).finally(() => setLoading(false));
  };

  const handleLogout = (username) => {
    setLoading(true);
    return fetch(LOGOUT_API_URL,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username
        })
      }).finally(() => setLoading(false));
  };

  const handleViewPage = (username, page) => {
    setLoading(true);
    return fetch(VIEWPAGE_API_URL,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          page: page.page
        })
      }).finally(() => setLoading(false));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'username',
      },
      {
        Header: 'Event',
        columns: [
          {
            Header: '/login',
            id: 'loginEvent',
            Cell: ({ cell }) => (
              <Button onClick={(e) => handleLogin(cell.row.values.username)}>
                Login
              </Button>
            )
          },
          ...pageList.map((page, idx) => {
            return {
              Header: page.page,
              id: 'viewPageEvent' + page.page,
              Cell: ({ cell }) => (
                <Button onClick={(e) => handleViewPage(cell.row.values.username, page)}>
                  View
                </Button>
              )
            }
          })
          ,
          {
            Header: '/logout',
            id: 'logoutEvent',
            Cell: ({ cell }) => (
              <Button onClick={(e) => handleLogout(cell.row.values.username)}>
                Logout
              </Button>
            )
          },
        ]
      }
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={userList}
      loading={loading}
    />
  );
}

export default ProducerTable;