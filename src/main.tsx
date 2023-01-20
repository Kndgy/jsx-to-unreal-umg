import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Extract } from './jsxExtractor';
import test from "./testClass"
import TestClass from './testClass';

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
  // Extract(sheeth)
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
  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , "parent", React.createElement("div", null, "what"))

  return(
    <div>
      firs line
      <br/>
      #
      {test}
      <TestClass/>
      {JSON.stringify(Extract(sheeth))}
      {/* {Extract(sheeth)}
        to return plain text
      */}
      <br/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
