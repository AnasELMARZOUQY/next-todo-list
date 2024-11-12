import {useEffect , useState  } from 'react';

const TodoForm = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data.map((country) => country.name.common)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.length > 120) {
      alert('Description must be less than 120 characters');
      return;
    }
    addTask({ description, user, country });
    setDescription('');
    setUser('');
    setCountry('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium">User</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;