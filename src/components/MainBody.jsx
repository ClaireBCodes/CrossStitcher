import { BlankCanvasInterface } from "../forms/BlankCanvasInterface"
import { LandingStart } from "./LandingStart"
import {UploadInterface} from "../forms/UploadInterface"
import CrossStitchEditor from "./CrossStitchEditor"

export function MainBody() {
    return (
        <div>
            <LandingStart />
            <UploadInterface />
            <BlankCanvasInterface />
            
            <CrossStitchEditor />
                      
        </div>
    )
}