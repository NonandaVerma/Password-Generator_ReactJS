import { useCallback, useEffect, useRef, useState } from 'react'

import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword]=useState("")
  const [ numbers, setNumbers] = useState(false)
  const [ characters, setCharacters]= useState(false)

  // creating a Password reference to connect the password input to the copy button

  const passRef = useRef(null)

  const generatePass =useCallback( ()=>{
    let pass =""
    let string ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numbers) string += "1234567890"
    if(characters) string +="!@#$%^&*()_{}:?"

    for( let i = 1; i <= length ; i++)
    {
      // for generating the character, it will return index numbers and not character so
      let char = Math.floor(Math.random() * string.length + 1)

      // generating character
      pass += string.charAt(char)
      
    }

   setPassword(pass)

  },[numbers, characters, length, setPassword])

  useEffect(()=>{
    generatePass()
  },[numbers, characters, length, generatePass])

  // Copying Password to clipboard
  const copyToClipboard=()=>{
    
    // Selecting the input text to show that password copied successfully
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }



  return (
    <>
      <h1 className='text-[80px] text-center m-5 font-bold text-indigo-800'> Password Generator</h1>

      <div className='w-[800px] m-auto rounded-lg bg-amber-600 my-3 p-5'>

        <div className='m-3 grid grid-cols-[70%_20%] gap-5'>
            <input type='text' value={password} placeholder='Generated password' className='bg-white p-3 rounded-md' readOnly ref={passRef}/>
            <button type='button' className='bg-indigo-800 text-white text-center p-3 rounded-md' onClick={copyToClipboard}> Copy</button>
        </div>

        <div className='m-3 flex'>
            <div className='flex'>
               <input type='range' min={8} max={30} value={length} onChange={(e)=>{ setLength(e.target.value)}}/>
               <label className='text-white p-3'>Length: {length}</label>
            </div>
            <div className='flex mx-8'>
               <input type='checkbox' defaultChecked={numbers} onChange={()=>{setNumbers((prev)=> !prev)}}/>
               <label className='text-white p-3'> Numbers</label>
            </div>
            <div className='flex mx-8'>
               <input type='checkbox' defaultChecked={characters} onChange={()=>{setCharacters((prev)=> !prev)}}/>
               <label className='text-white p-3'>Special Characters</label>
            </div>
        </div>
          
      </div>
    </>
  )
}

export default App
