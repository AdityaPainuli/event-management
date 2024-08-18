import { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router';
import { extractNameFromEmail } from '../utils/extract_email';


interface Performance {
  id: number;
  title: string;
  description: string;
  googleFormUrl: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  performances: Performance[];
}



function Home(){
  const [events, setEvents] = useState<Event[]>([]);
  const {user , loading} = useUser();
  const router = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);


  
    const handleLogout = () => {
      localStorage.removeItem('token');
  
      router('/login');
    };
  
  
  if(user === null && loading) return <div className='flex justify-center items-center h-screen'>
    <h1 className='text-xl font-semibold'>Loading...</h1>
  </div>


  if(user === null && !loading) router('/login')
  

  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-between items-center'>
      <h1 className="text-3xl font-bold mb-6">Event Management</h1>
      <div className='flex items-center space-x-2'>
        <h3 className='text-xl '>welcome , {user?.email !== undefined && extractNameFromEmail(String(user?.email || "")) || ""}</h3>
        <button className='bg-gray-700 rounded-md p-2 text-white px-6' onClick={handleLogout}>Logout</button>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-4">
              {event.performances.map(performance => (
                <div key={performance.id} className="mb-2">
                  <h3 className="font-semibold">{performance.title}</h3>
                  <p className="text-gray-700">{performance.description}</p>
                  <a href={performance.googleFormUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                    Fill Form
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
        <a className="mt-8 inline-block bg-blue-500 text-white py-2 px-4 rounded" href='/events/create'>Create Event</a>
    </div>
  );
}

export default Home;