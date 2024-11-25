import React, { Component } from 'react'
import { Container, Form, Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import OpenAI from 'openai'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            heading: 'AI generated toast will be shown below',
            response: '...await the reponse',
            loading: false,
            errorMessage: '',
            brideName: '',
            groomName: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isFormValid = () => {
        return this.state.brideName.trim() !== '' && this.state.groomName.trim() !== '';
    }

    onFormSubmit = e => {
        // Start by preventing the default
        e.preventDefault()
        this.setState({ loading: true })

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.brideName, formDataObj.groomName)
        console.log(process.env)

        //OpenAI
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true // needed for client-side usage
        });

        openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a great at Kazakh language and you are helping to generate wedding toasts. Keep responses complete and under 150 words."
                },
                {
                    role: "user",
                    content: `Generate a complete wedding wish for ${formDataObj.brideName} and ${formDataObj.groomName} in Kazakh. Make it concise but ensure it's a complete toast.`
                }
            ],
            temperature: 0.7,
            max_tokens: 300,
            presence_penalty: 0.6,  // Helps ensure complete thoughts
            frequency_penalty: 0.2, // Helps with natural language
            stop: ["###"]  // Clear stop sequence
        })
        .then((response) => {
            this.setState({
                heading: `GPT-4 generated a wedding toast for ${formDataObj.brideName} and ${formDataObj.groomName}`,
                response: response.choices[0].message.content,
                loading: false,
                errorMessage: ''
            })
        }).catch(err => {
            this.setState({ 
                errorMessage: err.message || 'An error occurred while generating the toast',
                loading: false,
                response: ''
            });
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
                                            value={this.state.brideName}
                                            onChange={this.handleInputChange}
                                            placeholder="Example: Далида" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>🤵 Please type a groom's name below</Form.Label>
                                    <Form.Control 
                                            type="text"
                                            name="groomName"
                                            value={this.state.groomName}
                                            onChange={this.handleInputChange}
                                            placeholder="Example: Куаныш" 
                                    />
                                    </Form.Group>
                            </Col>
                        </Row>
                        {this.state.loading ? (
                            <div class="col text-center">
                                <Button variant="primary" disabled>
                                    
                                Loading ...{" "}
                                <Spinner 
                                    as="span"
                                    animation="border" 
                                    size="sm"
                                    role="status"/>
                                </Button>
                            </div>
                            
                        ) :
                            <div class="col text-center">
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={!this.isFormValid()}
                                >
                                    Get AI suggestion 🤖
                                </Button>
                            </div>
                        }
                    </Form>
                    </Container>
                <br />
                <br />
                <Card>
                    <Card.Body>
                        <Card.Title><h6>{this.state.heading}</h6></Card.Title>
                        <hr />
                        <Card.Text>
                            <p>{this.state.response}</p>
                            {this.state.errorMessage && (
                                <h6 className="error">
                                    <strong>Error: {this.state.errorMessage}</strong>
                                </h6>
                            )}
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