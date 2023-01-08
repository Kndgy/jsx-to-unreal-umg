import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


// const reg = /^a*b+[0-9][a-z]/
// const tested = reg.test('b1aa')

const JsonTagScheme = 
{
  type: "div",
  props: [
    {
      //recursively if has children
      children: [
        "test from json"
      ],
      props: [
        {
          className:"Test ClassName"
        }
      ]
    }
  ],
}

function Test() {
  return(
    <div className='test' style={{backgroundColor:'black'}}>
      Test
    </div>
  )
}

const App = () => {
  const testProps = {className: 'test'}
  const testTag = 
    <div>
      parent element
      <div>
        children element
      </div>
    </div>
  
  const TestScheme = React.createElement(JsonTagScheme.type, JsonTagScheme.props[0].props, JsonTagScheme.props[0].children)

  console.log(TestScheme)

  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , testTag)
  console.log("create element nested: ",test)
  //nested node
  //props: 
      // {
      //   [... children: 
      //     [... props: 
      //       [... children: 
      //         [
      //           ...
      //           0:[ react node ], 
      //           1:[ react node, can be nested on and on following the jsx]
      //         ]
      //       ]
      //     ]
      //   ]
      // }

  const test2 = React.createElement("div", null , "test")
  console.log("create element second: ",test2)
  //direct node
  //props: [... children: "string"]

  console.log("jsx element: ", Test().props)

  return(
    <div>
      firs line
      <br/>
      #
      {test}
      #
      {TestScheme}
      <Test/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
