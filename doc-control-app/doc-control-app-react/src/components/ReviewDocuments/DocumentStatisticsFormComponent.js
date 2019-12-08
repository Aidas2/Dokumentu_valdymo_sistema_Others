import React from "react";

const DocumentStatisticsFormComponent = props => {
  // for (var i = 0; i < 3; i++) {
  //   console.log("Masyvo elementas " + props.typeList[i]);
  // }

  let optionList = props.typeList.map(v => (
    <option key={v.id} value={v.id}>
      {v.title}
    </option>
  ));
  return (
    <form onSubmit={props.handleChartUpdate}>
      <div className="form-row justify-content-md-center">
        <h5 style={{ margin: "10px" }}>Pasirinkite laikotarpį:</h5>
      </div>
      <div className="form-row justify-content-md-center">
        <label htmlFor="startingDate">Nuo:&nbsp;</label>
        <input
          type="date"
          name="startingDate"
          value={props.startDate}
          onChange={props.handleChangeOfStartDate}
        />
        <label htmlFor="endingDate">&nbsp;Iki:&nbsp;</label>
        <input
          type="date"
          name="endingDate"
          value={props.endDate}
          onChange={props.handleChangeOfEndDate}
        />
      </div>
      <div className="form-row justify-content-md-center">
        <div className="form-group">
          <h5 style={{ margin: "10px" }}>Pasirinkite dokumentų tipus:</h5>
          {/* <label htmlFor="docTypes">Pasirinkite dokumentų tipus:</label> */}
          <select
            multiple
            className="form-control"
            id="docTypes"
            onChange={props.handleChangeOfSelectedDocTypes}
          >
            {optionList}
          </select>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <button className="btn submitButton" type="submit">
          Gauti duomenis
        </button>
      </div>
    </form>
  );
};

export default DocumentStatisticsFormComponent;
