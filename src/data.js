import React, { useState } from "react";
import Papa from "papaparse";
import "./styles.css";

import csvFile from './df.csv'

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {

	// This state will store the parsed data
	const [data, setData] = useState({});

	// It state will contain the error when
	// correct file extension is not used
	const [error, setError] = useState("");

	// It will store the file uploaded by the user
	const [file, setFile] = useState("");

	// This function will be called when
	// the file input changes
	const handleFileChange = (e) => {
		setError("");
    console.log(e)
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension =
				inputFile?.type.split("/")[1];
			if (
				!allowedExtensions.includes(fileExtension)
			) {
				setError("Please input a csv file");
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
	};
  const handleParse = () => {
    // If user clicks the parse button without a file we show an error
    // Initialize a reader which allows users to read any file or blob.
    // const reader = new FileReader();
    // let fs = require('fs');
    // let file = fs.createReadStream('C:\\Users\\Pankaj Chaudhary\\Desktop\\CIP\\cipold\\LoadMetric\\df.csv');
  
    // Event listener on the reader when the file loads, we parse it and set the data.
    // reader.onload = async ({ target }) => {
      const csv = Papa.parse(csvFile, {
        complete: (results, file) => {
          console.log(results.data);
          const transformedArray = results.data.map((item) => {
            return {
              Measure: item[1], // The second element in the array
              DimensionName: item[2], // The third element in the array
              ColumnName : item[3],
              LoadTime : item[4],
              isMeasureUsedInVisual : item[5],
              ReportName : item[6],
              PageName : item[7],
              VisualName : item[8],
              Query : item[9],
              hasDimensio : item[10]
            };
          });
          setData(transformedArray)
          
        },
        download: true,
        error: (error, file) => {
          console.log('Error while parsing:', error, file);
        },
      });
      // const parsedData = csv?.data;
      // console.log(parsedData)
  
      // if (parsedData && parsedData.length > 0) {
      //   // Here, we set the data state with the parsed data directly
      //   setData(parsedData);
      // } else {
      //   // Handle the case where the CSV data is empty or couldn't be parsed
      //   setError("Unable to parse the CSV data.");
      // }
    };
  
    // reader.readAsText(file);
  // };
  
  console.log(data)

	return (
		<div className="data">
			<h1 className="geeks">GeeksforGeeks</h1>
			<h3>Read CSV file in React</h3>
			<div className="container">
				<label
					htmlFor="csvInput"
					style={{ display: "block" }}
				>
					Enter CSV File
				</label>
				<input
					onChange={handleFileChange}
					id="csvInput"
					name="file"
					type="File"
				/>
				<div>
					<button onClick={handleParse}>
						Parse
					</button>
				</div>
				{/* <div style={{ marginTop: "3rem" }}>
					{error
						? error
						: data.map((e, i) => (
							<div key={i} className="item">
								{e[0]}:{e[1]}
							</div>
						))}
				</div> */}
			</div>
		</div>
	);
};

export default App;