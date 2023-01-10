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
    <div className='sizebox1'>
      <div className='sizebox2'>
          test text
        </div>
      <div className='sizebox3'>
      <div className='sizebox4'>
          test text
        </div>
        <div className='sizebox5'>
          test text
        </div>
      </div>
    </div>
  )
}
const testJson = [
  {
    type:"firts div",
    props:{
      children:[
        {
          type:"second div",
          props:{
            children:[
              {
                type:"third div",
                props:{
                  children:[
                    {
                      type:"fourth div",
                      props:{
                        children:"reached!"
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
]
const App = () => {
  function testRecursive(el:any){
    if(el instanceof Array){
      if(el.map((item:any)=>item.props.children)){
        console.log("test: ", el.map((item:any)=>item.props.className)) // or ele.type
        return el.map((item)=>testRecursive(item.props.children))
      }else{
        return "???"
      }
    }else{
      return "its not an array anymore lol"
    }
    return 
  }
  const sheeth = []
  sheeth.push(BasicText())
  console.log(testRecursive(sheeth))
  // console.log(testRecursive(testJson))
  console.log(sheeth)
  // console.log(testJson)
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
