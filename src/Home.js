import { Link } from "react-router-dom";
import React from "react";

const restaurants = [
  {
    id: 1,
    name: "Delicious Italian",
    cuisine: "Italian",
    location: "123 Main St",
    image:
      "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 2,
    name: "Spicy Sizzlers",
    cuisine: "Mexican",
    location: "456 Elm St",
    image:
      "https://images.unsplash.com/photo-1620296595801-3cd364a12807?auto=format&fit=crop&q=80&w=2123&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 3,
    name: "Taste of India",
    cuisine: "Indian",
    location: "789 Oak St",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 4,
    name: "Sushi Sensation",
    cuisine: "Japanese",
    location: "101 Pine St",
    image:
      "https://images.unsplash.com/photo-1541401154946-62f8d84bd284?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 5,
    name: "Delicious Italian",
    cuisine: "Italian",
    location: "123 Main St",
    image:
      "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 6,
    name: "Spicy Sizzlers",
    cuisine: "Mexican",
    location: "456 Elm St",
    image:
      "https://images.unsplash.com/photo-1620296595801-3cd364a12807?auto=format&fit=crop&q=80&w=2123&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 7,
    name: "Taste of India",
    cuisine: "Indian",
    location: "789 Oak St",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 8,
    name: "Sushi Sensation",
    cuisine: "Japanese",
    location: "101 Pine St",
    image:
      "https://images.unsplash.com/photo-1541401154946-62f8d84bd284?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  },
  {
    id: 9,
    name: "Delicious Italian",
    cuisine: "Italian",
    location: "123 Main St",
    image:
      "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image path
  }
];

const RestaurantCard = ({ name, cuisine, location, image }) => (
  <div className="bg-white p-4 rounded shadow-md m-2">
    <img src={image} alt={name} className="w-full h-40 object-cover mb-2 rounded" />
    <h2 className="text-lg font-bold">{name}</h2>
    <p className="text-gray-600">{cuisine}</p>
    <p className="text-gray-600">{location}</p>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-1 justify-center bg-blue-500 w-full shadow-md">
        <div className="text-white p-8 md:p-12 rounded-lg w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Explore the Tastes</h1>
          <p className="text-gray-200 text-sm md:text-base mb-4">
            Find the best restaurants near you.
          </p>

          <div className="mb-4 flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full p-3 border border-gray-300 text-gray-600 text-sm mb-2 md:mb-0"
            />
            <button className="w-[237px] bg-yellow-500 text-white pl-0 hover:bg-yellow-600 text-lg">
              Find Restaurants
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 divide-y space-y-5">
        <div className="font-semibold text-2xl">Popular</div>
        <div className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {restaurants.map((restaurant) => (
              <Link to={`/restaurant`} key={restaurant.id}>
                <RestaurantCard
                  name={restaurant.name}
                  cuisine={restaurant.cuisine}
                  location={restaurant.location}
                  image={restaurant.image}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
