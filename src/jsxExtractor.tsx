import React from "react";
var index = 0;

export function Extract(el:any){

    //temp var
    let pairClass = "" //WidgetSlotPair_1 //engine generated
    let slotClassName = "" //engine generated
    var widgetClass: String[] = [] //TextBlock_JS, Textblock. etc //variable name
    //slot properties
    let offsets = {left:0, right:0, top:0, bottom:0} //offsets properties
    let anchors = {
      min:{
        x:0,
        y:0
      },
      max:{
        x:0,
        y:0
      }
    } // anchors properties
    let alignment ={x:0, y:0}
    let AutoSize = false
    let ZOrder = 0
    //end slot properties
    const testTemplateString =`
    Begin Object Class=/Script/UMG.SizeBox 
    Name=" ${widgetClass} "
  
      Begin Object Class=/Script/UMG.SizeBoxSlot 
        Name="${slotClassName}_0"
      End object
  
      Begin Object Name="SizeBoxSlot_0" 
        Parent=SizeBox'"SizeBox_JS"'
        Content=TextBlock'"TextBlock_JS"'
      End object
  
      Slots(0)=SizeBoxSlot'"SizeBoxSlot_0"'
      bExpandedInDesigner=True
      DisplayLabel="SizeBox_JS"
      
    End Object
  
    Begin Object Class=/Script/UMGEditor.WidgetSlotPair 
    Name="${pairClass}_0"
      WidgetName="SizeBox_JS"
      SlotPropertyNames (0)="LayoutData" 
      SlotPropertyNames (1)="bAutosize"
      slotPropertyNames (2)="Zorder"
      slotPropertyValues (0)="(
        offsets=(Left=${offsets.left}, Top=${offsets.top},
           Right=${offsets.right}, Bottom==${offsets.bottom}),
        Anchors=(Minimum=(X=${anchors.min.x}, Y=${anchors.min.y}), 
        Maximum (X=${anchors.max.x}, Y=${anchors.max.y})), 
        Alignment=(X= ${alignment.x} , Y=${alignment.y})
      )"
      SlotPropertyValues(1)="${AutoSize}"
      Slot PropertyValues(2)="${ZOrder}"
    End Object
  
    Begin Object Class-/Script/UMG.TextBlock 
    Name="${widgetClass}"
  
      Text=NSLOCTEXT("[7111009045A9112BCD784783480A37A2]", 
      "6442577D4B8A7F0E37DA728885BC22A4", "Text Block content goes here")
      DisplayLabel="TextBlock_JS"
  
    End Object
    `
  
    let sizeboxProps = `
    Begin Object Class=/Script/UMG.SizeBox 
    Name=" ${widgetClass} "
  
      Begin Object Class=/Script/UMG.SizeBoxSlot 
        Name="${slotClassName}_0"
      End object
  
      Begin Object Name="SizeBoxSlot_0" 
        Parent=SizeBox'"SizeBox_JS"'
        Content=TextBlock'"TextBlock_JS" //widgetclass textblock'
      End object
  
      Slots(0)=SizeBoxSlot'"SizeBoxSlot_0"'
      bExpandedInDesigner=True
      DisplayLabel="SizeBox_JS"
      
    End Object
    `
  
    let textBlockProps = `
    Begin Object Class-/Script/UMG.TextBlock 
    Name="${widgetClass}"
  
      Text=NSLOCTEXT("[7111009045A9112BCD784783480A37A2]", 
      "6442577D4B8A7F0E37DA728885BC22A4", 
      "Text Block content goes here //children")
      DisplayLabel="TextBlock_JS"
  
    End Object
    `

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
