import React from "react";
import { Link } from "react-router-dom";
import "./ResourceNotFound.css";

export default class ResourceNotFoundCompoentn extends React.Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          {/* <iframe
            title="player"
            src={music}
            allow="autoplay"
            frameBorder="0"
            width="0"
            height="0"
            loop
          /> */}

          <section className="page_404">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Rodos tu pasiklydai</h3>

                  <p>puslapis, kurio ieškai neegzistuoja!</p>
                  <Link to="/">
                    <div className="link_404">Grįžti atgal</div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
