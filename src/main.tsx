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

const App = () => {

  var sheeth = []
  // sheeth.push(TestComp({text:"yeah"}))
  // sheeth.push(<TestComp text={"lol"} another={"another test"}/>)
  // console.log(sheeth)

//   console.log(JSON.stringify(restructureJSON(sheeth)))
  sheeth.push(BasicText())
  console.log(restructureJSON(sheeth))
  Extract(sheeth)
  const test = React.createElement("div",{className:'test value', style: {color: "red"}} , "parent", React.createElement("div", null, "sinlings"))

  return(
    <div>
      {test}
      <TestClass/>
      <br/>
      {/* {JSON.stringify(Extract(sheeth))} */}
      <br/>
      <br/>
      {/* {} */}
      <br/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
