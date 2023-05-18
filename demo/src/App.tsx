
import { useEffect, useRef, useState } from 'react'
// import {Notify, Gamon, CustomClick, Confirm, Picker, TabBar, Progressbar, InputBasic, InputCheckbox, InputRadio, InputRange, InputSelect, InputTextarea, InputToggle, InputFile, Stepper, Button, Loading, Row, Col, GrabScroll, Layout, InputDate, Sheet, Carousel} from '../../dist/esm'
import {Notify, Gamon, CustomClick, Confirm, Picker, TabBar, Progressbar, InputBasic, InputCheckbox, InputRadio, InputRange, InputSelect, InputTextarea, InputToggle, InputFile, Stepper, Button, Loading, Row, Col, GrabScroll, Layout, InputDate, Sheet, Carousel} from '../../src/index'

function App() {
  const [i, setI] = useState(10)

  return (
    <>
      <Carousel >
        <div className='display-flex justify-content-center'> HERE 1 </div>
        <div className='display-flex justify-content-center'> HERE 2 </div>
        <div className='display-flex justify-content-center'> HERE 3 </div>
      </Carousel>

      {i}
    </>
  )
}

export default App
