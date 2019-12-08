/* eslint-disable no-unused-expressions */
import React from 'react';
import {Card, Row, Col} from 'antd';

const SingleDocumentComponent = (props) => (

    <Card className="document-description" id="document-card" title={props.document.title} bordered={false}>
      <Row className="reject-message">
      {props.userDocument.map(el=>el.rejected &&
      <p>{el.message}</p>
      )}
      </Row>
      <Row>
        <Col span={6}>
          <p>{props.document.createdDate}</p>
          <pre>Sukūrimo data</pre>
          </Col>
          {props.document.submittedDate && <Col span={6}>      
          <p>{props.document.submittedDate ? props.document.submittedDate : "..."}</p>
          <pre>Pateikimo data</pre>
        </Col>}
        {props.document.confirmedDate && <Col span={6}>      
          <p>{props.document.confirmedDate ? props.document.confirmedDate : "..."}</p>
          <pre>Patvirtinimo data</pre>
        </Col>}
        {props.document.rejectedDate && <Col span={6}>      
          <p>{props.document.rejectedDate ? props.document.rejectedDate : "..."}</p>
          <pre>Atemtimo data</pre>
        </Col>}
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.document.number}</p>
          <pre>Dokumento numeris</pre>
          </Col>
          <Col span={12}>     
          <p>{(props.document.type !=null) ? props.document.type.title : 'Tipas nepriskirtas'}</p>
          <pre>Dokumento tipas</pre>
          </Col>
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.document.description}</p>
          <pre>Dokumento aprašymas</pre>
        </Col>
    <Col span={12}>
          <p>{props.userDocument.map(el=>el.submitted ? 'Pateiktas': 'Nepateiktas')}&nbsp;{props.userDocument.map(el=>el.confirmed && <span>Patvirtintas</span> || 
          el.rejected && <span>Atmestas</span>)}</p>
          {/* <p>{props.userDocument.map(el=>el.confirmed && <span>Patvirtintas</span> || 
          el.rejected && <span>Atmestas</span> 
          )}</p> */}
          <pre>Dokumento būsena</pre>
        </Col>
     </Row>
     <Row>
        <Col span={12}>
          <p>{props.user.map(el=>el.name + ' ' + el.surname)}</p>
          <pre>Vartotojo vardas, pavardė</pre>
          </Col>
          <Col span={12}>
          <p>{props.user.map(el=>el.email)}</p>
          <pre>Vartotojo el.paštas: </pre>
        </Col>
       </Row>
      </Card>
  );
  
  export default SingleDocumentComponent;  