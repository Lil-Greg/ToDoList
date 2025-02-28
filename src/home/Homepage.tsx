import { Container } from 'react-bootstrap';
import './Homepage.css';
import getUsers from '../backend/getUsers';
import { Audio } from 'react-loader-spinner';
import { User } from '../libraries/types';

export default function Homepage() {

  const { data, isLoading, isError, error } = getUsers();
  if (isLoading) {
    <Audio
      height="80"
      width="80"
      color="green"
      ariaLabel="loading"
    />
  }
  if (isError || data == undefined) {
    return <>
      <h1>Error Name: {error?.name}</h1>
      <h2>Error Message: {error?.message}</h2>
    </>

  }
  const users: User[] = data;
  return (
    <>
      <Container className='h-container'>
        <h1>To Do List</h1>
        Users Are: {users.map((userData: User, index) => (
          <p key={index}>{userData.username}</p>
        ))}
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