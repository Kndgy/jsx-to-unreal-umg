import React, { ReactNode, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { Extract } from './parser/jsxExtractor';
import TestClass from './testClass';
// import { CreateJsx, CreateJSON } from 'jsx-transform-json';
import { convertNodeToJSON } from './parser/convertNodeToJSON';
import {createReactElement} from './parser/createJSX';
import { Editor } from './modules/editor';
import { SizeBox } from './components/sizeBox';

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
  console.log(SizeBox({name: "name", children:<div>test</div>}))

  return(
    <div className='main'>
      {/* <Editor/> */}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
