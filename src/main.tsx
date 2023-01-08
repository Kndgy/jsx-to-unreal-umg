import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

interface JsxScheme {
  type: any
}


function JsxSchemeTemplate (type: string):JsxScheme[] {
  //slightest idea of whats going to be recursive in the scheme template
  const childrenScheme = {
    props: [
      {
        //recursively if has children
        children: [
          {type}
        ],
        props: [
          {
            className:"Test ClassName"
          }
        ]
      }
    ],
  }
  const TemplatedScheme =
  {
    type: {type},
    props: [
      {
        //recursively if has children
        children: [
          childrenScheme
        ],
        props: [
          {
            className:"Test ClassName"
          }
        ]
      }
    ],
  }
  const tokens = new Array<JsxScheme>()
  tokens.push(TemplatedScheme)
  return tokens;
}

function Test() {
  console.log(JsxSchemeTemplate("its working??"))
  return(
    <div className='test' style={{backgroundColor:'black'}}>
      Test
    </div>
  )
}

const App = () => {
  // console.log("test tempplate: ", JsxSchemeTemplate("test"))
  const testProps = {className: 'test'}
  const testTag = 
    <div>
      parent element
      <div>
        children element
      </div>
    </div>
  
  // const TestScheme = React.createElement(JsonTagScheme.type, JsonTagScheme.props[0].props, JsonTagScheme.props[0].children)

  // console.log(TestScheme)

  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , "parent", React.createElement("div", null, "what"))
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

  // const test2 = React.createElement("div", null , "test")
  // console.log("create element second: ",test2)
  // //direct node
  // //props: [... children: "string"]

  // console.log("jsx element: ", Test().props)

  return(
    <div>
      firs line
      <br/>
      #
      {test}
      #
      {/* {TestScheme} */}
      <Test/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
