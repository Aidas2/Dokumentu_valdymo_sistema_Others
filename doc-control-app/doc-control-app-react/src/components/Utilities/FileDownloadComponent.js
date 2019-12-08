import React from "react";

const FileDownloadComponent = props => {
  return (
    <React.Fragment>
      <div className="fileDownloadComponent filepond--wrapper">
        <div
          className="filepond--root filepond--hopper"
          data-style-button-remove-item-position="left"
          data-style-button-process-item-position="right"
          data-style-load-indicator-position="right"
          data-style-progress-indicator-position="right"
          style={{ height: "30" }}
        >
          <div className="filepond--list-scroller" data-scalable="true" />
          <p
            className="filepond--item"
            style={{
              transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
              opacity: "1",
              height: "34px"
            }}
            data-filepond-item-state="idle"
          />
          <fieldset className="filepond--file-wrapper">
            <legend>{props.path}</legend>

            <div className="filepond--file">
              {props.delete === "yes" ? (
                <React.Fragment>
                  <button
                    className="filepond--file-action-button filepond--action-remove-item"
                    type="button"
                    title="Pašalinti"
                    data-align="left"
                    id={props.path}
                    name={props.name}
                    onClick={event => props.onClickDelete(event)}
                    style={{
                      transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                      opacity: "1"
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z"
                        fill="currentColor"
                        fillRule="nonzero"
                      />
                    </svg>
                  </button>
                  <div
                    className="filepond--file-info"
                    style={{ transform: "translate3d(34px, 0px, 0) " }}
                  >
                    <span
                      className="filepond--file-info-main"
                      aria-hidden="true"
                    >
                      {props.path}
                    </span>
                    <span className="filepond--file-info-sub">
                      {props.fileSize
                        ? props.fileSize
                        : "Atsisiųskite norėdami peržiūrėti."}
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                <div
                  className="filepond--file-info"
                  style={{ transform: "translate3d(0px, 0px, 0) " }}
                >
                  <span className="filepond--file-info-main" aria-hidden="true">
                    {props.path}
                  </span>
                  <span className="filepond--file-info-sub">
                    {props.fileSize
                      ? props.fileSize
                      : "Atsisiųskite norėdami peržiūrėti."}
                  </span>
                </div>
              )}

              <div
                className="filepond--file-status"
                style={{
                  transform: "translate3d(34px, 0px, 0)",
                  opacity: "0",
                  visibility: "hidden;pointer-events:none"
                }}
              >
                <span className="filepond--file-status-main" />
                <span className="filepond--file-status-sub" />
              </div>
              <button
                className="filepond--file-action-button filepond--action-remove-item"
                type="button"
                title="Atsisiųsti."
                data-align="right"
                id={props.path}
                name={props.name}
                onClick={event => props.onClickDownload(event)}
                style={{
                  transform: "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                  opacity: "1"
                }}
              >
                <svg
                  className="fileDownloadButton"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z"
                    fill="currentColor"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
              {/* <div
                class="filepond--progress-indicator filepond--load-indicator"
                style={{
                  opacity: "0",
                  visibility: "hidden",
                  pointerEvents: "none"
                }}
              >
                <svg>
                  <path stroke-width="2" stroke-linecap="round" />
                </svg>
              </div> */}
              {/* <div
                class="filepond--progress-indicator filepond--process-indicator"
                style={{
                  opacity: "0",
                  visibility: "hidden;pointer-events:none"
                }}
              >
                <svg>
                  <path stroke-width="2" stroke-linecap="round" />
                </svg>
              </div> */}
            </div>
          </fieldset>
          <div
            className="filepond--panel filepond--item-panel"
            data-scalable="true"
          >
            <div className="filepond--panel-top filepond--item-panel" />
            <div
              className="filepond--panel-center filepond--item-panel"
              style={{
                transform: "translate3d(0px, 7px, 0) scale3d(1, 0.25, 1)"
              }}
            />
            <div
              className="filepond--panel-bottom filepond--item-panel"
              style={{ transform: "translate3d(0px, 32px, 0)" }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FileDownloadComponent;
