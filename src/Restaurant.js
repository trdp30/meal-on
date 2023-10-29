import React from "react";

const menuItems = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&q=80&w=2788&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: "$10.99",
    image:
      "https://images.unsplash.com/photo-1479832912902-77089f02b1d2?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Chicken Tacos",
    price: "$8.99",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
  // Add more menu items as needed
];

const MenuItem = ({ name, price, image }) => (
  <div className="bg-white p-4 rounded shadow-md m-2">
    <img src={image} alt={name} className="w-full h-40 object-cover mb-2 rounded" />
    <h2 className="text-lg font-bold">{name}</h2>
    <p className="text-gray-600">{price}</p>
  </div>
);

const MenuList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {menuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          name={menuItem.name}
          price={menuItem.price}
          image={menuItem.image}
        />
      ))}
    </div>
  );
};

export default MenuList;
