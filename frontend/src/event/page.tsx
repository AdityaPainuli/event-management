import { useState } from 'react';
import { useNavigate } from 'react-router';


 function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [performances, setPerformances] = useState([{ title: '', description: '', googleFormUrl: '' }]);

  const router = useNavigate();

  const addPerformance = () => {
    setPerformances([...performances, { title: '', description: '', googleFormUrl: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, date, performances }),
    });

    if (response.ok) {
      router('/');
    } else {
      alert('Failed to create event');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Event Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Event Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Event Date</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Performances</h3>
          {performances.map((performance, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700">Performance Title</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={performance.title}
                onChange={(e) => {
                  const newPerformances = [...performances];
                  newPerformances[index].title = e.target.value;
                  setPerformances(newPerformances);
                }}
              />
              <label className="block text-gray-700 mt-2">Performance Description</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                value={performance.description}
                onChange={(e) => {
                  const newPerformances = [...performances];
                  newPerformances[index].description = e.target.value;
                  setPerformances(newPerformances);
                }}
              ></textarea>
              <label className="block text-gray-700 mt-2">Google Form URL</label>
              <input
                type="url"
                className="w-full border px-3 py-2 rounded"
                value={performance.googleFormUrl}
                onChange={(e) => {
                  const newPerformances = [...performances];
                  newPerformances[index].googleFormUrl = e.target.value;
                  setPerformances(newPerformances);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addPerformance}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Another Performance
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
export default CreateEvent;
