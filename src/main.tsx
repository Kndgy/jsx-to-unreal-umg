import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function Test() {
  return(
    <div>
      Test
    </div>
  )
}

const App = () => {
  const test = React.createElement("div","children","huh")
  const reg = /^a*b+[0-9][a-z]/
  const tested = reg.test('b1aa')
  if(" "){
    console.log("a")
  }
  // console.log(test)
  // console.log("jsx element: ", Test())



  return(
    <div>
      <div className='parent test1'>1
        <div className='child test2'>a</div>
        2
        <div className='child test2'>b</div>
        3
      </div>
  </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
