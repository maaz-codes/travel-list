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
    <div>
      <ul className="list">
        {
          sortedItems.map(item => (
            <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onCheckedItem={onCheckedItem} />
          ))
        }
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed</option>
        </select>
        <button>clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheckedItem }) {
  return (
    <li>
      <input type="checkbox" value={item.id} onChange={() => onCheckedItem(item.id)}/>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}


function Stats({ items }) {

  const numItems = items.length;
  const packedItems = items.filter(item => item.packed === true).length;
  const packedPercent = Math.floor((packedItems / numItems)*100);

  return (
    <footer className='stats'>
    {
      packedPercent === 100 ? (
        <em>You got everything. Ready to go! ✈ ).</em>
      ) : (
        numItems === 0 ? (
          <em>Add items to the list for packing.</em>
        ) : (
          <em>You have {numItems} items on your list, and you already packed {packedItems} ({packedPercent? packedPercent : 0}%).</em>
        )
      )
    }
      
    </footer>
  )
}



export default App;
