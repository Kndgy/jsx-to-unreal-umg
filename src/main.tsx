import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Extract } from './jsxExtractor';
import TestClass from './testClass';
import { restructureJSON } from './restructureJSX';

const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div className='sizebox'>
      test content
      <div className='textblock'>
        textblock content
        <div className='textblock2'>
        textblock content2
      </div>
      </div>
    </div>
  )
}

const App = () => {

  var sheeth = []
  sheeth.push(BasicText())
  // Extract(sheeth)
  console.log(JSON.stringify(restructureJSON(sheeth)))
  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , "parent", React.createElement("div", null, "what"))

  return(
    <div>
      firs line
      <br/>
      #
      {test}
      <TestClass/>
      <br/>
      {JSON.stringify(Extract(sheeth))}
      <br/>
      <br/>
      {/* {Extract(sheeth)} */}
      <br/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
