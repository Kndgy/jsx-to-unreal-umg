import React, {useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { CreateJsx, CreateJSON } from 'jsx-transform-json';
import { convertNodeToJSON } from './parser/createJSON';
import {createReactElement} from './parser/createJSX';
import { Editor } from './modules/editor/editor';
import { Extract } from './parser/RestructureJSXtoJSON';
import { SizeBox } from './components/sizeBox';
import { TextBlock } from './components/textblock';
import { CanvasPanel } from './components/canvasPanel';


function parseToUmg(jsonStruct: any): string {
  let widgetType = jsonStruct.type;
  let name = jsonStruct.props.name;
  let childrenString = jsonStruct.props.children;

  if (jsonStruct.type === "SizeBox") {
    // widgetType = "SizeBoxSlot";
    name = jsonStruct.props.name;

    childrenString = parseChildrenToUmg(jsonStruct.props.children);
    return `
      Begin Object Class=/Script/UMG.${widgetType} Name="${name}"

      Begin Object Class=/Script/UMG.${widgetType}Slot Name="${widgetType}Slot_0"
      End Object

      Begin Object Name="${widgetType}Slot_0"
        Parent=/Script/UMG.${widgetType}'"${name}"'
        Content=/Script/UMG.${widgetType}'"${jsonStruct.props.children[0].props.name}"'
      End Object

      Slots(0)=/Script/UMG.${widgetType}Slot'"SizeBoxSlot_0"'
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
      Begin Object Class=/Script/UMG.${widgetType} Name="${name}"
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

  console.log(convertNodeToJSON( <TextBlock>asds</TextBlock> ))
  console.log(createReactElement(convertNodeToJSON( <TextBlock>asds</TextBlock> )))
  console.log(Extract( <TextBlock>asds</TextBlock> ))
  console.log( <TextBlock>asds</TextBlock> )
  return(
    <div className='main'>
      {/* <Editor/> */}
      {/* result is in console log */}
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
