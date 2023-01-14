import React from "react";

export function Extract(el:any){
  //temp var
  let pairClass = "" //WidgetSlotPair_1 //engine generated
  let slotClassName = "" //engine generated
  let widgetClass = "" //TextBlock_JS //variable name
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

  var widgetType: any
  let element = new Array
  if(el instanceof Array){
    if(el.map((item:any)=>item.props.children)){
      widgetType = el.map((item:any)=>item.props.className)
      var seconType = widgetType.filter(function(e:any){return e !== undefined})
      widgetClass = seconType
      // console.log("test: ", el.map((item:any)=>item.props.className)) // or ele.type or children to return desired elements // this will return classname accordingly to data structure, siblings will shown sides while children is nested or in different line
      element.push(el.map((items)=>Extract(items.props.children)))
      console.log(seconType)
      //one way is to remove return and just do stuff here, and possible use state or store the returned stuff to use on another components
    }else{
      return "no props or children available" // need to return stuff aswell
    }
  }else{
    return element // need to return stuff lol
  } 
  
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
      offsets=(Left=${offsets.left}, Top=${offsets.top}, Right=${offsets.right}, Bottom==${offsets.bottom}),
      Anchors=(Minimum=(X=${anchors.min.x}, Y=${anchors.min.y}), Maximum (X=${anchors.max.x}, Y=${anchors.max.y})), 
      Alignment=(X= ${alignment.x} , Y=${alignment.y})
    )"
    SlotPropertyValues(1)="${AutoSize}"
    Slot PropertyValues(2)="${ZOrder}"

  End Object

  Begin Object Class-/Script/UMG.TextBlock 
  Name="${widgetClass}"

    Text=NSLOCTEXT("[7111009045A9112BCD784783480A37A2]", "6442577D4B8A7F0E37DA728885BC22A4", "Text Block content goes here")
    DisplayLabel="TextBlock_JS"

  End Object
  `
  return testTemplateString;
}