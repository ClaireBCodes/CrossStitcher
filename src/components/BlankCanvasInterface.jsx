import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function BlankCanvasInterface () {

    return (
        <div>
        <Form.Label htmlFor="inputWidth">Width:</Form.Label>
        <Form.Control type="text" id="inputWidth" />

        <Form.Label htmlFor="inputHeight">Height:</Form.Label>
        <Form.Control type="text" id="inputHeight" />

        <Button variant="outline-primary">Start Designing!</Button>

        </div>

    )
}