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

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const NewDocumentComponent = props => {
  let optionList = props.typeList.map(v => (
    //<option value = {v}>{v}</option>
    <option key={v}>{v}</option>
  ));
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="py-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Naujo dokumento suvedimas
                </h3>
              </div>
              <div className="card-body">
                <form className="form-horizontal" onSubmit={props.handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento pavadinimas:
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-success"
                        id="validationDefault01"
                        placeholder="Įveskite pavadinimą"
                        //pattern={props.namePattern}
                        value={props.title}
                        pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                        name="title"
                        required
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-2 form-control-label">
                      Dokumento aprašymas:
                    </label>
                    <div className="col-md-4">
                      <textarea
                        rows="4"
                        cols="50"
                        type="text"
                        className="form-control form-control-success"
                        placeholder="Įveskite aprašymą"
                        value={props.description}
                        name="description"
                        onChange={props.handleChange}
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
                        name="documentTypeTitle"
                        onChange={props.handleChange}
                      >
                        <option value="" hidden>
                          Pasirinkite...
                        </option>
                        {optionList}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-2 col-lg-2 form-control-label">
                      Pasirinkite pridedamus failus:
                    </label>
                    <div className="col-md-6 col-lg-4">
                      <FilePond
                        maxFileSize="101MB"
                        labelMaxFileSizeExceeded="Neleistinas bylos dydis."
                        labelMaxFileSize="Maksimalus bylos dydis yra 100MB."
                        labelIdle='<span class="filepond--label-action"> Įkelkite</span> pagrindinę bylą.'
                        // labelIdle="Įkelkite pagrindinę bylą."
                        labelFileTypeNotAllowed="Netinkamas bylos formatas."
                        fileValidateTypeLabelExpectedTypes="Įkelkite pdf formato bylą."
                        labelButtonRemoveItem="Pašalinti"
                        name="selectedFiles"
                        allowMultiple={false}
                        onupdatefiles={fileItem =>
                          props.onUpdateMainFile(fileItem)
                        }
                        acceptedFileTypes={["application/pdf"]}
                      />
                    </div>
                    <div className="col-md-2 col-lg-2 form-control-label" />
                    <div className="col-md-6 offset-md-2 col-lg-4">
                      {props.mainFileUploaded && (
                        <FilePond
                          maxFileSize="101MB"
                          labelMaxFileSizeExceeded="Neleistinas bylos dydis."
                          labelMaxFileSize="Maksimalus bylos dydis yra 100MB."
                          labelIdle='<span class="filepond--label-action"> Įkelkite</span> papildomas bylas.'
                          labelFileTypeNotAllowed="Netinkamas bylos formatas."
                          fileValidateTypeLabelExpectedTypes=""
                          // fileValidateTypeLabelExpectedTypes="Tinkami formatai: pdf, png, jpeg."
                          labelButtonRemoveItem="Pašalinti"
                          name="selectedAdditionalFiles"
                          allowMultiple={true}
                          onupdatefiles={fileItems =>
                            props.onUpdateAdditionalFiles(fileItems)
                          }
                          // fileValidateTypeDetectType={(source, type) =>
                          //   props.fileValidate(source, type)
                          // }
                          acceptedFileTypes={[
                            "application/pdf",
                            "image/png",
                            "image/jpg"
                          ]}
                        />
                      )}
                    </div>
                    <div className="col-md-2 col-lg-2 form-control-label" />
                    <div className="col-md-6 offset-md-2 col-lg-4">
                      {props.percentage ? (
                        <FileTransferPopup
                          show={true}
                          onClose={props.closeFileTransferPopup}
                          percentage={props.percentage}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-8 d-flex justify-content-center">
                      <button className="btn submitButton" type="submit">
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

export default NewDocumentComponent;
