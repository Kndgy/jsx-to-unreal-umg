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
  if(element === null || element == undefined){
    return `element is either null or empty`
  }
  TagJson.push(element)
  function TestMapped() {
    
  }
  for(var i = 0; i<TagJson.length; i++){
    if(TagJson[0].type == "div"){
      // console.log("div")
    }
    if(TagJson[0].props.children instanceof Array){
      const Mapped = TagJson[0].props.children.map((el:any) => {return el})
      console.log(Mapped) 
    }else{
      console.log("not an array lol")
    }
    // console.log(TagJson[0].props.children)
  }

  // var type = ""
  // var parent = []

  //   const program: Program = {
  //     type: "",
  //     body: [] ,
  //   }
  //   const children = {
  //     props: []
  //   }
  // program.type = "test"
  // if(program.type != " "){
  //   children.props.push("test")
  //   program.body.push(children)
  // }

  // return 
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

const App = () => {
  // const toString = extract(<>test</>)
  // console.log(JSON.stringify(extract(<>""</>)))
  extract(<div>wtf<div>second wtf</div></div>)

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
