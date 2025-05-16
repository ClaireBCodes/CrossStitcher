import "../styles/componentStyles.css";
import Form from "react-bootstrap/Form";

export function UploadInterface() {
  return (
    <div className="landing-start">
      <p>Upload your image file</p>
      <div className="form-group">
        <Form.Label htmlFor="inputFile">Upload image: </Form.Label>
        <Form.Control type="file" id="inputFile" style={{ width: "80ch" }} />
      </div>
      <div className="form-group">
        <Form.Label htmlFor="inputWidth">Width:</Form.Label>
        <Form.Control type="text" id="inputWidth" />
      </div>
      <div className="form-group">
        <Form.Label htmlFor="inputWidth">Height:</Form.Label>
        <Form.Control type="text" id="inputHeight" />
      </div>

      <div className="form-group">
        <Form.Label htmlFor="inputNumColour">Number of Colours:</Form.Label>
        <Form.Control type="text" id="inputNumColour" />
      </div>
      <button>Create Pattern</button>
    </div>
  );
}
