import React, { useEffect, useState } from 'react'
import { Component } from 'react'
import { Container, Form, Button, Card, Col, Row} from 'react-bootstrap'

const { Configuration, OpenAIApi } = require("openai");

class Home extends Component {
    constructor() {
        super()
        this.state = {
            heading: 'AI generated toast will be shown here',
            response: '...await the reponse'
        }
    }

    onFormSubmit = e => {
        // Start by preventing the default
        e.preventDefault()

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.brideName, formDataObj.groomName)
        console.log(process.env)

        //OpenAI
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY
            });
        const openai = new OpenAIApi(configuration);

        openai.createCompletion({
            model: "davinci:ft-personal-2022-07-07-18-00-39",
            prompt: `Generate a wedding wish for ${formDataObj.brideName} and ${formDataObj.groomName} below in Kazakh:\n\n\n`,
            temperature: 0.56,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          })
          .then((response) => {
            this.setState({
                heading: `GPT-3 generated a wedding toast for ${formDataObj.brideName} and ${formDataObj.groomName}`,
                response: `${response.data.choices[0].text}`
            })
          });
    }

    render() {
        return (
            <div>
                <Container>
                    <br />
                    <h2> Generate a wedding toast in kazakh! 🇰🇿</h2>
                    <br />
                    <Container>
                    <Form onSubmit={this.onFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>👰 Please type a bride's name below</Form.Label>
                                    <Form.Control 
                                            type="text"
                                            name="brideName"
                                            placeholder="Example: Далида" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>🤵 Please type a groom's name below</Form.Label>
                                    <Form.Control 
                                            type="text"
                                            name="groomName"
                                            placeholder="Example: Куаныш" />
                                    </Form.Group>
                            </Col>
                        </Row>
                        <div class="col text-center">
                            <Button variant="primary" type="submit">
                                Get AI suggestion 🤖
                            </Button>
                        </div>
                    </Form>
                    </Container>
                <br />
                <br />
                <Card>
                    <Card.Body>
                        <Card.Title><h6>{this.state.heading}</h6></Card.Title>
                        <hr />
                        <Card.Text>
                            <p>
                                {this.state.response}
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Container>
                <br />
            
            </div>
        )
    }
}

export default Home