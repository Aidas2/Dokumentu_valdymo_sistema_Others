import React, { Component } from "react";

export default class ResponseMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBody: {
        message: "",
        messageType: "",
        show: false
      }
    };
  }

  handleMessageInput = (message, messageType = "info", timeout = 2500) => {
    let messageBody = {
      message: message,
      messageType: messageType,
      show: true
    };
    this.setState({ messageBody }, () => {
      messageBody = {
        message: "",
        messageType: "",
        show: false
      };
      setTimeout(() => {
        this.setState({ messageBody });
      }, timeout);
    });
  };

  // handleMessageInput(
  //   "Vartotojų priskyrimas įvykdytas",
  //   "alert alert-info fixed-top text-center",
  //   2500
  // );

  showMessage = () => {
    const { messageBody } = this.state;
    if (messageBody.show) {
      return (
        <div
          className={`alert alert-${
            messageBody.messageType
          } fixed-top text-center`}
        >
          {messageBody.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        showResponseMessage: this.handleMessageInput
      })
    );

    return (
      <React.Fragment>
        {this.showMessage()}
        {childrenWithProps}
      </React.Fragment>
    );
  }
}
