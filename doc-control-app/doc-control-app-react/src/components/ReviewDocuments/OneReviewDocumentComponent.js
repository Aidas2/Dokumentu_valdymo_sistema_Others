import React from "react";
import { Link } from "react-router-dom";
import FileDownloadComponent from "../Utilities/FileDownloadComponent";
import getBytes from "../Utilities/getBytes";

const OneReviewDocumentComponent = props => {
  let AdditionalFiles =
    props.paths &&
    props.paths.map((path, i) => {
      return (
        path && (
          <FileDownloadComponent
            fileSize={getBytes(props.fileInfo[path])}
            key={i}
            path={path}
            onClickDownload={event => props.fileDownloadHandler(event)}
          />
        )
      );
    });
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h6 className="text-uppercase mb-0">Peržiūrimas dokumentas</h6>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Autorius:</p>
                  </div>
                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.author}</p>
                  </div>
                </div>
                {/* <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Numeris:</p>
                  </div>
                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.id}</p>
                  </div>
                </div> */}
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Pavadinimas:</p>
                  </div>
                  <div className="col-9">
                    <p>{props.title}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Aprašymas:</p>
                  </div>
                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.description}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Tipas:</p>
                  </div>
                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.type}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    <p>Pateikimo data:</p>
                  </div>
                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.submissionDate}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3  col-lg-3 col-sm-3 form-control-label">
                    Pagrindinė byla:
                  </label>
                  <div className="col-md-4 col-lg-4 col-sm-6">
                    <FileDownloadComponent
                      fileSize={getBytes(props.fileInfo[props.path])}
                      path={props.path}
                      onClickDownload={event =>
                        props.fileDownloadHandler(event)
                      }
                    />
                  </div>
                </div>
                {props.paths && props.paths.length !== 0 ? (
                  <div className="form-group row">
                    <label className="col-md-3  col-lg-3 col-sm-3 form-control-label">
                      Papildomos bylos:
                    </label>
                    <div className="col-md-4 col-lg-4 col-sm-6">
                      {AdditionalFiles}{" "}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn submitButtonAlt"
                      type="submit"
                      onClick={props.handleAccept}
                    >
                      Patvirtinti
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn deleteButton"
                      type="submit"
                      onClick={() => props.handleReject(props.id)}
                    >
                      Atmesti
                    </button>{" "}
                    &nbsp;
                    <Link
                      to={`/reviewDocuments`}
                      className="btn goBackButton"
                      type="button"
                    >
                      Atgal
                    </Link>{" "}
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OneReviewDocumentComponent;
