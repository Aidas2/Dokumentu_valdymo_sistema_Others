import React from "react";
import DocumentStatisticsFormComponent from "./DocumentStatisticsFormComponent";
import DocumentStatisticsComponent from "./DocumentStatisticsComponent";
import axios from "axios";

class DocumentStatisticsContainer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date().getFullYear() + "-01-01",
      endDate: new Date().getFullYear() + "-12-31",
      selectedDocTypes: [],
      typeList: [],
      fullDocumentList: [],
      //submittedDocumentsList: [],
      //acceptedDocumentsList: [],
      //rejectedDocumentsList: [],
      loading: "Kraunami duomenys. Prašome palaukti."
    };
  }

  handleChangeOfStartDate = event => {
    this.setState({ startDate: event.target.value });
    //console.log("Pradžios data yra " + this.state.startDate);
  };

  handleChangeOfEndDate = event => {
    this.setState({ endDate: event.target.value });
    //console.log("Pabaigos data yra " + this.state.endDate);
  };

  handleChangeOfSelectedDocTypes = event => {
    //console.log("Ką aš gaunu iš multiselekto?");
    //console.log("Reikšmė - " + event.target.value);
    this.setState({
      selectedDocTypes: [...event.target.selectedOptions].map(o => o.value)
    });
    console.log("Pasirinkti dokumentai yra " + this.state.selectedDocTypes);
  };

  handleChartUpdate = event => {
    event.preventDefault();
    console.log("Atnaujinu diagramų duomenis. Iš handleChartUpdate");
    //Nusiskaitau statistikos duomenis
    axios
      .post("/api/stats/docTypes", {
        documentTypes: this.state.selectedDocTypes,
        fromDate: this.state.startDate,
        toDate: this.state.endDate
      })
      .then(response => {
        console.log("Nuskaitinėju dokumentų tipų statistikos duomenis");
        this.setState({ fullDocumentList: response.data });
      })
      .catch(error => {
        console.log("KLAIDA!!!! Nenuskaitė dokumentų tipų statistikos" + error);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    //TODO
    //dabar neteisingu adresu ima dokumentus - ima is esamo vartotojo sukurtu dokumentų
    //perdaryti, kad imtų iš tų dokumentų, kuriuos vartotojas gali peržiūrėti.

    //Nuskaitau dokumentų tipus
    axios
      .get("/api/users/reviewDocTypes")
      .then(response => {
        //Anksčiau iš dokumentų tipo atsakymo išrinkdavau tik pavadinimus
        //this.setState({ typeList: response.data.map(item => item.title) });
        //Dabar pasiimu pilną masyvą
        this.setState({ typeList: response.data });
        //console.log("Koks atiduodamas dokumentų tipų sąrašas (naujame dokumente)?");
        //console.log(this.state.typeList);
      })
      .catch(error => {
        console.log("KLAIDA!!!! Nenuskaitė tipų!!!!" + error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    // TESTINIAI DUOMENYS
    // var dataFromServer = [{
    //     documentType: "Atostogų prašymas",
    //     submitted: 15,
    //     accepted: 16,
    //     rejected: 5
    // },
    // {
    //     documentType: "Pašalpos prašymas",
    //     submitted: 5,
    //     accepted: 6,
    //     rejected: 5
    // },
    // {
    //     documentType: "Prašymas padidinti atlyginimą",
    //     submitted: 13,
    //     accepted: 4,
    //     rejected: 6
    // },
    // ];

    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="text-uppercase mb-0">
                    Pateiktų dokumentų statistika
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row justify-content-md-center">
                    <DocumentStatisticsFormComponent
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      handleChangeOfStartDate={this.handleChangeOfStartDate}
                      handleChangeOfEndDate={this.handleChangeOfEndDate}
                      typeList={this.state.typeList}
                      handleChangeOfSelectedDocTypes={
                        this.handleChangeOfSelectedDocTypes
                      }
                      handleChartUpdate={this.handleChartUpdate}
                    />
                  </div>

                  <div className="row justify-content-md-center">
                    {/* <div className="col-12"> */}
                    <DocumentStatisticsComponent
                      statisticsData={this.state.fullDocumentList}
                    />
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default DocumentStatisticsContainer;
