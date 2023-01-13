import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Extract } from './jsxExtractor';

const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div className='sizebox1'>
      <div className='sizebox2'>
          test text
      </div>
      <div className='sizebox3'>
        <div className='sizebox4'>
          test text
        </div>
        <div className='sizebox5'>
          test text
        </div>
      </div>
    </div>
  )
}

const App = () => {

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

  var sheeth = []
  // sheeth.push(BasicText())
  // console.log(Extract(sheeth))
  // console.log(sheeth)

  // console.log(JSON.stringify(umgScheme.UMGScheme))
  // console.log(testTemplateString)
  /* const childs = React.Children.map(<>test</>, (item, index)=> {
      return(
        <>{item} string test, index no:{index}</>
      )
    })
    console.log(childs)
  */

  // const testJson = [
  //   {
  //     type:"firts div",
  //     props:{
  //       children:[
  //         {
  //           type:"second div",
  //           props:{
  //             children:[
  //               {
  //                 type:"third div",
  //                 props:{
  //                   children:[
  //                     {
  //                       type:"fourth div",
  //                       props:{
  //                         children:"reached!"
  //                       }
  //                     }
  //                   ]
  //                 }
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     }
  //   }
  // ]
  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , "parent", React.createElement("div", null, "what"))
  // const TestScheme = React.createElement(JsonTagScheme.type, JsonTagScheme.props[0].props, JsonTagScheme.props[0].children)
  // console.log(TestScheme)

  return(
    <div>
      firs line
      <br/>
      #
      {test}
      #
      <br/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
