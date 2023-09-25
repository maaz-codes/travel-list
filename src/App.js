import React, { useState } from "react";

function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <h1>🌴 Far Away 💼</h1>
  )
}

let initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: true }
];

function Form() {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    //empty input field
    if (!description) return;
    // console.log(newItem);

    const newItem = {
      id: Math.floor(Math.random()*1000), 
      description: description, 
      quantity: quantity, 
      packed: false 
    }

    //resetting values of input fields. 
    setDescription("");
    setQuantity(0);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your Trip?</h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {
          Array.from({ length: 20}, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
        }
      </select>
      <input 
        type="text" 
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}


function PackingList() {

  return (
    <div>
      <ul className="list">
        {
          initialItems.map(item => (
            <Item item={item} key={item.id}/>
          ))
        }
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}


function Stats() {
  return (
    <footer className='stats'>
      <em>You have x items on your list, and you already packed X (X%). </em>
    </footer>
  )
}



export default App;
