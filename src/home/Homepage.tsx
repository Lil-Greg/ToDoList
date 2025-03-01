import { Container } from 'react-bootstrap';
import './Homepage.css';
import useGetUsers from '../backend/getUsers';
import { User } from '../libraries/types';
import { ErrorPage, LoadingPage } from '../state handling/StateHandling';

export default function Homepage() {

  const { data, isLoading, isError, error } = useGetUsers();
  if (isLoading) {
    return <LoadingPage />
  }
  if (isError || data == undefined) {
    if (error == null) {
      return;
    }
    const newError = error;
    return <ErrorPage error={newError} />
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