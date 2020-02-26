import React from 'react'
import { Container } from 'semantic-ui-react'

const Block = ({ txt, value }) => (
  <td>
    <Container fluid style={{padding: '100px', border: 'solid'}}>
    <p className = 'blockf'>
        {value}
        </p>
        <p>
        {txt}
    </p>
    </Container>
  </td>
)

export default Block