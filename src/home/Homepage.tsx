import { Container } from 'react-bootstrap'
import './Homepage.css'

export default function Homepage() {

  return (
    <>
      <Container className='h-container'>
        <h1>To Do List</h1>
        <ol>
          <li>Shower</li>
          <li>Code</li>
          <li>Eat</li>
          <li>Repeat</li>
        </ol>
      </Container>
    </>
  )
}