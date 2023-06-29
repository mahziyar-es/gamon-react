# gamon-react
gamon-react is a highly customizable React UI component library to make life easier for react developers.


including components like: 
- [`Button`](#button) 
- [`Carousel`](#carousel) => to display beautiful sliders
- [`Sheet`](#sheet) (aka modal)
- [`TabBar`](#tabbar) => a simple butbeautiful tabbar with amazing animation
- [`Progressbar`](#progressbar) => a progressbar with beautiful animations
- [`Picker`](#picker) => an easy to implement and use item picker
- [`Loading`](#loading) => a component to show multiple loading animations
- [`Row` and `Col`](#grid) => grid system
- [`InputBasic`](#inputbasic) => a basic input component with some extra features
- [`InputFile`](#inputfile) => a file input with features like: built in cropper, built in selected file preview, built in multi file selection
- [`InputSelect`](#inputselect) => a select input with features like: built in multi selection
- [`InputDate`](#inputdate) => a beautiful date and time selector
- [`InputTextarea`](#inputtextarea)
- [`InputRange`](#inputrange)
- [`InputCheckbox`](#inputcheckbox)
- [`InputRadio`](#inputradio)
- [`InputToggle`](#inputtoggle) => a simple toggle selector
- [`Stepper`](#stepper) => stepper input for numbers


some built in features (functions) like:
- [`confirm`](#confirm) => get user confirmation on an action (like js confirm)
- [`notify`](#notify) => notification message



## installation
it's so simple to add gamon-react to your project 
```npm 
npm i gamon-react
```
that's IT, done. you can use all gamon-react components now.
Enjoy :)

## usage
inside your components 
```javascript
import { Button } from 'gamon-react'

function App() {
  return (
    <>
      <Button text="simple btn" />
    </>
  )
}

```


## Components


### Button
```javascript
import { Button } from 'gamon-react'

<Buttton text="simple button" />

<Buttton> simple button </Button>

 /**
  *  ====== PROPS ======
  * 
  * text: string => text to be shown inside button
  * 
  * type?: 'submit' | 'reset' | 'button' => default is button
  * 
  * width?: number|string => width of the button. 
  *   e.g.
  *     <Button text="btn" width="100px" />
  *     <Button text="btn" width={100} />
  *  
  * height?: number|string => height of the button
  *  e.g.
  *     <Button text="btn" height="50px" />
  *     <Button text="btn" height={50} />
  * 
  * size?: 'small' | 'medium' | 'large'
  * 
  * loading?: boolean => if true, a loading animation will be shown inside button
  * 
  * loadingEffect?: 'simple' | 'default' => effect of loading animation
  * 
  * loadingType?: refer to Loading component "type" prop
  * 
  * loadingCustomChild?: ReactNode => react node to show for loading
  * 
  * loadingClassPrefix?: string => a class prefix for loading animation 
  *    (to customize animation)
  * 
  * widthParent?: boolean => button will adjust to parent width (responsive)
  * 
  * rounded?: boolean => button will apear rounded
  * 
  * outline?: boolean => button will apear outlined
  * 
  * disabled?: boolean
  * 
  * textClass?: string => class of the text
  * 
  * textStyle?: { [index: string]: string } => css style of the text
  * 
  *  onClick ?: ()=>void,
  * 
  */
```



### Carousel
```javascript
import { Carousel } from 'gamon-react'
import { useState } from 'react'

const [indexOfVisibleSlide, setIndexOfVisibleSlide] = useState(0)

<Carousel model={[indexOfVisibleSlide, setIndexOfVisibleSlide]}>
  <img src="img1.jpg" />
  <img src="img2.jpg" />
  <img src="img3.jpg" />
</Carousel>

 /**
  *  ====== PROPS ======
  * 
  *   model?: [number, (value: number) => void] => index of visible slide
  * 
  *   itemsPerView?: number => how many items should be shown in each slide
  * 
  *   itemsPerSlide?: number => how many items should slide on slide
  * 
  *   eachItemMargin?: number => margin between items
  * 
  *   eachItemHeight?: number => height of each item
  * 
  *   auto?: boolean => if true, Carousel will slide automatically
  * 
  *   duration?: number => duration of auto slide in seconds
  * 
  *   stopAtEnd?: boolean => stop sliding at the last slide
  * 
  *   noIndicator?: boolean => slide indicators will not show
  *
  *   responsive?: {[index:number]:number} => responsive slides.
  *       e.g.
  *         <Carousel responsive={{1000:5, 600:4, 400:2}}>
            </Carousel>
  *     
  */
```



### Grid
```javascript
import { Row, Col } from 'gamon-react'

<Row>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 1 </Col>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 2 </Col>
  <Col width="xl-4 lg-6 md-8 sm-10 xs-12"> Col 3 </Col>
</Row>
 /**
  *   each Row can be divided into 12 sections
  *   xl-4 means the Col will take 4 sections in xl screen
  *   lg-6 means the Col will take 6 sections in lg screen
  *   md-8 means the Col will take 8 sections in md screen
  *   sm-10 means the Col will take 10 sections in sm screen
  *   xs-12 means the Col will take 12 sections in xs screen
  * 
  *  ====== PROPS ======
  *   width: string
  *  
  * 
  */
```


### InputBasic
```javascript
import { InputBasic } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputBasic value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputBasic model={ [inpValue, setInpValue] } />



/**
 *  ====== PROPS ======
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  readonly?: boolean => input will be readonly
 * 
 *  focus?: boolean => if true, input will be focused
 * 
 *  delay?: boolean | number => if number value (in ms) provided, model will be 
  *     updated according to that delay, if number is not provided, the 
  *     default delay will be 500 ms  
 * 
 *  type?: "text" | "number" | "tel" | "email" | "password"
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  passwordVisibilityToggler?: boolean => displays a password visibility toggler
 *    icon for password input
 *  
 */
```



### InputFile
```javascript
import { InputFile } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputFile value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputFile model={ [inpValue, setInpValue] } />


/**
 * ====== PROPS ======
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  accept?: string => the accept attribute of html file input 
 * 
 *  video?: boolean => input will only accept video files 
 * 
 *  audio?: boolean => input will only accept audio files 
 * 
 *  image?: boolean => input will only accept image files 
 * 
 *  preview?: boolean => input will show a preview of the selected file
 * 
 *   multi?: boolean => select multiple files
 * 
 *   maxSize?: number => max size of the selected file
 * 
 *   dragDrop?: boolean => input will select files by drag and drop
 * 
 *   cropper?: boolean => user can crop selected images
 * 
 *   previewSize?: {
         width ?:number|string,
         height ?:number|string,
         maxWidth ?:number|string,
         maxHeight ?:number|string,
     } => size of the preview
   
     e.g. 
   
      previewSize = {{
       width: 250,
       height: 250,
      }}
 * 
 *  
 */
```



### InputDate
```javascript
import { InputDate } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputDate value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputDate model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 *  
 * 
 *  format?: string => format of the input and output
 *    not: allowed seperators are "/" and "-"
 *    e.g.
 *    format="yyyy/mm/dd" or format="yyyy/mm"
 *    format="yyyy-mm-dd"
 * 
 * timepicker?: boolean => user can select time
 * 
 * timepickerHourType?: string => either 12 or 24
 * 
 * defaultToday?: boolean => if true, default value will be today
 * 
 */
```



### InputSelect
```javascript
import { InputSelect } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputSelect options={[ [1, 'one'], [2, 'two'] ]} value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputSelect options={[ [1, 'one'], [2, 'two'] ]} model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 *  options: (number|string)[][] => select options
 *    e.g.
 *    options={[ 
 *      ['option 1 value', 'option 1 text '],
 *      ['option 2 value', 'option 2 text '],
 *    ]}
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 *  
 *  multi?: boolean => user can select multiple options 
 *  
 *  displayType?: 'dropdown' | 'sheet-bottom' | 'sheet-center'
 */
```







### InputTextarea
```javascript
import { InputTextarea } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputTextarea value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputTextarea model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 *  title?: string => title of the input
 * 
 *  placeholder?: string => placeholder of the input
 * 
 *  icon?: string => address of an image to show as icon at the start of input
 * 
 *  readonly?: boolean => input will be readonly
 * 
 *  focus?: boolean => if true, input will be focused
 * 
 *  cols?: number => cols attribute of html textarea
 * 
 *  rows?: number => rows attribute of html textarea
 * 
 */
```



### InputCheckbox
```javascript
import { InputCheckbox } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputCheckbox title="simple checkbox" checkedValue="foo" value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputCheckbox title="simple checkbox" checkedValue="foo" model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 * title: string => title of the checkbox
 * 
 * checkedValue: string|number => value of the checkbox (provide this prop if "binary" is false)
 * 
 * name?: string => name of the checkbox html input
 * 
 * binary?: boolean => if true, if the checkbox is selected value will be 1 and if not selected value will be 0
 * 
 * checkmarkStyle?: { [index: string]: string } => css style of the checkmark
 * 
 * titleStyle?: { [index: string]: string } => css style of the checkbox title
 * 
 * checkmarkClass?: string => class of checkmark
 * 
 * titleClass?: string => class of checkbox title
 * 
 */
```



### InputToggle
```javascript
import { InputToggle } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputToggle defaultValue={[1, 'one']} activeValue={[2, 'two']} value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputToggle defaultValue={[1, 'one']} activeValue={[2, 'two']} model={ [inpValue, setInpValue] } />


/**
 * props:
 * 
 * defaultValue: [default value, text to display]
 * 
 * activeValue: [selected value, text to display]
 * 
 * rectangle?: boolean => input will be a rectangle
 * 
 * togglerStyle?: { [index: string]: string } => css style for toggler 
 * 
 * pointerStyle?: { [index: string]: string } => css style for toggler pointer 
 * 
 * activeValueStyle?: { [index: string]: string } => css style for active value text 
 * 
 * defaultValueStyle?: { [index: string]: string } => css style for default value text 
 * 
 * defaultValueClass?: string => class for default value text 
 * 
 * activeValueClass?: string => class for active value text 
 * 
 * pointerClass?: string => class for toggler pointer 
 * 
 * togglerClass?: string => class for toggler input 
 * 
 */
```






### InputRadio
```javascript
import { InputRadio } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputRadio title="simple checkbox" checkedValue="foo" value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputRadio title="simple checkbox" checkedValue="foo" model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 * title: string => title of the radio input
 * 
 * checkedValue: string|number => value of the radio input
 * 
 * name?: string => name of the radio input html input
 *  
 * checkmarkStyle?:  { [index: string]: string }  => css style of the checkmark
 * 
 * titleStyle?:  { [index: string]: string } => css style of the title
 * 
 * checkmarkClass?: string => class of checkmark
 * 
 * titleClass?: string => class of title
 * 
 */
```


### InputRange
```javascript
import { InputRange } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1 : using value and onChange
<InputRange value={inpValue} onChange={ (newValue)=> setInpValue(newValue) } />

// method 2 : using model. this way state will be updated automatically
<InputRange model={ [inpValue, setInpValue] } />

/**
 * props:
 * 
 * min?: number
 * 
 * max?: number
 * 
 * step?: number
 * 
 * double?: boolean
 * 
 * outputDisplay?: 'none' | 'up'
 * 
 */
```





### Loading
```javascript
import { Loading } from 'gamon-react'

<Loading type="wave" />

/**
 * props:
 * 
 *  type?: 'dual-ring' | 'bouncing-balls' | 'cradle' | 'wave'
 * 
 *  classPrefix?: string => class prefix for loading component to customize loading css style
 * 
 *  fullScreen?: boolean => loading will be full screen
 * 
 *  width?: string|number => width of the loading
 * 
 *  height?: string|number => height of the loading
 * 
 */
```
 



### Picker
```javascript
import { Picker } from 'gamon-react'
import { useState } from 'react'

const [inpValue, setInpValue] = useState()

// method 1
<Picker model={ [inpValue, setInpValue] } options={[1,2,3,4]} /> // you can use value and onChange like other inputs as well

// method 2
<Picker model={ [inpValue, setInpValue] }>
  <div> 1 </div>
  <div> 2 </div>
  <div> 3 </div>
</Picker>

// you can put any element inside the Picker, just remember that all element must be the same.

/**
 *  by default picker will update the model value (inpModel) with the index of
 *    the selected option. to get the value, you can use "getValue" prop
 * 
 * props:
 * 
 * options: (string|number)[] => options for picking
 *    e.g.
 *      <Picker options={[1,2,3,4]} />
 *     
 * 
 * stopAtEnd?: boolean => stop at the last option
 * 
 * horizontal?: boolean => if true, picker will be horizontal
 * 
 * noSelectedFrame?: boolean => if true, selected frame will not be shown
 * 
 * startCenter?: boolean => if true, default selected value will be the middle 
 * (center) value
 * 
 * arrow?: boolean => if true, directional arrows will be shown
 * 
 * optionSize?: number => height for vertical , width for horizontal
 *    e.g. <Picker options={[1,2,3,4]} optionSize={50} />
 *    -- each option will have 50px height
 * 
 * height?: number => height of the picker
 * 
 * getValue?: boolean => if true, modelValue will be updated with the selected
 *    value instead of selected index. this prop works even with method 2.
 * 
 * selectedFrameClass?: string => class of the selected frame
 * 
 * optionClass?: string => class applied to each option
 * 
 * selectedFrameStyle?: { [index: string]: string } => css style for selected frame
 * 
 * optionStyle?: { [index: string]: string } => css style for each option
 * 
 */
```







### Progressbar
```javascript
import { Progressbar } from 'gamon-react'

<Progressbar value={70} /> 

/**
 * props:
 * 
 * value: number => progress value in % e.g.(40)
 * 
 * text?: string => text to be shown beside the value
 * 
 * hideValue?: boolean => if true, value will not be shown
 * 
 * animation?: 'flash' | 'flow' 
 * 
 * progressColor?: string => color of the progress
 * 
 * flowParticleColor?: string => color of the flow animation particles
 * 
 * flasherColor?: string => color of the flash animation band
 * 
 * bgColor?: string => progressbar background color
 * 
 * textColor?: string => color of the text
 * 
 * textFontSize?: string => font size of text
 * 
 * progressStyle?: { [index: string]: string } => css style of progress
 * 
 * textStyle?: { [index: string]: string } => css style of text
 * 
 * flowParticleStyle?: { [index: string]: string } => css style of flow animation particles
 * 
 * flasherStyle?: { [index: string]: string } => css style of flasher animation band
 * 
 * progressClass?: string => class of progress
 * 
 * textClass?: string => class of text
 * 
 * flowParticleClass?: string => class of flow animation particles
 * 
 * flasherClass?: string => class of flasher animation band
 * 
 * 
 */
```


### Sheet
```javascript
import { Sheet } from 'gamon-react'
import { useState } from 'react'

// method 1: toggle the sheet using id
<h2  gamon-sheet-toggle="aUniqueId"> toggle sheet </h2>

<Sheet id="aUniqueId" title="a simple sheet" >
  <div>this is a simple sheet</div>
</Sheet>


// method 2: toggle the sheet using "displayModel" propery
// setting "sheetDisplay" to true will display the sheet
const [sheetDisplay, setSheetDisplay] = useState(false)

<Sheet title="a simple sheet" displayModel={[sheetDisplay, setSheetDisplay]} >
  <div>this is a simple sheet</div>
</Sheet>


/**
 * props:
 * 
 * id: string => unique ID of the sheet
 * 
 * type?: 'center' | 'bottom' | 'top' | 'left' | 'right' 
 * 
 * title?: string => title of the sheet(will be shown in sheet header)
 * 
 * width?: string|number => width of the sheet (responsive)
 * 
 * height?: string|number => height of the sheet
 * 
 * minHeight?: string|number => min height of the sheet
 * 
 * animation?: ToggleAnimation => e.g. animation="scale"
 * 
 * displayModel?: boolean => with this prop, you can manually toggle the visibility of the sheet 
 * 
 * onDismiss?: function => callback function on sheet dismiss
 * 
 * onDisplay?: function => callback function on sheet display
 * 
 * onBackdropClick?: function => callback function on backdrop click
 * 
 * dismissDisabled?: boolean => sheet will not have a backdrop
 * 
 * bodyStyle?: { [index: string]: string } => css style of the sheet body
 * 
 * backdropStyle?: { [index: string]: string } => css style of the sheet backdrop
 * 
 * 
 */
```



### TabBar
```javascript
import { TabBar } from 'gamon-react'
import { useState } from 'react'
const [selectedTab, setSelectedTab] = useState(0)

// method 1 : selectedTab would be the index of the selected tab
<TabBar model={[selectedTab, setSelectedTab]} tabs={[ 'tab 1', 'tab 2', 'tab 3'  ]} />

// method 2 : selectedTab would be the value of the selected tab
<TabBar model={[selectedTab, setSelectedTab]} tabs={[  ['value 1', 'tab 1'], ['value 2','tab 2'] ]} />


/**
 * props:
 * 
 *  tabs: string[] | (string|number)[][]
 * 
 *  position?: 'default' | 'fixed-bottom' | 'fixed-top'
 * 
 *  indicatorType?: 'none' | 'box' | 'line-top' | 'line-bottom'
 * 
 *  width?: string|number
 * 
 *  responsiveWidth?: string => same as Col width 
 *    e.g. responsiveWidth="lg-5 md-8"
 *  
 *  bgColor?: string => background color of tabbar
 * 
 *  tabStyle?: string | { [index: string]: string } => css style of each tab
 * 
 *  tabClass?: string => class of each tab
 * 
 *  tabColor?: string => color of each tab
 * 
 *  indicatorStyle?: string | { [index: string]: string } => css style of active tab indicator
 * 
 *  indicatorClass?: string => class of of active tab indicator
 * 
 *  indicatorColor?: string => color of active tab indicator
 * 
 *  activeTabStyle?: string | { [index: string]: string } => css style of active tab
 * 
 *  activeTabClass?: string => class of active tab
 * 
 *  activeTabColor?: string => color of active tab
 * 
 */
```







### Stepper
```javascript
import { Stepper } from 'gamon-react'
import { useState } from 'react'
const [stepperValue, setStepperValue] = useState(0)

<Stepper model={[stepperValue, setStepperValue]}  />


/**
 * props:
 * 
 *  min?: number => min stepper value
 * 
 *  max?: number => max stepper value
 * 
 *  editable?: boolean => stepper is manually editable
 * 
 *  vertical?: boolean => stepper is vertical
 * 
 *  chevron?: boolean => display chevron icon instead of plus and minus
 *  
 *  width?: string|number => width of the stepper
 * 
 *  height?: string|number => height of the stepper
 * 
 *  incStyle?: string | { [index: string]: string } => css style of increase btn
 * 
 *  decStyle?: string | { [index: string]: string } => css style of decrease btn
 * 
 *  numberStyle?: string | { [index: string]: string } => css style of number
 *  
 *  incClass?: string => class of increase btn
 * 
 *  decClass?: string => class of decrease btn
 * 
 *  numberClass?: string => class of number
 * 
 */
```









## Methods
gamon-react has some amazing built in methods to help developers



### confirm
to use confirm method, you just need to two two easy things:

1. import and place `Confirm` component inside your project layout (any where that is included in all of your pages and components)

```javascript
import {Confirm} from 'gamon-react'

<Confirm /> // place this inside a layout that is inclided inside all your components

/**
 * props: 
 * 
 *  confirmButtonText ?: string, // e.g. confirmButtonText: 'I agree'
 * 
 *  cancelButtonText ?: string, // e.g. cancelButtonText: 'No'
 *  
 *  animation ?: ToggleAnimations, // e.g. animation: 'scale'
 * 
 *  type ?: SheetTypes, //  e.g. type: 'bottom' (refer to Sheet "type" prop)
 * 
 */
```
   
2. import `Gamon` and use it however you need

```javascript
  import {Gamon} from 'gamon-react'

  const deleteItem = ()=>{
    Gamon.confirm(
      'confirmation title', 
      'confirmation text',
      ()=>{
        console.log('user confirmed')
      }
    )
  }


  <Button text="Delete" onClick={deleteItem} />



/**
 *  Gamon.confirm(title, text, confirmCallback, cancelCallback?, animation?, confirmButtonText?, cancelButtonText?)
 * 
 *  title: string => title of the confirmation 
 * 
 *  text: string => text of the confirmation 
 * 
 *  confirmCallback: function => confirmed callback 
 * 
 *  cancelCallback?: function => not confirmed callback 
 * 
 *  animation?: ToggleAnimation => e.g. animation="scale"
 * 
 *  type?: string => type of confirmation sheet (refer to Sheet component "type" prop)
 *  
 *  confirmButtonText?: string
 * 
 *  cancelButtonText?: string
 * 
 */
```



### notify
to use notify, you just need to do two easy steps:
1. import and place `Notify` component inside your project layout (any where that is included in all of your pages and components) 

```javascript
import {Notify} from 'gamon-react'

<Notify />

/**
 *    props:
 * 
 *    position?:'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'center' 
 * 
 *    animation?: ToggleAnimations,  // e.g. animation: 'scale'
 * 
 *    duration?:number, // e.g. duration : 4000
 * 
 */
```

2. import `Gamon` and use notify

```javascript
  import {Gamon} from 'gamon-react'

  const showNotif = ()=>{
    Gamon.notify('this is a simple notififcation')
  }



  <Button text="Show notif" onClick={showNotif} />


/**
 *  Gamon.notify(text, type, duration, animation)
 * 
 *  text: string => notification text
 * 
 *  type: 'success' | 'error' | ''
 * 
 *  duration?: number => notification display diration in ms e.g. (3000) which is 3s
 * 
 *  animation?: ToggleAnimation => e.g. animation="scale"
 * 
 */
```



## ToggleAnimation
```javascript
type ToggleAnimations = 'slide-up'|'slide-down'|'slide-left'|'slide-right'|'fade'|'scale'|'rotate'
```
