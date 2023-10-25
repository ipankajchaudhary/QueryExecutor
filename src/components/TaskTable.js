import React from "react";
// import "./styles.css";
// import data from "../data";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

import { ReactTabulator, reactFormatter } from "react-tabulator";

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Edit | Show";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

// const data = [
//   {
//     id: 1,
//     name: "Oli Bob",
//     age: "12",
//     color: "red",
//     dob: "01/01/1980",
//     rating: 5,
//     passed: true,
//     pets: ["cat", "dog"]
//   },
//   {
//     id: 2,
//     name: "Mary May",
//     age: "1",
//     color: "green",
//     dob: "12/05/1989",
//     rating: 4,
//     passed: true,
//     pets: ["cat"]
//   },
//   {
//     id: 5,
//     name: "Margret Marmajuke",
//     age: "16",
//     color: "yellow",
//     dob: "07/01/1999",
//     rating: 4,
//     passed: false
//   },
//   {
//     id: 6,
//     name: "Van Ng",
//     age: "37",
//     color: "green",
//     dob: "06/10/1982",
//     rating: 4,
//     passed: true,
//     pets: ["dog", "fish"]
//   },
//   {
//     id: 7,
//     name: "Duc Ng",
//     age: "37",
//     color: "yellow",
//     dob: "10/10/1982",
//     rating: 4,
//     passed: true,
//     pets: ["dog"]
//   }
// ];

// Editable Example:
const colorOptions = {
  "": "&nbsp;",
  red: "red",
  green: "green",
  yellow: "yellow"
};
const petOptions = [
  { id: "cat", name: "cat" },
  { id: "dog", name: "dog" },
  { id: "fish", name: "fish" }
];
const editableColumns = [
  {
    title: "Name",
    field: "name",
    width: 150,
    editor: "input",
    headerFilter: "input"
  },
  {
    title: "Age",
    field: "age",
    hozAlign: "left",
    formatter: "progress",
    editor: "progress"
  },
  {
    title: "Favourite Color",
    field: "color",
    editor: "select",
    editorParams: {
      allowEmpty: true,
      showListOnEmpty: true,
      values: colorOptions
    },
    headerFilter: "select",
    headerFilterParams: { values: colorOptions }
  },
  {
    title: "Date Of Birth",
    field: "dob",
    sorter: "date",
    editor: DateEditor,
    editorParams: { format: "MM/DD/YYYY" }
  },
  {
    title: "Pets",
    field: "pets",
    sorter: (a, b) => a.toString().localeCompare(b.toString()),
    // editor: MultiSelectEditor,
    editorParams: { values: petOptions },
    formatter: MultiValueFormatter,
    formatterParams: { style: "PILL" }
  },
  {
    title: "Passed?",
    field: "passed",
    hozAlign: "center",
    formatter: "tickCross",
    editor: true
  }
];

class TaskTable extends React.Component {
  state = {
    data: this.props.data,
    selectedName: ""
  };
  ref = null;


  // "Measure": "MetaCombineStatus",
  // "DimensionName": "Stream Name Dimension Ingestion",
  // "ColumnName": null,
  // "LoadTime": "0.01",
  // "isMeasureUsedInVisual": "0",
  // "ReportName": "Refresh Tracker",
  // "PageName": "-",
  // "VisualName": "-",
  // "Query": null,
  // "hasDimension": "1"



  columns = [
    { title: "Measure", field: "Measure", width: 250 },
    { title: "Dimension Name", field: "DimensionName", width: 200 }, //, hozAlign: "left", formatter: "progress" },
    { title: "Column Name", field: "ColumnName", width: 150 },
    { title: "LoadTime", field: "LoadTime" ,  width: 150 },
    { title: "Report Name", field: "ReportName", width: 150 },
    {
      title: "Page Name",
      field: "PageName",
      width: 175 
     
    },
    {
      title: "Visual Name",
      field: "VisualName",
      editor: "input",
      width: 150 
    }
  ];

  rowClick = (e, row) => {
    // console.log("ref table: ", this.ref.current); // this is the Tabulator table instance
    // console.log("rowClick id: ${row.getData().id}", row, e);
    this.setState({ selectedName: row.getData().name });
  };

  setData = () => {
    this.setState(this.props.data);
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const options = {
      height: 200,
      movableRows: true,
      movableColumns: true
    };
    return (
      <div className="container mt-5 mx-2 border">

        <ReactTabulator
          columns={this.columns}
          data={this.props.data}
          footerElement={<span>Footer</span>}
        />
      </div>
    );
  }
}

export default TaskTable;
