import React, { Component } from "react";
import Axios from "axios";
import NewDocumentTypeComponent from "./NewDocumentTypeComponent";

export default class NewDocumentTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      selectedDocTypeTitle: "",
      newTitle: "",
      allDocumentTypes: []
    };
    this.data = [
      {
        groupTitle: "Kebabu naikintojai",
        reviewDocTypes: [
          "Prasymas naikinti kebabus",
          "Prasymas gaminti kebabus"
        ],
        submitDocTypes: [
          "Prasymas gaminti kebabys",
          "Atelidimas is darbo",
          "...."
        ]
      },
      {
        groupTitle: "Administracija",
        reviewDocTypes: ["Prasymas padidinti alga", "......", "......"],
        submitDocTypes: [
          "Prasymas padidinti alga",
          "Atelidimas is darbo",
          "....",
          "....."
        ]
      }
    ];
  }

  componentDidMount = () => {
    this.getAllDocumentTypes();
  };

  getAllDocumentTypes = () => {
    Axios.get("/api/doctypes")
      .then(res => {
        this.setState({ allDocumentTypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onValueChangeHandler = event => {
    if (event.target.name === "selectedDocTypeTitle") {
      this.setState({ newTitle: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  showAllDocumentTypes = () => {
    if (this.state.allDocumentTypes.length === 0) {
      return (
        <option value="" disabled>
          Nėra jokių dokumentų tipų....
        </option>
      );
    } else {
      let docTypes = this.state.allDocumentTypes.map(t => {
        return (
          <option key={t.title} value={t.title}>
            {t.title}
          </option>
        );
      });

      return docTypes;
    }
  };

  onClickAddNewDocTypeHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.title;
    Axios.post("/api/doctypes", title)
      .then(res => {
        this.props.showResponseMessage(
          "Naujas dokumento tipas buvo pridėtas",
          "success",
          2500
        );
        this.setState({ title: "" });
        this.getAllDocumentTypes();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSelectedDocTypeID = () => {
    let id = "";
    for (let i = 0; i < this.state.allDocumentTypes.length; i++) {
      if (
        this.state.allDocumentTypes[i].title === this.state.selectedDocTypeTitle
      ) {
        id = this.state.allDocumentTypes[i].id;
        break;
      }
    }
    return id;
  };

  onDeleteCLickHandler = () => {
    console.log(this.getSelectedDocTypeID());
    this.getSelectedDocTypeID();
    Axios.delete("/api/doctypes/" + this.getSelectedDocTypeID())
      .then(res => {
        this.props.showResponseMessage(
          "Dokumento tipas buvo sėkmingai ištrintas",
          "success",
          2500
        );
        this.setState({ newTitle: "" });
        this.getAllDocumentTypes();
      })
      .catch(err => {
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500);
      });
  };

  onClickUpdateHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.newTitle;
    Axios.put("/api/doctypes/" + this.getSelectedDocTypeID(), title)
      .then(res => {
        this.props.showResponseMessage(
          "Dokumento tipas buvo sėkmingai atnaujintas",
          "success",
          2500
        );
        this.setState({ newTitle: "" });
        this.getAllDocumentTypes();
      })
      .catch(err => {
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500);
      });
  };

  render() {
    return (
      <React.Fragment>
        <NewDocumentTypeComponent
          onClickAddNewDocTypeHandler={this.onClickAddNewDocTypeHandler}
          onValueChangeHandler={this.onValueChangeHandler}
          onDeleteCLickHandler={this.onDeleteCLickHandler}
          showAllDocumentTypes={this.showAllDocumentTypes}
          onClickUpdateHandler={this.onClickUpdateHandler}
          goBack={this.goBack}
          state={this.state}
        />
      </React.Fragment>
    );
  }
}
