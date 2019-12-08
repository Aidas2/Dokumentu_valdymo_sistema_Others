import React from "react";
import Filler from "./Filler";
import "./FileTransferStyles.css";

class FileTransferPopup extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <div className="progress-bar-container">
            {this.props.percentage !== 100 && (
              <p className="font-weight-bold">Siunčiama...</p>
            )}
            {this.props.percentage === 100 && (
              <p className="font-weight-bold">Nusiųsta!</p>
            )}
            <Filler percentage={this.props.percentage} />
            {/* {this.props.children} */}
          </div>
        </div>
      </div>
    );
  }
}

export default FileTransferPopup;
