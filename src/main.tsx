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


function parseToUmg(jsonStruct: any): string {
  let widgetType = jsonStruct.type;
  let name = jsonStruct.props.name;
  let childrenString = jsonStruct.props.children;

  if (jsonStruct.type === "SizeBox") {
    widgetType = "SizeBoxSlot";
    name = jsonStruct.props.name;

    childrenString = parseChildrenToUmg(jsonStruct.props.children);
    
    return `
      Begin Object Class=/Script/UMG.SizeBox Name="${name}"

      Begin Object Class=/Script/UMG.SizeBoxSlot Name="SizeBoxSlot_0"
      End Object

      Begin Object Name="SizeBoxSlot_0"
        Parent=/Script/UMG.SizeBox'"${name}"'
        Content=/Script/UMG.TextBlock'"${jsonStruct.props.children[0].props.name}"'
      End Object

      Slots(0)=/Script/UMG.SizeBoxSlot'"SizeBoxSlot_0"'
      bExpandedInDesigner=True
      DisplayLabel="${name}"

      End Object

      Begin Object Class=/Script/UMGEditor.WidgetSlotPair Name="WidgetSlotPair_0"
        WidgetName='${name}'
      End Object

      ${childrenString}
    `;
  }
  else if (jsonStruct.type === "TextBlock") {
    name = jsonStruct.props.name;
    const content = jsonStruct.props.children[0];
    
    return `
      Begin Object Class=/Script/UMG.TextBlock Name="${name}"
        Text=NSLOCTEXT("UMG", "TextBlockDefaultValue", "${content}")
        DisplayLabel='${name}'
      End Object
    `;
  }

  return "";
}


function parseChildrenToUmg(children: any[]): string {
  let childrenString = "";
  children.forEach((child, index) => {
    childrenString += `
      ${parseToUmg(child)}
    `;
  });

  return childrenString;
}

const structure = convertNodeToJSON(
  <SizeBox name='sizebox_parentParent' children={
    <SizeBox name='SizeBox_Parent' 
    children={<SizeBox name='SizeBox_Name' 
      children={
        <TextBlock name='TextBlock_Name' children='test'/>}
        />}
      />}
    />
  )
console.log(parseToUmg(structure))

const App = () => {

  // console.log(convertNodeToJSON(BasicText()))
  // console.log(createReactElement(convertNodeToJSON(BasicText())))
  // console.log(JSON.stringify(Extract(BasicText())))
  return(
    <div className='main'>
      {/* <Editor/> */}
      result is in console log
      <pre>
        {JSON.stringify(
          convertNodeToJSON(
            <SizeBox name='sizebox_parentParent' children={<SizeBox name='SizeBox_Parent' children={<SizeBox name='SizeBox_Name' children={<TextBlock name='TextBlock_Name' children='test'/>}/>} />} />
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
