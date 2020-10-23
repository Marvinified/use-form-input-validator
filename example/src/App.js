import React from 'react'
import useFormValidator from 'use-form-input-validator'
import 'use-form-input-validator/dist/index.css'

const App = () => {
  const { fields, updateField } = useFormValidator({
    email: {
      value: '',
      error: '',
      checks: 'required|email',
      validate: (e) => {}
    }
  })

  return (
    <div>
      <label htmlFor='email'>Email: </label>
      <input name='email' onChange={updateField} />
      <br />
      <small style={{ color: 'red' }}>{fields.email.error}</small>
    </div>
  )
}

export default App
