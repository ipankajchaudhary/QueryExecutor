import React, { useEffect, useState } from "react";
import data from "../data";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { Popover } from "react-tiny-popover";

const MainComponent = ({ setdata }) => {
  const uniqueMeasures = new Set();
  const uniqueDimensionNames = new Set();
  const uniqueReportNames = new Set();
  const uniquePageNames = new Set();
  const uniqueVisualNames = new Set();

  // const [uniqueMeasures, setuniqueMeasures] = useState<S>()

  // const [filteredData, setFilteredData] = useState(data) // Store the filtered data

  data.forEach((item) => {
    uniqueMeasures.add(item.Measure);
    uniqueDimensionNames.add(item.DimensionName);
    uniqueReportNames.add(item.ReportName);
    uniquePageNames.add(item.PageName);
    uniqueVisualNames.add(item.VisualName);
  });

  const MeasureOptions = Array.from(uniqueMeasures).map((measure) => ({
    value: measure,
    label: measure,
  }));

  const DimensionNameOptions = Array.from(uniqueDimensionNames).map(
    (dimensionName) => ({
      value: dimensionName,
      label: dimensionName,
    })
  );

  const ReportNameOptions = Array.from(uniqueReportNames).map((reportName) => ({
    value: reportName,
    label: reportName,
  }));

  const PageNameOptions = Array.from(uniquePageNames).map((pageName) => ({
    value: pageName,
    label: pageName,
  }));

  const VisualNameOptions = Array.from(uniqueVisualNames).map((visualName) => ({
    value: visualName,
    label: visualName,
  }));

  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [selectedDimensionNames, setSelectedDimensionNames] = useState([]);
  const [selectedReportNames, setSelectedReportNames] = useState([]);
  const [selectedPageNames, setSelectedPageNames] = useState([]);
  const [selectedVisualNames, setSelectedVisualNames] = useState([]);
  const [filteredData, setFilteredData] = useState(data); // Store the filtered data
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [thresholdfilterChecked, setthresholdFilterChecked] = useState(true);

  useEffect(() => {
    const measureValues = selectedMeasures.map((measure) => measure.value);
    const dimensionValues = selectedDimensionNames.map(
      (measure) => measure.value
    );
    const reportValues = selectedReportNames.map((measure) => measure.value);
    const pageValues = selectedPageNames.map((measure) => measure.value);
    const visualValues = selectedVisualNames.map((measure) => measure.value);

    // Filter data based on selected options
    const filtered = data.filter((item) => {
      return (
        (measureValues.includes("*") || measureValues.includes(item.Measure)) &&
        (dimensionValues.includes("*") ||
          dimensionValues.includes(item.DimensionName)) &&
        (reportValues.includes("*") ||
          reportValues.includes(item.ReportName)) &&
        (pageValues.includes("*") || pageValues.includes(item.PageName)) &&
        (visualValues.includes("*") || visualValues.includes(item.VisualName))
      );
    });
    // console.log(filtered)
    setFilteredData(filtered);
    setdata(filtered);
    if(thresholdfilterChecked == false){
      const filteredcheckboxData = filteredData.filter((item) => item.isMeasureUsedInVisual !== "1")
      console.log(filteredcheckboxData)
      setFilteredData(filteredcheckboxData)
      setdata(filteredData);
    }
    else{
      const filteredcheckboxData = filteredData.filter((item) => item.isMeasureUsedInVisual === "1")
      console.log(filteredcheckboxData)

      setFilteredData(filteredcheckboxData);
      setdata(filteredData);
    }







 
    // setSelectedMeasures(selectedMeasures)
    // setSelectedDimensionNames(selectedDimensionNames)
    // setSelectedVisualNames(selectedVisualNames)
    // setSelectedPageNames(selectedPageNames)
    // setSelectedReportNames(selectedReportNames)
  }, [
    selectedMeasures,
    selectedDimensionNames,
    selectedReportNames,
    selectedPageNames,
    selectedVisualNames,
    thresholdfilterChecked
  ]);

  // console.log(filteredData)
  useEffect(() => {
    setSelectedMeasures([
      { label: "All Measures", value: "*" },
      ...MeasureOptions,
    ]);
    setSelectedDimensionNames([
      { label: "All Dimension Names", value: "*" },
      ...DimensionNameOptions,
    ]);
    setSelectedReportNames([
      { label: "All Report Names", value: "*" },
      ...ReportNameOptions,
    ]);
    setSelectedPageNames([
      { label: "All Page Names", value: "*" },
      ...PageNameOptions,
    ]);
    setSelectedVisualNames([
      { label: "All Visual Names", value: "*" },
      ...VisualNameOptions,
    ]);

    setTimeout(function () {
      let optList = document.getElementsByClassName("css-1qprcsu-option");
      // debugger
      for (let i = 0; i < optList.length; i++) {
        let item = optList[i];
        let index = i;
        addTitle(item, index);
      }
    }, 100);
  }, []);

  function addTitle(item, index) {
    let val = item.innerText;
    item.title = val;
  }
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  // console.log(filteredData);


  const handlethresholdCheckboxChange = () => {
    // Filter the data based on the checkbox state
    const newFilterChecked = !thresholdfilterChecked;
    setthresholdFilterChecked(newFilterChecked);
    console.log(filteredData)

  };


  return (
    <div className="container" style={{ maxWidth: "fit-content" }}>
      <div className="Maindropdowncontainer d-flex justify-content-around">
        <div className="DropDownContainer mx-4">
          <div className="DropdownLabel"> Measure</div>
          <div className="Dropdown">
            <ReactMultiSelectCheckboxes
              options={[{ label: "All", value: "*" }, ...MeasureOptions]}
              placeholderButtonLabel="Selected Measure"
              getDropdownButtonLabel={getDropdownButtonLabel}
              value={selectedMeasures}
              onChange={onChange}
              setState={setSelectedMeasures}
            />
          </div>
        </div>
        <div className="DropDownContainer mx-4">
          <div className="DropdownLabel">Dimension </div>
          <div className="Dropdown">
            <ReactMultiSelectCheckboxes
              options={[{ label: "All", value: "*" }, ...DimensionNameOptions]}
              placeholderButtonLabel="Selected Dimension"
              getDropdownButtonLabel={getDropdownButtonLabel}
              value={selectedDimensionNames}
              onChange={onChange}
              setState={setSelectedDimensionNames}
            />
          </div>
        </div>
        <div className="DropDownContainer mx-4">
          <div className="DropdownLabel">Report </div>
          <div className="Dropdown">
            <ReactMultiSelectCheckboxes
              options={[{ label: "All", value: "*" }, ...ReportNameOptions]}
              placeholderButtonLabel="Selected Report"
              getDropdownButtonLabel={getDropdownButtonLabel}
              value={selectedReportNames}
              onChange={onChange}
              setState={setSelectedReportNames}
            />
          </div>
        </div>
        <div className="DropDownContainer mx-4">
          <div className="DropdownLabel">Page </div>
          <div className="Dropdown">
            <ReactMultiSelectCheckboxes
              options={[{ label: "All", value: "*" }, ...PageNameOptions]}
              placeholderButtonLabel="Selected Page"
              getDropdownButtonLabel={getDropdownButtonLabel}
              value={selectedPageNames}
              onChange={onChange}
              setState={setSelectedPageNames}
            />
          </div>
        </div>
        <div className="DropDownContainer mx-4">
          <div className="DropdownLabel">Visual </div>
          <div className="Dropdown">
            <ReactMultiSelectCheckboxes
              options={[{ label: "All", value: "*" }, ...VisualNameOptions]}
              placeholderButtonLabel="Selected Visual"
              getDropdownButtonLabel={getDropdownButtonLabel}
              value={selectedVisualNames}
              onChange={onChange}
              setState={setSelectedVisualNames}
            />
          </div>
        </div>
        <div className="filtercontainer">
          <Popover
            isOpen={isPopoverOpen}
            positions={["bottom"]} // preferred positions by priority
            content={
              <div className="filters border z-3 bg-light">
                <div className="thresholdfilter">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <small class="form-check-label" for="flexCheckChecked">
                      Above Threshold
                    </small>
                  </div>
                </div>
                <div className="visualfilter">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      checked={thresholdfilterChecked}
                      onChange={handlethresholdCheckboxChange}
                    />
                    <small class="form-check-label" for="flexCheckChecked">
                      Measure Used In Visual
                    </small>
                  </div>
                </div>
              </div>
            }
          >
            <div
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="border position-relative top-50 rounded bg-success"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-filter"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </div>
          </Popover>
        </div>
      </div>
      <div className="cardcontainer mt-3">
        <div class="cards rounded-0 d-flex">
          <div class="carD rounded-0 px-5">
            <div class="card total_measures rounded-0">
              <div class="card-body">
                <h4 class="card-text">
                  {" "}
                  <b>Total Measure Combination</b>{" "}
                </h4>
                <h3 class="card-title mb-auto">{filteredData.length}</h3>
              </div>
            </div>
          </div>

          <div class="carD px-5">
            <div class="card combinations_below_threshold rounded-0">
              <div class="card-body">
                <h4 class="card-text">
                  {" "}
                  <b>Combinations below threshold</b>{" "}
                </h4>
                <h3 class="card-title mb-auto">
                  {
                    filteredData
                      .map((entry) => entry.LoadTime)
                      .filter((e) => e < 2).length
                  }
                </h3>
              </div>
            </div>
          </div>
          <div class="carD px-5">
            <div class="card combinations_above_threshold rounded-0">
              <div class="card-body">
                <h4 class="card-text">
                  {" "}
                  <b>Combinations above threshold</b>{" "}
                </h4>
                <h3 class="card-title mb-auto">
                  {
                    filteredData
                      .map((entry) => entry.LoadTime)
                      .filter((e) => e === 0.01).length
                  }
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
