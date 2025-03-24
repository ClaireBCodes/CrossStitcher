import { BlankCanvasInterface } from "./BlankCanvasInterface"
import { LandingStart } from "./LandingStart"
import Toolbar from "./Toolbar"
import {UploadInterface} from "./UploadInterface"
import Grid from "./Grid"
import CrossStitchEditor from "./CrossStitchEditor"
import ColorPalette from "./ColorPalette"





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