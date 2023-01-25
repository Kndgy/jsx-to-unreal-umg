import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Extract } from './parser/jsxExtractor';
import TestClass from './testClass';
import { restructureJSON } from './parser/restructureJSX';

const BasicText = () => {
  var index = 1
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div style={{color:"black", backgroundColor:"white"}} className='sizebox'>
        <div className='textblock'>
            content goes here
        </div>
    </div>
  )
}
interface testComptInterface {
    text?: any;
}
export const TestComp = ({text="empty"}:testComptInterface) =>{
    return (
        <div>
            test
            <br/>
            {text}
        </div>
    )
}

const App = () => {

  var sheeth = []
  sheeth.push(<TestComp/>)
//   console.log(JSON.stringify(restructureJSON(sheeth)))
console.log(sheeth)
//   console.log(restructureJSON(sheeth))
  const test = React.createElement("div",{className:'test value', style: {color: "red"}} , "parent", React.createElement("div", null, "sinlings"))

  return(
    <div>
      {test}
      <TestClass/>
      <br/>
      {/* {JSON.stringify(Extract(sheeth))} */}
      <br/>
      <br/>
      <TestComp/>
      {/* {Extract(sheeth)} */}
      <br/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
