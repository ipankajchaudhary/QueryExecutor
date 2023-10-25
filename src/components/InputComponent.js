// @ts-nocheck


import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import './InputScreen.css'

const InputScreen = ({ handleFormSubmit }) => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        multipleFiles: false,
        singleFile: false,
        filePath: '',
        modelName: '',
        xmlaEndpoint: '',
        thresholdValue: '',
        isFirstTime: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: fieldValue });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        handleFormSubmit(formData)
        // navigate("/data");
    };


     

    return (
        <div className='container'>
            <h1>Metric Load Time Tool</h1>
            <form className="well form-horizontal mt-5" action="/submit" method="post" id="contact_form">
                <fieldset className='justify-content-between'>
                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">Check for Multiple Files:</label>
                        <div className="col-md-8">
                            <input type="checkbox" id="multiple_files" name="multipleFiles" value={formData.multipleFiles} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">Check for Single File:</label>
                        <div className="col-md-8">
                            <input type="checkbox" id="single_file" name="singleFile" value={formData.singleFile}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">File Paths</label>
                        <div className="col-md-8">
                            <input name="filePath" placeholder="Enter the file path" className="form-control" value={formData.filePath} type="text" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">Model Name</label>
                        <div className="col-md-8">
                            <input name="modelName" placeholder="Enter the Model Name" className="form-control" type="text" value={formData.modelName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">XMLA Endpoint</label>
                        <div className="col-md-8">
                            <input name="xmlaEndpoint" placeholder="Enter the XMLA Endpoint of Workspace" className="form-control" value={formData.xmlaEndpoint} type="text" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">Threshold Value</label>
                        <div className="col-md-8">
                            <input name="thresholdValue" placeholder="Enter Threshold Value" className="form-control" value={formData.thresholdValue} type="text" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <label className="col-md-4 control-label">Running for First Time?</label>
                        <div className="col-md-8">
                            <input type="checkbox" id="running_first_time" name="isFirstTime" value={formData.isFirstTime} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group d-flex">
                        <div className="col-md-8 col-md-offset-4">
                            <button className="btn btn-success" onClick={handleSubmit}>Go!</button>
                        </div>
                    </div>
                </fieldset>
            </form></div>
    );
};

export default InputScreen;
