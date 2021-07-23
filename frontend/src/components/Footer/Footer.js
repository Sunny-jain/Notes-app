import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className = "text-center p-3">
                        Copyright &copy; Notes Keeper
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
