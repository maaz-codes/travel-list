import React, { useState } from "react";

function App() {

  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(id) {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  function handleCheckedItem(id) {
    setItems(prevItems => 
      prevItems.map(item =>
        item.id === id ? { ...item, packed: !item.packed }
        : item));
  }

  return (
    <div>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onCheckedItem={handleCheckedItem} />
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return (
    <h1>🌴 Far Away 💼</h1>
  )
}


function Form({ onAddItem }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    //to stop reloading page [default behaviour of form]
    e.preventDefault();

    //empty input field
    if (!description) return;

    const newItem = {
      id: Math.floor(Math.random()*1000), 
      description: description, 
      quantity: quantity, 
      packed: false 
    }

    onAddItem(newItem);

    //resetting values of input fields. 
    setDescription("");
    setQuantity(1);
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


function PackingList({ items, onDeleteItem, onCheckedItem }) {

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if(sortBy === "input") sortedItems = items;
  if(sortBy === "description") sortedItems = items.slice()
    .sort((a, b) => a.description.localeCompare(b.description));
  if(sortBy === "packed") sortedItems = items.slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
