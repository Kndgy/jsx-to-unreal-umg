import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { Serialize } from './serializer';

export interface Program {
  type: string,
  body: String[];
}

//attempt to extract the components children
function extract(element: any) {
  let TagJson = []
  let final = []
  TagJson.push(element)

  if(TagJson[0].props.children instanceof Array){
    console.log("props children is isntance of array")
    const Mapped = TagJson[0].props.children.map((el:any) => el.props)
    final.push(Mapped)
    // TagJson.push(Mapped.map((el:any) => {return el.props}))
    // const pleaseWork = extract(final)
    TagJson.push(final)
  }else{
    console.log("not an array lol")
  }
  return TagJson;
}

const BasicText = () => {
  return(
    //use className to declare widget type, either custom component to support parent name or custom attributes
    <div className='sizebox'>
      <div className='sizebox'>
        <div className='sizebox'>
          test text
        </div>
      </div>
    </div>
  )
}
const testJson = [
  {
    type:"firtst div",
    props: [
      {
        children: [
          {
            type:"second div",
            props: [
              {
                children: [
                  {
                    type:"third div",
                    props: [
                      {
                        children: [
                          {
                            type:"fourh div",
                            props: [
                              {
                                children: "reached"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
const App = () => {
  function testRecursive(el:any){
    const cry = []
    if(el instanceof Array){
      if(el.map((ele)=>ele.props.map((more:any)=>more.children))){
        console.log("test: ", el.map((ele)=>ele.props.map((more:any)=>more.children.map((even:any)=>even.type))))
        el.map((ele)=>ele.props.map((more:any)=>testRecursive(more.children))) 
      }else{
        return "???"
      }
    }else{
      return "its not an array anymore lol"
    }
  }
  console.log(testRecursive(testJson))
  const test = React.createElement("div",{className:'test value', style: {color: "white"}} , "parent", React.createElement("div", null, "what"))
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
  // //direct node
  // //props: [... children: "string"]

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
      {/* {extract(<>what</>)} */}
      {/* {TestScheme} */}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
