import './LandingStart.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function BlankCanvasInterface() {
  return (
    <div className="landing-start">
      <div className="form-group">
        <Form.Label htmlFor="inputWidth">Width:</Form.Label>
        <Form.Control type="text" id="inputWidth" />
      </div>
      <div className="form-group">
        <Form.Label htmlFor="inputHeight">Height:</Form.Label>
        <Form.Control type="text" id="inputHeight" />
      </div>
      {/* <Button variant="outline-primary">Start Designing!</Button> */}
      <button>Start Designing!</button>
    </div>
  );
}