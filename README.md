# use-form-input-validator

> React hooks library to validate your form inputs with ease.

[![NPM](https://img.shields.io/npm/v/use-form-input-validator.svg)](https://www.npmjs.com/package/use-form-input-validator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-form-input-validator
```

## Simple Usage

```jsx
import React from 'react'
import useFormValidator from 'use-form-input-validator'
import 'use-form-input-validator/dist/index.css'

const App = () => {
  const { fields, updateField } = useFormValidator({
    email: {
      value: '', // defuallt changes
      error: '',
      checks: 'required|email', // checks to run on the field on change
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
```

## License

MIT © [Marvinified](https://github.com/Marvinified)
