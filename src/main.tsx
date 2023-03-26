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

function parseToUmg(jsonStruct: any, shouldCreateSlotPair: boolean = true): string {
    let widgetType = jsonStruct.type;
    let name = jsonStruct.props.name;
    let childrenString = jsonStruct.props.children;

    if (widgetType === "SizeBox") {
        name = jsonStruct.props.name;

        childrenString = parseChildrenToUmg(jsonStruct.props.children);

        const sizeBoxString =
            `
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
            `

        if (shouldCreateSlotPair) {
            return `
                ${sizeBoxString}

                Begin Object Class=/Script/UMGEditor.WidgetSlotPair Name="WidgetSlotPair_0"
                    WidgetName='${name}'
                End Object

                ${childrenString}
            `;
        } else {
            return `
                ${sizeBoxString}

                ${childrenString}
            `;
        }
    } else if (widgetType === "TextBlock") {
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
        <SizeBox name='sizebox-test' children={
            <SizeBox name='sizebox-test2' children={
                <SizeBox name='sizebox-test3' children={
                    <TextBlock name='textblock-test' children='hello'/>
            
                }/>
            }/>
        }/>
  )
  
console.log(parseToUmg(structure))

const App = () => {

  return(
    <div className='main'>
      {/* <Editor/> */}
      {/* result is in console log */}
      <pre>{JSON.stringify(structure, null, 4)}</pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
