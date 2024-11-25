import React from 'react'
import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col } from 'react-bootstrap'
import logo from "../logo.png"


class Footer extends Component {
    render() {
        return(
            <Container> 
                <Row>
                    <Col className="text-center py-3">
                        Made by @baitimbetovg at Nfactorial Incubator 2022
                        <br />
                        updated in 2024 
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Footer