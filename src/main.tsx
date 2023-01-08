import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


// const reg = /^a*b+[0-9][a-z]/
// const tested = reg.test('b1aa')

function Test() {
  return(
    <div className='test' style={{backgroundColor:'black'}}>
      Test
    </div>
  )
}

const App = () => {
  const testProps = {className: 'test'}
  const test = React.createElement("div",{className:'test value', style: {color: "white"}} ,"huh")
  console.log(test)
  console.log("jsx element: ", Test().props)



  return(
    <div>
      firs line
      <Test/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App/>
)
