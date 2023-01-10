import { ReactNode } from "react"

// type NodeType = | "Property" | "Children" | "Program" | "ReactNode"

// interface Serializer {
//   body: ReactNode;
// }

export function Serialize(element: any){

  return Array.of(element.props.children)
}
