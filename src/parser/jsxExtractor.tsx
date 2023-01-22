import React from "react";
var index = 0;

export function Extract(el:any){

  function extractChildrenPropsAndClassName(obj: any, nodes: any[] = []): string[] {
    if (Array.isArray(obj)) {
        obj.forEach(item => extractChildrenPropsAndClassName(item, nodes))
    } else {
        if (obj.hasOwnProperty("props")) {
            if (obj.props.hasOwnProperty("className")) {
                nodes.push(obj.props.className);
                console.log("classname :", obj.props.className)
            }
            if (obj.props.hasOwnProperty("children")) {
                if (Array.isArray(obj.props.children)) {
                    obj.props.children.forEach((child: any) => {
                        if (typeof child === 'string') {
                            console.log("children string :", child)
                            nodes.push(child);
                        } else {
                            extractChildrenPropsAndClassName(child, nodes);
                        }
                    });
                } else if (typeof obj.props.children === 'string') {
                    console.log("children string in obj props :", obj.props.children)
                    nodes.push(obj.props.children); // return the last children or non props child
                } else {
                    extractChildrenPropsAndClassName(obj.props.children, nodes);
                }
            }
        }
    }
    return nodes;
  }
  // console.log("direct : ",extractChildrenPropsAndClassName(el))

  /*
  */

  //same as above function but wrap the children onto the classname as parents
  function extractChildrenPropsAndClassNameWrapped(obj: any, nodes: any = {}) {
    if (Array.isArray(obj)) {
        obj.forEach(item => extractChildrenPropsAndClassNameWrapped(item, nodes))
    } else {
        if (obj.hasOwnProperty("props")) {
            if (obj.props.hasOwnProperty("className")) {
                if(!nodes.hasOwnProperty(obj.props.className)) {
                    nodes[obj.props.className] = []
                }
            }
            if (obj.props.hasOwnProperty("children")) {
                if (Array.isArray(obj.props.children)) {
                    obj.props.children.forEach((child: any) => {
                        if (typeof child === 'string') {
                            nodes[obj.props.className].push(child);
                        } else {
                          extractChildrenPropsAndClassNameWrapped(child, nodes);
                        }
                    });
                } else if (typeof obj.props.children === 'string') {
                    nodes[obj.props.className].push(obj.props.children);
                } else {
                  extractChildrenPropsAndClassNameWrapped(obj.props.children, nodes);
                }
            }
        }
    }
    return nodes;
  }

  var result = extractChildrenPropsAndClassNameWrapped(el)
  // console.log("wrapped in classname : ", result)

  var resultParent = result

  console.log(result)

  console.log(el)

  var values: any = []
  var valueRes = Object.values(result).map((items)=>{
    if(items == undefined){
      return
    }else{
      values.push(items)
    }
  })

  console.log(values)

  const widgetRes = Object.keys(result).map((items)=> {
    var newItems: String[] = []
    if(items == "sizebox"){
      newItems.push(items)
    return(
      `
      Begin Object Class=/Script/UMG.SizeBox 
      Name=" ${newItems}"

      Begin Object Class=/Script/UMG.SizeBoxSlot 
        Name="${newItems}_0"
      End object

      End Object
      `
    )
    }else if(items == "textblock"){
      newItems.push(items)
      return (
        `content ${newItems} ${values}`.replace(",", "")
        )
    }
  })

  console.log(widgetRes)
  // return widgetRes
  // return extractChildrenPropsAndClassName(el)

}
