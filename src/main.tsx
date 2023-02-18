import React, { ReactNode, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { Extract } from './parser/jsxExtractor';
import TestClass from './testClass';
// import { CreateJsx, CreateJSON } from 'jsx-transform-json';
import { convertNodeToJSON } from './parser/convertNodeToJSON';
import {createReactElement} from './parser/createJSX';

const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div key={1} ref={useRef().current} style={{color:"black", backgroundColor:"white"}} className='sizebox'>
        <div key={2} className='textblock'>
            content goes here
        </div>
    </div>
  )
}

const App = () => {

  let sheeth = []

  sheeth.push(BasicText())
  console.log(JSON.stringify(convertNodeToJSON(BasicText())))
  console.log(createReactElement(convertNodeToJSON(BasicText())))
  const test = React.createElement("div",{className:'test value', style: {color: "red"}} , "parent", React.createElement("div", null, "siblings"))

  return(
    <div>
      {JSON.stringify(convertNodeToJSON(BasicText()))}
      <p/>
      {createReactElement(convertNodeToJSON(BasicText()))}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
