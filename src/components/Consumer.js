import React from "react";
import { useTable } from 'react-table'
import { Table as BTable } from "react-bootstrap";

import { CONSUMER_API_URL } from '../config'

const Table = ({ data, columns: originalColumns }) => {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: originalColumns,
    data,
  });

  // Render the UI for your table
  return (
    <div>
      <h3>Consumer</h3>
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

    </div>
  )
}

export const ConsumerTable = () => {

  const [consumerData, setConsumerData] = React.useState([]);
  const consumerDataRef = React.useRef(consumerData);
  const [eventSource, setEventSource] = React.useState();

  React.useEffect(() => {
    consumerDataRef.current = consumerData;
  }, [consumerData]);

  React.useEffect(() => {
    if (eventSource) {
      eventSource.addEventListener("loginEvent", e => {
        if (e.data) {
          setConsumerData([...consumerDataRef.current, {
            topic: "login",
            data: e.data
          }]);
        }
      });
      eventSource.addEventListener("logoutEvent", e => {
        if (e.data) {
          setConsumerData([...consumerDataRef.current, {
            topic: "logout",
            data: e.data
          }]);
        }
      });
      eventSource.addEventListener("viewpageEvent", e => {
        if (e.data) {
          setConsumerData([...consumerDataRef.current, {
            topic: "viewpage",
            data: e.data
          }]);
        }
      });
    }
    return () => {
      if (eventSource)
        eventSource.close();
    }
  }, [eventSource]);

  React.useEffect(() => {
    setEventSource(new EventSource(CONSUMER_API_URL));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Topic',
        accessor: 'topic',
      },
      {
        Header: 'Data',
        accessor: 'data',
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={consumerData}
    />
  );
}

export default ConsumerTable;