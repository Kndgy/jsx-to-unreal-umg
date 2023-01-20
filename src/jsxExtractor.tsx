import React from "react";
var index = 0;

interface bodyJSX {
  parent: string,
  children: []
}

export function Extract(el:any){
  const bodyJSXS = new Array<bodyJSX>()
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
  var element:any
  var single: string[]
  var newsingle: string[]
  newsingle = []
  single = []
  if(el instanceof Array){
    if(el.map((item:any)=>item.props.children)){
      widgetType = el.map((item:any)=>item.props.className)
      element = widgetType.filter(function(e:any){return e !== undefined})
      element = element
      if(element == 'sizebox'){
        // console.log("this is sizebox, do something here here")
        single.push("sizebox")
        // bodyJSXS.push({parent:"sizebox", children:element})
        newsingle = single.concat("first lol")
      }
      if(element == 'textblock'){
        // bodyJSXS.push({parent:"sizebox", children:element})
        // console.log("this is textblock, nested")
        single.push("textblock")
        newsingle = single.concat("lol")
      }
      console.log(element, index)
      element.push(el.map((items)=>Extract(items.props.children)))
      //one way is to remove return and just do stuff here, and possible use state or store the returned stuff to use on another components
    }else{
      return "no props or children available" // need to return stuff aswell
    }
  }else{
    return  // need to return stuff lol
  } 
  var testTemplateString = `*${element}`
  // console.log(newsingle)
  //first method, mess around string and regex to get the elements 
  var newTemplateString = []
  newTemplateString.push(testTemplateString)
  var newnew = testTemplateString.split(",").join("")
  // console.log(newnew)
  if(newnew == 'textblock'){
    console.log("true")
  }
  // bodyJSXS.push("test")
  let firstText =  JSON.stringify(bodyJSXS)
  
  let text = firstText;
  let result = text.replace(/"|{|}/gi, function (e) {
    return ""
  }).replace("[]","-").replace("null","-").replace("[,]","-");
  // console.log( firstText )
  // console.log(result)
  // console.log(bodyJSXS)
  console.log(JSON.stringify(element))
  //might want to write a recursive parser

  // console.log(element)
  return JSON.stringify(element);
}