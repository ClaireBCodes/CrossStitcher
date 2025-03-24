import { BlankCanvasInterface } from "./BlankCanvasInterface"
import { LandingStart } from "./LandingStart"
import {UploadInterface} from "./UploadInterface"


export function MainBody() {
    return (
        <div>
            <LandingStart />
            <UploadInterface />
            <BlankCanvasInterface />
        </div>
    )
}