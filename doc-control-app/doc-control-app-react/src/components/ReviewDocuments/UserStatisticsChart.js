import React from "react";

import CanvasJSReact from "../canvasjs-2.3.1/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// let label1 = "Pateikta";
// let label2 = "Priimta";
// let label3 = "Atmesta";

class UserStatisticsChart extends React.Component {
  componentDidMount() {
    console.log("Spausdinu iš ChartComponent");
    console.log("Chart konteinerio vardas yra " + this.props.idName);
    console.log("Submitted yra - " + this.props.submitted);

    //Šitas "duomenys" tik pasitestavimui - ištrinti
    // var duomenys = [{ label: this.props.topSubmittingUsers[0].firstname + this.props.topSubmittingUsers[0].lastname, y: this.props.topSubmittingUsers[0].submittedDocuments },
    // { label: label2, y: this.props.accepted },
    // { label: label3, y: this.props.rejected }];

    var dataForChart = [];
    for (let i = 0; i < this.props.topSubmittingUsers.length; i++) {
      dataForChart.push({
        label:
          this.props.topSubmittingUsers[i].firstname +
          " " +
          this.props.topSubmittingUsers[i].lastname,
        y: this.props.topSubmittingUsers[i].submittedDocuments
      });
    }

    // Originali eilutė -> var chart = new CanvasJS.Chart("chartContainer", {
    var chart = new CanvasJS.Chart(this.props.idName, {
      animationEnabled: true,
      title: {
        text: this.props.documentType
      },
      data: [
        {
          type: "bar",
          dataPoints: dataForChart
        }
      ]
    });
    chart.render();
  }

  render() {
    return (
      <div
        id={this.props.idName}
        style={{
          height: 360 + "px",
          width: 100 + "%",
          margin: 50 + "px",
          textAlign: "center"
        }}
      />
    );

    // NEVEIKIANTIS KODAS. DARYTI KITAIP
    // if(this.props.topSubmittingUsers.length > 0){
    //     return (
    //         <div id={this.props.idName} style={{ height: 360 + "px", width: 100 + "%", margin: 50 + "px", textAlign: "center" }}>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div style={{ height: 360 + "px", width: 100 + "%", margin: 50 + "px", textAlign: "center" }}>
    //             <p>Dokumentų, kurių tipas {this.props.documentType} nėra</p>
    //         </div>
    //     );
    // }
  }
}

export default UserStatisticsChart;
