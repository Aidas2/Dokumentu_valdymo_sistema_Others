import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import line from "../../css/images/lines.png";

const Loading = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted>Kraunami duomenys</Loader>
    </Dimmer>
    <Image src={line} width="100%" />
  </Segment>
);
export default Loading;
