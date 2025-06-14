
import {createSignal, type Component, type JSX} from 'solid-js'

interface Props {
  initValue : number
  children : JSX.Element }



export const Counter:Component<Props> = ( props ) => {
  const [counter , setCounter ] = createSignal(props.initValue)

  return(
    <>
      <h1 class='text-3xl text-zinc-100'> Counter </h1>
      <h3 class='text-3xl text-zinc-100' > Value : {counter()} </h3>
      {props.children }

      <button class='text-4xl bg-sky-600 rounded-md px-4 py-2 text-zinc-100 mx-2' onClick={() => setCounter(prev => ++prev) }>  + </button>
      <button class='text-4xl bg-sky-600 rounded-md px-4 py-2 text-zinc-100 mx-2' onClick={() => setCounter(prev => --prev)}>  - </button>
    </>
  )
}