import React from "react";
var index = 0;

export function Extract(el:React.ReactNode){
    
    function extractChildrenPropsAndClassName(obj: any, parent: any = {}): object {
        if (Array.isArray(obj)) {
            obj.forEach(item => extractChildrenPropsAndClassName(item, parent));
        } else {
            if (obj.hasOwnProperty("props")) {
            if (obj.props.hasOwnProperty("className")) {
                if (!parent.hasOwnProperty(obj.props.className)) {
                parent[obj.props.className] = {};
                }
                parent = parent[obj.props.className];
            }
            if (obj.props.hasOwnProperty("children")) {
                if (Array.isArray(obj.props.children)) {
                obj.props.children.forEach((child: any) => {
                    if (Array.isArray(child)) {
                    child.forEach((c: any) => {
                        extractChildrenPropsAndClassName(c, parent);
                    });
                    } else {
                    if(child.hasOwnProperty("props")) {
                        extractChildrenPropsAndClassName(child, parent);
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
                    extractChildrenPropsAndClassName(obj.props.children, parent);
                } else {
                    parent["value"] = obj.props.children;
                }
                }
            }
            }
        }
        return parent;
    }
         
      
  console.log(extractChildrenPropsAndClassName(el))

}
