
import { useEffect, useRef, useState } from 'react'
import {Notify, Gamon, CustomClick, Confirm, Picker, TabBar, Progressbar, InputBasic, InputCheckbox, InputRadio, InputRange, InputSelect, InputTextarea, InputToggle, InputFile, Stepper, Button, Loading, Row, Col, GrabScroll, Layout, InputDate, Sheet, Carousel} from '../../dist/esm'
// import {Notify, Gamon, CustomClick, Confirm, Picker, TabBar, Progressbar, InputBasic, InputCheckbox, InputRadio, InputRange, InputSelect, InputTextarea, InputToggle, InputFile, Stepper, Button, Loading, Row, Col, GrabScroll, Layout, InputDate, Sheet, Carousel} from '../../src/index'

function App() {
    const [i, setI] = useState(10)

    return (
        <>  
            {/* <button gamon-sheet-toggle="asa" >aa</button>
            <Sheet id="asa" title="Simple sheet">
                Content of the sheet
            </Sheet> */}

            <b>Toggle input</b>
            <br/>
            <br/>
            <InputToggle activeValue={[2, 'choice 2']} defaultValue={[1, 'choice 1']} />

            <br/>
            <br/>

            <b>Picker</b>
            <Picker options={['item 1', 'item 2', 'item 3', 'item 4', 'item 5']} />

            <br />
            <b>Selector</b>
            <InputSelect options={[
                [1, 'item 1'],
                [2, 'item 2'],
                [3, 'item 3'],
                [4, 'item 4'],
            ]} multi />

            <br />

            <b>File input with multi select and preview</b>
            <InputFile preview previewSize={{maxHeight:100, maxWidth:100}} />

        </>
    )
}

export default App
