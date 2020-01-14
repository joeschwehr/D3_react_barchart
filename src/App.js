import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper.jsx';
import GenderDropdown from './GenderDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 'men'
        };
    }

    genderSelected = evt => {
        const gender = evt.target.text.split(' ')[1].toLowerCase();
        this.setState({ gender });
    };
    render() {
        return (
            <div className='App'>
                <Navbar expand='lg' variant='light' bg='light'>
                    <Container>
                        <Navbar.Brand href='#'>Barchartly</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <GenderDropdown handleSelect={this.genderSelected} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ChartWrapper gender={this.state.gender} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
