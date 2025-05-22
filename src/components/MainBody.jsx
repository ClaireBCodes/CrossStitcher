import { BlankCanvasInterface } from "../forms/BlankCanvasInterface"
import { LandingStart } from "./LandingStart"
import {UploadInterface} from "../forms/UploadInterface"
import CrossStitchEditor from "./CrossStitchEditor"
import { Container } from "react-bootstrap"

export function MainBody() {
    return (
        <Container>
            {/* <LandingStart /> */}
            {/* <UploadInterface />
            <BlankCanvasInterface /> */}
            
            <CrossStitchEditor />
                      
        </Container>
    )
}