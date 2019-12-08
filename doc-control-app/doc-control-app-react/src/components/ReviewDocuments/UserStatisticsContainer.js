import React from "react";
import UserStatisticsFormComponent from "./UserStatisticsFormComponent";
import UserStatisticsComponent from "./UserStatisticsComponent";
import axios from "axios";

class UserStatisticsContainer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedDocTypes: [],
      typeList: [],
      numberOfEmployees: 0,
      usersList: [],
      loading: "Kraunami duomenys. Prašome palaukti."
    };
  }

  handleChangeOfSelectedDocTypes = event => {
    //console.log("Ką aš gaunu iš multiselekto?");
    //console.log("Reikšmė - " + event.target.value);
    this.setState({
      selectedDocTypes: [...event.target.selectedOptions].map(o => o.value)
    });
    console.log("Pasirinkti dokumentai yra " + this.state.selectedDocTypes);
  };

  handleChangeOfnumberOfEmployees = event => {
    this.setState({ numberOfEmployees: event.target.value });
  };

  handleChartUpdate = event => {
    event.preventDefault();
    console.log("Atnaujinu diagramų duomenis. Iš handleChartUpdate");
    //Nusiskaitau statistikos duomenis
    axios
      .post("/api/stats/docTypes/users", {
        documentTypes: this.state.selectedDocTypes,
        usersPerType: this.state.numberOfEmployees
      })
      .then(response => {
        console.log("Nuskaitinėju dokumentų tipų statistikos duomenis");
        this.setState({ usersList: response.data });
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
    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="text-uppercase mb-0">Vartotojų statistika</h6>
                </div>
                <div className="card-body">
                  <div className="row justify-content-md-center">
                    <UserStatisticsFormComponent
                      typeList={this.state.typeList}
                      handleChangeOfSelectedDocTypes={
                        this.handleChangeOfSelectedDocTypes
                      }
                      numberOfEmployees={this.numberOfEmployees}
                      handleChangeOfnumberOfEmployees={
                        this.handleChangeOfnumberOfEmployees
                      }
                      handleChartUpdate={this.handleChartUpdate}
                    />
                  </div>

                  <div className="row justify-content-md-center">
                    {/* <div className="col-12"> */}
                    <UserStatisticsComponent
                      statisticsData={this.state.usersList}
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

export default UserStatisticsContainer;
