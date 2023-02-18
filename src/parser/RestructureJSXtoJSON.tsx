export function Extract(el:JSX.Element){
    
    function RestructureJSXtoJSON(obj: any, parent: any = {}): object {
        if (Array.isArray(obj)) {
            obj.forEach(item => RestructureJSXtoJSON(item, parent));
        } else {
            if (obj.hasOwnProperty("props")) {
            if (obj.props.hasOwnProperty("className")) {
                if (!parent.obj?.props.className) {
                parent[obj.props.className] = {};
                }
                parent = parent[obj.props.className];
            }
            if (obj.props.hasOwnProperty("children")) {
                if (Array.isArray(obj.props.children)) {
                obj.props.children.forEach((child: any) => {
                    if (Array.isArray(child)) {
                    child.forEach((c: any) => {
                        RestructureJSXtoJSON(c, parent);
                    });
                    } else {
                    if(child.hasOwnProperty("props")) {
                        RestructureJSXtoJSON(child, parent);
                    } else {
                        if(!parent.hasOwnProperty("value")) {
                        parent["value"] = [child];
                        } else {
                        parent["value"].push(child);
                        }
                    }
                    }
                });
                } else if (typeof obj.props.children === "string") {
                parent["value"] = obj.props.children;
                } else {
                if (obj.props.children.hasOwnProperty("props")) {
                    RestructureJSXtoJSON(obj.props.children, parent);
                } else {
                    parent["value"] = obj.props.children;
                }
                }
            }
            }
        }
        return parent;
    }
    return RestructureJSXtoJSON(el)

}
