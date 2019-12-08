import React from "react";
import FileTransferPopup from "./FileTransferPopup";
import "./FileTransferStyles.css";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FileDownloadComponent from "../Utilities/FileDownloadComponent";
import getBytes from "../Utilities/getBytes";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const EditDocumentComponent = props => {
  let optionList = props.typeList.map(v => (
    //<option value = {v}>{v}</option>
    <option key={v}>{v}</option>
  ));
  let AdditionalFiles =
    props.paths &&
    props.paths.map((path, i) => {
      return (
        path && (
          <FileDownloadComponent
            name="additionalFilePathsToDelete"
            fileSize={getBytes(props.fileInfo[path])}
            delete="yes"
            key={i}
            onClickDelete={event => props.deleteAdditionalFileHandler(event)}
            path={path}
            onClickDownload={event => props.fileDownloadHandler(event)}
          />
        )
      );
    });

  return (
    <div className="page-holder w-100 d-flex flex-wrap justify-content-center">
      <div className="container-fluid px-xl-5">
        <section className="py-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Dokumento redagavimas
                </h3>
              </div>
              <div className="card-body">
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento pavadinimas:
                    </label>
                    <div className="col-md-4 col-lg-4">
                      <input
                        type="text"
                        className="form-control form-control-success"
                        id="validationDefault01"
                        placeholder="Įveskite pavadinimą"
                        //pattern={props.namePattern}
                        value={props.title}
                        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                        required
                        onChange={props.handleChangeOfTitle}
                        //title={props.namePatternTitle}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento aprašymas:
                    </label>
                    <div className="col-md-4 col-lg-4">
                      <textarea
                        rows="4"
                        cols="50"
                        type="text"
                        className="form-control form-control-success"
                        //name="lastname"
                        placeholder="Įveskite aprašymą"
                        //pattern={props.namePattern}
                        //title={props.namePatternTitle}
                        value={props.description}
                        onChange={props.handleChangeOfDescription}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento tipas:
                    </label>
                    <div className="col-md-3">
                      <select
                        className="form-control form-control-success"
                        value={props.type}
                        required
                        onChange={props.handleChangeOfType}
                      >
                        <option hidden>Pasirinkite...</option>
                        {optionList}
                      </select>
                    </div>
                  </div>
                  {/* {!props.path && } */}
                  {props.path ? (
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">
                        Pagrindinė byla:
                      </label>
                      <div className="col-md-4 col-lg-4">
                        <FileDownloadComponent
                          fileSize={getBytes(props.fileInfo[props.path])}
                          id={props.path}
                          deleteName="mainFilePathToDelete"
                          delete="yes"
                          onClickDelete={event =>
                            props.deleteMainFileHandler(event)
                          }
                          path={props.path}
                          onClickDownload={event =>
                            props.fileDownloadHandler(event)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="form-group row">
                      <label className="col-md-2 col-lg-2 form-control-label">
                        Pagrindinė byla:
                      </label>
                      <div className="col-md-4 col-lg-4">
                        {" "}
                        <FilePond
                          maxFileSize="101MB"
                          labelMaxFileSizeExceeded="Neleistinas bylos dydis."
                          labelMaxFileSize="Maksimalus bylos dydis yra 100MB."
                          labelIdle='<span class="filepond--label-action"> Įkelkite</span> pagrindinę bylą.'
                          // labelIdle="Įkelkite pagrindinę bylą."
                          labelFileTypeNotAllowed=""
                          fileValidateTypeLabelExpectedTypes=""
                          labelButtonRemoveItem="Pašalinti"
                          name="selectedFiles"
                          allowMultiple={false}
                          // onaddfile={props.validate}
                          onupdatefiles={fileItem =>
                            props.onUpdateMainFile(fileItem)
                          }
                          acceptedFileTypes={["application/pdf"]}
                        />
                      </div>
                    </div>
                  )}

                  {props.paths && props.paths.length === 0 ? (
                    ""
                  ) : (
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label ">
                        Papildomos bylos:
                      </label>
                      <div className="col-md-4">{AdditionalFiles}</div>
                    </div>
                  )}

                  <div className="row">
                    <label className="col-md-2 form-control-label ">
                      {props.paths && props.paths.length === 0
                        ? "Papildomos bylos:"
                        : ""}
                    </label>
                    <div className="col-md-4 col-lg-4">
                      <FilePond
                        maxFileSize="101MB"
                        labelMaxFileSizeExceeded="Neleistinas bylos dydis."
                        labelMaxFileSize="Maksimalus bylos dydis yra 100MB."
                        labelIdle='<span class="filepond--label-action"> Įkelkite</span> papildomas bylas.'
                        labelFileTypeNotAllowed=""
                        fileValidateTypeLabelExpectedTypes=""
                        labelButtonRemoveItem="Pašalinti"
                        name="selectedAdditionalFiles"
                        allowMultiple={true}
                        onupdatefiles={fileItems =>
                          props.onUpdateAdditionalFiles(fileItems)
                        }
                        acceptedFileTypes={[
                          "application/pdf",
                          "image/png",
                          "image/jpg"
                        ]}
                      />
                    </div>
                  </div>
                  {props.percentage ? (
                    <div className="form-group row">
                      <div className="offset-2" />
                      <div className="col-md-3">
                        <FileTransferPopup
                          show={true}
                          // onClose={props.closeFileTransferPopup}
                          percentage={props.percentage}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="form-group row">
                    <div className="col-md-8 d-flex justify-content-center">
                      <button className="btn submitButton " type="submit">
                        Išsaugoti
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditDocumentComponent;
