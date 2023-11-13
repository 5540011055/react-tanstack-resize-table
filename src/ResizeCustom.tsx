import React, { CSSProperties, ReactHTML } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

const renderStatus = ( status: string ) => {

  switch (status) {
    case 'DRAFT':
      return <div>แบบร่าง</div>
    case 'CONFIRMED':
      return <div>อนุมัติ</div>
    case 'COMPLETED':
      return <div>ยืนยันสั่งซื้อ</div>
    case 'CANCEL':
      return <div>ยกเลิก</div>
    case 'REJECTED':
      return <div>ลูกค้าปฏิเสธ</div>
    default:
      return <div></div>
  }
}

const ProgressInvoice = ({data}: {data: any}) => {

  return <div>{data.documentNo}</div>
}


type ColumnDefinition = {
  // id: number;
  fieldName: string,
  // header: string,
  sortable?: boolean,
  dataType?: string,
  exportOrder?: number,
  style?: CSSProperties,
  valueStyle?: CSSProperties,
  desktopClassList?: string,
  mobileClassList?: string,
}

type Person = {
  documentNo: string;
  status: string;
  invoice: any;
  // firstName: string
  // lastName: string
  // age: number
  // visits: number
  // status: string
  // progress: number
}

const defaultData: Person[] = [
  {
    documentNo: 'QT-0000001',
    status: "COMPLETED",
    invoice: { documentNo: 'IN-0000002' }
  }
  // {
  //   firstName: 'tanner',
  //   lastName: 'linsley',
  //   age: 24,
  //   visits: 100,
  //   status: 'In Relationship',
  //   progress: 50,
  // },
  // {
  //   firstName: 'tandy',
  //   lastName: 'miller',
  //   age: 40,
  //   visits: 40,
  //   status: 'Single',
  //   progress: 80,
  // },
  // {
  //   firstName: 'joe',
  //   lastName: 'dirte',
  //   age: 45,
  //   visits: 20,
  //   status: 'Complicated',
  //   progress: 10,
  // },
]
type Custom = ColumnDefinition & ColumnDef<Person>;
const defaultColumns: Custom[] = [
  {
    accessorKey: 'documentNo',
    header: 'เลขที่ใบเสนอราคา',
    cell: info => info.getValue(),
    footer: props => props.column.id,
    fieldName: "cxxx",
    
    // header: "aasa",
    // id: 1,
    // sortable: true,
    // desktopClassList: 'docsNoDesktop',
    // mobileClassList: 'docsNoMobile',
    // dataType: 'react',
  },
  {
    accessorKey: 'status',
    header: 'สถานะ',
    cell: info =>  renderStatus(info.row.original.status),
    footer: props => props.column.id,
    fieldName: "cxxx",
  },
  {
    accessorKey: 'invoice',
    header: 'สถานะ',
    cell: info =>  <ProgressInvoice data={info.row.original.invoice} />,
    footer: props => props.column.id,
    fieldName: "cxxx",
  },
  // {
  //   accessorKey: 'firstName',
  //   cell: info => info.getValue(),
  //   footer: props => props.column.id,
  // },
  // {
  //   accessorKey: 'lastName',
  //   cell: info => info.getValue(),
  //   footer: props => props.column.id,
  // },
  // {
  //   accessorKey: 'visits',
  //   header: () => <span>Visits</span>,
  //   footer: props => props.column.id,
  // },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   footer: props => props.column.id,
  // },
  // {
  //   accessorKey: 'progress',
  //   header: 'Profile Progress',
  //   footer: props => props.column.id,
  // },
]

// const defaultColumns2: ColumnDef<Person>[] = [
//   {
//     header: 'Name',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'firstName',
//         cell: info => info.getValue(),
//         footer: props => props.column.id,
//       },
//       {
//         accessorFn: row => row.lastName,
//         id: 'lastName',
//         cell: info => info.getValue(),
//         header: () => <span>Last Name</span>,
//         footer: props => props.column.id,
//       },
//     ],
//   },
//   {
//     header: 'Info',
//     footer: props => props.column.id,
//     columns: [
//       {
//         accessorKey: 'age',
//         header: () => 'Age',
//         footer: props => props.column.id,
//       },
//       {
//         header: 'More Info',
//         columns: [
//           {
//             accessorKey: 'visits',
//             header: () => <span>Visits</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'status',
//             header: 'Status',
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'progress',
//             header: 'Profile Progress',
//             footer: props => props.column.id,
//           },
//         ],
//       },
//     ],
//   },
// ]

function ResizeCustom() {
  const [data, setData] = React.useState(() => [...defaultData])
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ])

  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>('onChange')

  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })
  console.log('table', table.getHeaderGroups())
  return (
    <div className="p-2">
      <select
        value={columnResizeMode}
        onChange={e => setColumnResizeMode(e.target.value as ColumnResizeMode)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      <div className="h-4" />
      <div className="text-xl">{'<table/>'}</div>
      <div className="overflow-x-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        style: {
                          transform:
                            columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : '',
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ResizeCustom