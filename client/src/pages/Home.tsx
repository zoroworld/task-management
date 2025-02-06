import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to Task Management</h1>
        <p className="text-lg text-gray-600 mb-8">Stay organized and boost productivity. Get started now!</p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
            Login
          </Link>
          <Link to="/signup" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
