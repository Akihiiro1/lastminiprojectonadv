export default function UserList({users, onDelete, onEdit}) {
    if (!users || users.length === 0) {
        return null;
    }

    return (
        <ul className="list-disc list-inside space-y-1 w-full">
            {users.map((user, index) => (
                <li key={index} className="mb-2 flex justify-between items-center bg-gray-800 p-2 rounded">
                    
                    <div className="text-white flex flex-col">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-gray-400 text-xs">{user.email}</span>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={() => onEdit(index)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded">Edit</button>
                        <button 
                            onClick={() => onDelete(index)}
                            className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Del</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}