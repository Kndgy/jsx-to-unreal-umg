import React from "react";
var index = 0;

export function Extract(el:any){
    
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

  //same as above function but wrap the children onto the classname as parents
  function extractChildrenPropsAndClassNameWrapped(obj: any, nodes: any = {}) {
    if (Array.isArray(obj)) {
        obj.forEach(item => extractChildrenPropsAndClassNameWrapped(item, nodes))
    } else {
        if (obj.hasOwnProperty("props")) {
            if (obj.props.hasOwnProperty("className")) {
                if(!nodes.hasOwnProperty(obj.props.className)) {
                    nodes[obj.props.className] = {}
                }
                nodes = nodes[obj.props.className]
            }
            if (obj.props.hasOwnProperty("children")) {
                if (Array.isArray(obj.props.children)) {
                    obj.props.children.forEach((child: any) => {
                        extractChildrenPropsAndClassNameWrapped(child, nodes);
                    });
                } else {
                  extractChildrenPropsAndClassNameWrapped(obj.props.children, nodes);
                }
            }
        }
    }
    return nodes;
}



  var result = extractChildrenPropsAndClassNameWrapped(el)
//   console.log("wrapped in classname : ", result)

  var resultParent = result

  // console.log(result)

//   console.log(el)

  var values: any = []
  var valueRes = Object.values(result).map((items)=>{
    if(items == undefined){
      return
    }else{
      values.push(items)
    }
  })

  // console.log(values)

  const widgetRes = Object.keys(result).map((items)=> {
    var newItems: String[] = []
    var newitms = items;
    if(items == "sizebox"){
      newItems.push(items)
    return(
      `Name= "${newItems}"`
    )
    }else if(items.match(/textblock/g)){
      newItems.push(items)
      return (
        `content ${newItems}`
        )
    }
  })

  console.log(widgetRes)
//   return widgetRes
  // return extractChildrenPropsAndClassName(el)

}
