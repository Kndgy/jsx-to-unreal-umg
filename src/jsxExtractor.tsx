import React from "react";
var index = 0;
export function Extract(el:any){
  index++;
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
  var filteredType: any
  let newElement:any
  let element = new Array
  if(el instanceof Array){
    if(el.map((item:any)=>item.props.children)){
      widgetType = el.map((item:any)=>item.props.className)
      element = widgetType.filter(function(e:any){return e !== undefined})
      newElement = element
      if(newElement == 'sizebox'){
        console.log("this is sizebox, do something here here")
      }
      if(newElement == 'textblock'){
        console.log("this is textblock, nested")
      }
      console.log(newElement, index)
      /*
        this will return element accordingly to data structure, 
        siblings will shown sides while children is nested or in different line
      */
      element.push(el.map((items)=>Extract(items.props.children)))
      //one way is to remove return and just do stuff here, and possible use state or store the returned stuff to use on another components
    }else{
      return "no props or children available" // need to return stuff aswell
    }
  }else{
    return element // need to return stuff lol
  } 
  
  var testTemplateString = `*${element}`

  //first method, mess around string and regex to get the elements 
  var newTemplateString = []
  newTemplateString.push(testTemplateString)
  var newnew = testTemplateString.split(",").join("")
  // console.log(newnew)
  if(newnew == 'textblock'){
    console.log("true")
  }

  // console.log(newTemplateString)
  return newElement;
}