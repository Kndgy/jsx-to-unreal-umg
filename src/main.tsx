import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Extract } from './jsxExtractor';

const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div className='sizebox'>
      <div className='textblock'>
          test text
      </div>
      <></>
    </div>
  )
}

const App = () => {

  var sheeth = []
  sheeth.push(BasicText())
  console.log(Extract(sheeth))
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
