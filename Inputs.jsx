export default function Inputs({name, email, setName, setEmail}) {
    return (
        <>
        <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            className="border rounded-lg m-1 px-2 py-1 w-full"
        />

        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            className="border rounded-lg m-1 px-2 py-1 w-full"
        />
        </>
    );
}