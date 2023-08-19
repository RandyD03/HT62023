import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  //Data from backend
  const [data, setData] = useState([])


  useEffect(() => {
    getDatas()
  }, [])

  function getDatas() {
    axios.get('http://127.0.0.1:5000/listusers').then(function (response) {
      console.log(response.data)
      setData(response.data)
    })
  }

  const [inputs, setInputs] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(inputs)

    await axios.post('http://127.0.0.1:5000/useradd', inputs).then(function (response) {
      console.log(response.data)
      setData(response.data);
    })
  }

  return (
    <div>
      {data}

      <form onSubmit={handleSubmit}>
        <div>Submit photo here</div>
        <input onChange={handleChange} />
        <button type="submit">Add</button>
      </form>

    </div>
  )
}

export default App