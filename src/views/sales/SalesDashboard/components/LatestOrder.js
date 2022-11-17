import React, { useMemo, useCallback } from "react";
import { Card, Button, Table, Badge } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";

const { Tr, Td, TBody, THead, Th } = Table;

const orderStatusColor = {
  0: {
    label: "Paid",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  1: {
    label: "Pending",
    dotClass: "bg-amber-500",
    textClass: "text-amber-500",
  },
  2: { label: "Failed", dotClass: "bg-red-500", textClass: "text-red-500" },
};

const OrderColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();

  const onView = useCallback(() => {
    navigate(`/app/sales/order-details/${row.id}`);
  }, [navigate, row]);

  return (
    <span
      className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
      onClick={onView}
    >
      #{row.id}
    </span>
  );
};

const LatestOrder = ({ data = [], className, fetchFilterData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Order",
        accessor: "id",
        sortable: true,
        Cell: (props) => <OrderColumn row={props.row.original} />,
      },
      {
        Header: "First Name",
        accessor: "first_name",
        sortable: true,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        sortable: true,
      },
      {
        Header: "Gender",
        accessor: "gender",
        sortable: true,
      },
      {
        Header: "Salary",
        accessor: "salary",
        sortable: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useTable({ columns, data, initialState: { pageIndex: 0 } });

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <h4>Users</h4>
        <Button
          size="sm"
          variant="solid"
          onClick={() => fetchFilterData({ order: "ASC" })}
        >
          Filter By A to Z
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => fetchFilterData({ order: "DESC" })}
        >
          Filter By Z to A
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => fetchFilterData({ order: "ASC", filter: "Female" })}
        >
          Filter By Female
        </Button>
        <Button
          size="sm"
          variant="solid"
          onClick={() => fetchFilterData({ order: "ASC", filter: "Male" })}
        >
          Filter By Male
        </Button>
      </div>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </Card>
  );
};

export default LatestOrder;
