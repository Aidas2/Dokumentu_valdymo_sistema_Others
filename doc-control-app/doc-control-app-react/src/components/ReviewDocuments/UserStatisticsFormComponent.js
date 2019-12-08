import React from "react";

const UserStatisticsFormComponent = props => {
  for (var i = 0; i < 3; i++) {
    console.log("Masyvo elementas " + props.typeList[i]);
  }

  let optionList = props.typeList.map(v => (
    <option key={v.id} value={v.id}>
      {v.title}
    </option>
  ));
  return (
    <form onSubmit={props.handleChartUpdate}>
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
      <div className="form-row justify-content-md-center">
        <h5 style={{ margin: "10px" }}>
          Pasirinkite atvaizduojamų darbuotojų skaičių:
        </h5>
      </div>
      <div className="form-row justify-content-md-center">
        {/* <label htmlFor="numberOfEmployees">Pasirinkite atvaizduojamų darbuotojų skaičių: </label> */}
        <input
          type="text"
          name="numberOfEmployees"
          value={props.numberOfEmployees}
          onChange={props.handleChangeOfnumberOfEmployees}
        />
      </div>
      <div className="form-row justify-content-md-center">
        <p>&nbsp;</p>
      </div>
      <div className="row justify-content-md-center">
        <button className="btn submitButton" type="submit">
          Gauti duomenis
        </button>
      </div>
    </form>
  );
};

export default UserStatisticsFormComponent;
