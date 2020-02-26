import React from 'react'
import { Label, Input } from 'semantic-ui-react'

const Filter = ({ label, placeholder, handleChange, value }) => (
    <td>
    <Label>{label}</Label>
    <Input fluid onChange={handleChange} value={value} placeholder={placeholder} />
    </td>
)

export default Filter