import React from "react";

export function Extract(el:any){
  let element = new Array
  if(el instanceof Array){
    if(el.map((item:any)=>item.props.children)){
      console.log("test: ", el.map((item:any)=>item.props.children)) // or ele.type or children to return desired elements // this will return classname accordingly to data structure, siblings will shown sides while children is nested or in different line
      element.push(el.map((items)=>Extract(items.props.children)))
      //one way is to remove return and just do stuff here, and possible use state or store the returned stuff to use on another components
    }else{
      return "no props or children available" // need to return stuff aswell
    }
  }else{
    return element // need to return stuff lol
  } 
  return element;
}