import React from 'react';
import { Container, Row, Col } from 'react-grid';
import mug from '../../src/images/sap_mug.png'
import socket from '../../src/images/sap_socket.png'
import hat from '../../src/images/sap_hat.png'

export default function Redeem() {
    return (
        <div id='redeem-page'>
            <h2>Redeem your rewards!</h2>
            <Container id='#redeem-grid'>
            <Row id='row1'>
                <Col><img src={socket}/></Col>
                <Col><img src={mug}/></Col>
                <Col><img src={hat}/></Col>
            </Row>
            <Row id='row2'>
                <Col><div>SAP Pop-Socket</div></Col>
                <Col><div>SAP Mug</div></Col>
                <Col><div>SAP Trucker Hat</div></Col>
            </Row>
            <Row id='row3'>
                <Col><div><button>50 Points</button></div></Col>
                <Col><div><button>100 Points</button></div></Col>
                <Col><div><button>200 Points</button></div></Col>
            </Row>
            </Container>
            <p>*All this merch can be found on https://www.cmgestores.com/SAP1/</p>
            {/*  */}
        </div>
      );
}