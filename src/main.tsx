import React, {useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { Extract } from './parser/jsxExtractor';
// import TestClass from './testClass';
// import { CreateJsx, CreateJSON } from 'jsx-transform-json';
import { convertNodeToJSON } from './parser/convertNodeToJSON';
import {createReactElement} from './parser/createJSX';
import { Editor } from './modules/editor/editor';
import { Extract } from './parser/RestructureJSXtoJSON';
import { SizeBox } from './components/sizeBox';
import { TextBlock } from './components/textblock';


const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
      <div key={1} style={{color:"black", backgroundColor:"white"}} className='sizebox'>
        <div key={2} className='textblock'>
            content goes here
        </div>
      </div>
  )
}

let jsonStruct = {
  "type": "div",
  "props": {
    "className": "sizebox",
    "style": {
      "color": "black",
      "backgroundColor": "white"
    },
    "children": [
      {
        "type": "div",
        "key": "2",
        "ref": null,
        "props": {
          "className": "textblock",
          "style": {},
          "children": [
            "content goes here"
          ]
        }
      }
    ]
  },
  "key": "1"
}

let expectedString = `
  Begin Object Class=/Script/UMG.SizeBox Name="SizeBox_Name"

  //initial slot ok to hardcode
  Begin Object Class=/Script/UMG.SizeBoxSlot Name="SizeBoxSlot_0"
  End Object

  //initialize slot, ok to hardcode but not the childrens
  Begin Object Name="SizeBoxSlot_0"
    Parent=/Script/UMG.SizeBox'"SizeBox_Name"'//current Parent
    Content=/Script/UMG.TextBlock'"TextBlock_Name"'//children, possibly all of the nested children
  End Object

  //properties | props of the slot of the widget
  Begin Object
  Slots(0)=/Script/UMG.SizeBoxSlot'"SizeBoxSlot_0"'
  bExpandedInDesigner=True
  DisplayLabel="SizeBox_Name"
  End Object

  //pair, ok to hardcode
  Begin Object Class=/Script/UMGEditor.WidgetSlotPair Name="WidgetSlotPair_1"
  WidgetName="SizeBox_Name"
  End Object

  //first children
  Begin Object Class=/Script/UMG.TextBlock Name="TextBlock_Name"
  Text=NSLOCTEXT("UMG", "TextBlockDefaultValue", "Text Block")
  DisplayLabel="TextBlock_Name"

  End Object
`

function parseToUmg(){

  let name:string;
  let widgetType:string;

  let umgStr = `
    Begin Object

    Begin Object Slot
    EndObject

    Begin Object Name=" ${widgetType='SizeBoxSlot'}_0"
     parent=/Script/UMG.SizeBox'"${name="SizeBox_Name"}"'
     content=/Script/UMG.TextBlock'"${name="TextBlock_Name"}"'
    End Object

    Begin Object
    Slots(0)=/Script/UMG.${widgetType='SizeBoxSlot'}'"${widgetType='SizeBoxSlot'}_0"'
    bExpandedInDesigner=True
    DisplayLabel="${widgetType='SizeBox_Name'}"
    End Object

    Begin Object Class=/Script/UMGEditor.WidgetSlotPair Name="WidgetSlotPair_1"
    WidgetName="${name="SizeBox_Name"}"
    End Object

    Begin Object Class=/Script/UMG.TextBlock Name="${name="TextBlock_Name"}"
    Text=NSLOCTEXT("UMG", "TextBlockDefaultValue", "Content")
    DisplayLabel="${name="TextBlock_Name"}"

    End Object
  `

  return umgStr
}

console.log(parseToUmg())
console.log( <SizeBox name='test' children={<TextBlock children='test'/>}/> )
// console.log(<TextBlock children='test'/>)
console.log(BasicText())

const App = () => {

  // console.log(convertNodeToJSON(BasicText()))
  // console.log(createReactElement(convertNodeToJSON(BasicText())))
  // console.log(JSON.stringify(Extract(BasicText())))
  // console.log(SizeBox({name: "name", children:<div>test</div>}))
  return(
    <div className='main'>
      {/* <Editor/> */}
      <pre>
        {JSON.stringify(
          convertNodeToJSON(
            <SizeBox name='SizeBox_Name' children={<TextBlock name='TextBlock_Name' children='test'/>}/>
            ),
            null, 
            2
        )}
      </pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
