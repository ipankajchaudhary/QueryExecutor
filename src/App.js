// @ts-nocheck
import TaskTable from "./components/TaskTable";
import MainComponent from "./components/MainComponent";
import React, { Fragment } from "react";
import InputScreen from "./components/InputComponent";
import DATA from "./data";
import { useState } from "react";
import LoadingSpinner from "./components/Spinner";
import "./styles.css"
import Papa from "papaparse";
import csvFile from './df.csv'

// Allowed extensions for input file
const allowedExtensions = ["csv"];
import { useEffect } from "react";

function App() {


  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [formData, setFormdata] = useState({});
  const [data, setdata] = useState([])
  const handleFormSubmit = (formData) => {
    console.log(formData)
    setLoading(true);
    setFormdata(formData);
    // fetch("http://127.0.0.1:3002/data", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);

    //     setResponse(JSON.parse(data));
    //     setdata(JSON.parse(data).result)
    //     // console.log()
    //     // localStorage.setItem('data', data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert(error);
    //   });

    const csv = Papa.parse(csvFile, {
      complete: (results, file) => {
        console.log(results.data);
        const transformedArray = results.data.map((item) => {
          return {
            Measure: item[1], // The second element in the array
            DimensionName: item[2], // The third element in the array
            ColumnName: item[3],
            LoadTime: item[4],
            isMeasureUsedInVisual: item[5],
            ReportName: item[6],
            PageName: item[7],
            VisualName: item[8],
            Query: item[9],
            hasDimensio: item[10]
          };
        });
        setdata(transformedArray)

      },
      download: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      },
    });
    setLoading(false)
    setResponse(2)
  };
  console.log(typeof(data))

  return (

    <Fragment>
      {/* <Titlebar /> */}
      <div className="container">
        {loading ? (
          <LoadingSpinner />
        ) : response ? (
          // <TableComponent response={response} formData={formData} />
          <>
            <MainComponent data={data} setdata={setdata} />
          </>
        ) : (
          <InputScreen handleFormSubmit={handleFormSubmit} />
        )}
      </div>
    </Fragment>
  );
}

export default App;
