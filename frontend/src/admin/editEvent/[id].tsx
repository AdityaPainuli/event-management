"use client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Performance {
  id: number;
  title: string;
  description: string;
  googleFormUrl: string;
}

interface Event {
  title: string;
  description: string;
  date: string;
  performances: Performance[];
}

const EditEvent: React.FC = () => {
  const router = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<Event>({
    title: "",
    description: "",
    date: "",
    performances: [],
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/events/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event", error);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(event),
      });
      router("/admin");
    } catch (error) {
      console.error("Error updating event", error);
    }
  };

  const handlePerformanceChange = (
    index: number,
    key: keyof Performance,
    value: string
  ) => {
    const updatedPerformances = [...event.performances];
    updatedPerformances[index] = { ...updatedPerformances[index], [key]: value };
    setEvent({ ...event, performances: updatedPerformances });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Edit Event</h1>
      <form onSubmit={handleUpdate} className="mt-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700">Performances</h2>
          {event.performances.map((performance, index) => (
            <div key={performance.id} className="mb-4">
              <h3 className="text-md font-semibold text-gray-600">
                Performance {index + 1}
              </h3>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={performance.title}
                  onChange={(e) =>
                    handlePerformanceChange(index, "title", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={performance.description}
                  onChange={(e) =>
                    handlePerformanceChange(index, "description", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Google Form URL
                </label>
                <input
                  type="url"
                  value={performance.googleFormUrl}
                  onChange={(e) =>
                    handlePerformanceChange(
                      index,
                      "googleFormUrl",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
