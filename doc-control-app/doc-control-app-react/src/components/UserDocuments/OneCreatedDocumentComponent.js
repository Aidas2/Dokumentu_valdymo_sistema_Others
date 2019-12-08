import React from "react";
import { Link } from "react-router-dom";
import FileDownloadComponent from "../Utilities/FileDownloadComponent";
import getBytes from "../Utilities/getBytes";
const OneCreatedDocumentComponent = props => {
  let AdditionalFiles =
    props.paths &&
    props.paths.map((path, i) => {
      console.log(props.fileInfo[path]);
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
    <div className="page-holder w-100 d-flex flex-wrap   ">
      <div className="container-fluid px-xl-5 ">
        <section className="pt-5">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h6 className="text-uppercase mb-0 ">Sukurtas dokumentas</h6>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    Dokumento pavadinimas:
                  </div>

                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.title}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-3 col-sm-3 form-control-label">
                    Aprašymas:
                  </div>

                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.description}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-sm-3 form-control-label">
                    Tipas:
                  </label>

                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.type}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-sm-3 form-control-label">
                    Sukūrimo data:
                  </label>

                  <div className="col-md-4  col-sm-4 col-lg-4">
                    <p>{props.creationDate}</p>
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
                      {AdditionalFiles}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="form-group row d-flex justify-content-start">
                  <Link
                    to={`/admin/Documents/${props.id}`}
                    className="btn submitButtonAlt m-1 col-md-2  col-sm-4 col-5"
                    type="button"
                  >
                    Redaguoti
                  </Link>

                  <Link
                    to="#"
                    className="btn deleteButton m-1 col-md-2 col-sm-4 col-5"
                    type="submit"
                    onClick={props.handleDelete}
                  >
                    Trinti
                  </Link>

                  <Link
                    to="#"
                    className="btn submitButton m-1 col-md-2 col-sm-4 col-5"
                    type="submit"
                    onClick={props.handleSubmit}
                  >
                    Pateikti
                  </Link>

                  <Link
                    to={`/createdDocuments`}
                    className="btn goBackButton  m-1 col-md-2 col-sm-4 col-5"
                    type="button"
                  >
                    Atgal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    // <div className="container-fluid">
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Numeris:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.id}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Pavadinimas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.title}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Aprašymas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.description}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Tipas:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.type}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Sukūrimo data:</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.creationDate}</p>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-1">
    //             <p>Pridėtas failas:</p>
    //         </div>
    //         <div className="col-3">
    //             <p>{props.path} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p>
    //             {/* <p>{props.filename} &nbsp; <button className="btn btn-primary" type="button" onClick={() => props.downloadHandler()}>Atsisiųsti</button></p> */}
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-4">
    //             <Link to={`/admin/Documents/${props.id}`} className="btn btn-primary" type="button"> Redaguoti </Link> &nbsp;
    //             {/* <button className="btn btn-primary" type="submit" onClick={props.handleEdit}>Redaguoti</button> &nbsp;        */}
    //             <button className="btn btn-danger" type="submit" onClick={props.handleDelete}>Trinti</button> &nbsp;
    //             <button className="btn btn-success" type="submit" onClick={props.handleSubmit}>Pateikti</button> &nbsp;
    //             <a href="/createdDocuments" className="btn btn-dark" role="button" aria-pressed="true">Atgal</a>
    //         </div>
    //     </div>
    //</div>
  );
};

export default OneCreatedDocumentComponent;
