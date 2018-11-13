import React from "react";
import ReactDOM from "react-dom";
import {Container, Row, Col} from 'reactstrap';

const App = () => {
    return (
        <Container>
            {/* Incase you haven't seen it beofre */}
            <Row>
                <Col className="test">
                    .
                </Col>

            </Row>
        </Container>
    );
};

ReactDOM.render(<App/>, document.getElementById("App"))