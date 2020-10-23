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
      <label></label>
      <input
        name='email'
        onChange={(e) => {
          updateField({
            key: e.target.name,
            value: e.target.value
          })
        }}
      />
      <small style={{ color: 'red' }}>{fields.email.error}</small>
    </div>
  )
}

export default App
