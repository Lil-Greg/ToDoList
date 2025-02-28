import { Container } from 'react-bootstrap';
import './Homepage.css';
import getUsers from '../backend/getUsers';
import { Audio } from 'react-loader-spinner';
import { UserTypes } from '../libraries/types';

export default function Homepage() {

  const { data, isLoading, isError, error } = getUsers();
  const user: UserTypes = data;
  if (isLoading) {
    <Audio
      height="80"
      width="80"
      color="green"
      ariaLabel="loading"
    />
  }
  if (isError || data == undefined) {
    <>{error}</>
  }
  return (
    <>
      <Container className='h-container'>
        <h1>To Do List</h1>
        Users Are: {data?.map((user: string[]) => { user.username })}
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