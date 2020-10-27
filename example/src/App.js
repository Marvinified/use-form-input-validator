import React from 'react'
import useFormValidator from 'use-form-input-validator'

const App = () => {
  const { values, errors, updateField, isAllFieldsValid } = useFormValidator({
    username: {
      value: '', // defuallt changes
      checks: 'required|min:5', // checks to run on the field on change
      validate: (value) => {
        if (value.includes('kepler')) {
          return 'The word "kepler" cannot be included in your username'
        }
      }
    },
    email: {
      value: '', // defuallt changes
      checks: 'required|email', // checks to run on the field on change
      validate: (value) => {
        if (value.includes('kepler')) {
          return 'The word "kepler" cannot be included in your username'
        }
      }
    }
  })

  const handleSubmit = (e) => {
    // verify if all fields are valid before submitting
    if (isAllFieldsValid()) {
      // get values easily
      const { username } = values
      console.log(username)
    }
  }
  return (
    <div>
      <label htmlFor='username'>Username: </label>
      <input name='username' onChange={updateField} />
      <br />
      <small style={{ color: 'red' }}>{errors.username}</small>
      <br />
      <label htmlFor='email'>Email: </label>
      <input name='email' onChange={updateField} />
      <br />
      <small style={{ color: 'red' }}>{errors.email}</small>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
