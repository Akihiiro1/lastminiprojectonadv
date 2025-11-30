"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Inputs from './Inputs';
import Buttons from './Buttons';
import UserList from './List';

const API_URL = "http://localhost:3001/users";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userList, setUserList] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUserList(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
        if (name.trim() === '') {
            alert("Please enter a name.");
            return;
        }

        const newUser = { name: name, email: email };

        try {
            await axios.post(API_URL, newUser);
            fetchUsers(); 
            setName('');
            setEmail('');
        } catch (error) {
            alert("Failed to save.");
            console.error(error);
        }
    };

  const handleDelete = async (index: number) => {
        const idToDelete = userList[index].id;
        try {
            await axios.delete(`${API_URL}/${idToDelete}`);
            setUserList(prevList => prevList.filter((_, i) => i !== index));
        } catch (error) {
            alert("Failed to delete.");
        }
    };

    const handleEdit = async (index: number) => {
        const currentUser = userList[index];
        const idToEdit = currentUser.id; 
        
        const newName = prompt("Edit Name:", currentUser.name);
        const newEmail = prompt("Edit Email:", currentUser.email);

        if (newName !== null && newEmail !== null) {
            const updatedUser = { name: newName, email: newEmail };
            try {
                await axios.put(`${API_URL}/${idToEdit}`, updatedUser);
                fetchUsers();
            } catch (error) {
                alert("Failed to update.");
            }
        }
    }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-3xl">
        {/* User Form */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm border-2 border-blue-400 flex flex-col items-center">
          <Header title="Welcome to my Mini Project" />
          <Inputs name={name} email={email} setName={setName} setEmail={setEmail} />
          <Buttons name="Submit" onClick={handleSubmit} />
        </div>
        {/* Submitted Users */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm border-2 border-blue-400">
          <h3 className="text-xl font-semibold mb-4 text-blue-400 drop-shadow-neon">Submitted Account</h3>
          <UserList users={userList} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
      <style jsx global>{`
        .drop-shadow-neon {
          text-shadow: 0 0 8px #38bdf8, 0 0 16px #38bdf8;
        }
        .bg-gray-900 {
          background-color: #1a202c;
        }
        .border-blue-400 {
          border-color: #38bdf8;
        }
      `}</style>
    </main>
  );
}