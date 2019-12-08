import React from 'react';

class RejectReasonPopUp extends React.Component {
    render() {
      if(!this.props.show) {
        return null;
      }
  
      return (
        <div className="popup-backdrop">
          <div className="popup">
            <label>Atmetimo priežastis</label>
            <input type="text" onChange={this.props.handleChangeOfRejectionReason}></input>
            <button className="popup-close" onClick={this.props.closePopupAcceptReject}>Gerai</button>
            <button className="popup-close" onClick={this.props.closePopupCancelReject}>Ne</button>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
  
  export default RejectReasonPopUp;