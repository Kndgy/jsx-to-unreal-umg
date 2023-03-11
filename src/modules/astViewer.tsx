import { convertNodeToJSON } from "../parser/convertNodeToJSON"
import { ParseStringtoNode } from "../parser/ParseStringtoNode"

interface astViewer {
    text: string;
}

export const AstViewer = ({text}:astViewer) => {
    return(
        <div>
            <pre>{JSON.stringify(convertNodeToJSON(ParseStringtoNode(text)), null , 2)}</pre>
        </div>
    )
}