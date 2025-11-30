export default function Buttons({name, onClick}) {
    return (
        <>
        <button onClick= {onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-3">
          {name}
        </button>
        </> 
    );
}