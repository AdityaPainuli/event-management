import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser'
import { useNavigate } from 'react-router';


interface EventTypes {
    id:number,
    title:string,
    description:string
}

const AdminDashboard = () => {
  const user = useUser();
  const [events, setEvents] = useState<EventTypes[]>([]);
  const router = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events', {
            method:"GET",
            headers : {
                'content-type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,

            }
        })
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
    console.log(events);
  }, []);

  const handleEditEvent = (id: number) => {
    router(`/admin/editEvent/${id}`);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "DELETE",
        headers : {
            'content-type':'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      setEvents(events.filter((event:any) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  if (user === null) return <div className='flex justify-center items-center h-screen'>
  <h1 className='text-xl font-semibold'>Loading...</h1>
</div>

  console.log(user.user)
  if(!user.loading &&  !user.user?.isAdmin) router('/');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-8">
        {events?.map((event) => (
          <div key={event.id} className="border p-4 mb-4">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <div className="flex space-x-4">
              <button onClick={() => handleEditEvent(event.id)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
