import React from 'react';
import Alert from './components/Alert';
import List from './components/List';

const getStoredContent = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list')) || [];
  }
}

function App() {
  const [name, setName] = React.useState('');
  const [list, setList] = React.useState(getStoredContent());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState(null);
  const [alert, setAlert] = React.useState({
    show: false,
    msg: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // Display alert msg
      showAlert(true, 'please enter value', 'text-red-800');
    }
    else if(name && isEditing) {
      // Handle Editing
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {...item, title: name}
          }
          return item;
        })
      )
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'item updated', 'text-green-600')
    }
    else {
      // Show alert
      showAlert(true, 'an item was added', 'text-green-800');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      }
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    showAlert(true, 'an item was removed', 'text-red-600');
    let newLists = list.filter((item) => item.id !== id);
    setList(newLists);
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  const clearItems = () => {
    showAlert(true, 'empty list', 'text-red-600');
    setList([]);
  }

  React.useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className="bg-white w-2/5 h-auto mx-auto mt-[10rem] py-8 rounded-md">
      <form onSubmit={handleSubmit} className="mx-8">
        { alert.show && <Alert {...alert} removeAlert={showAlert} list={list} /> }
        <h2 className="capitalize text-3xl text-center font-bold py-4">grocery list</h2>
        <div>
          <input
            type="text" 
            className="bg-gray-100 w-5/6 py-1 rounded-l-lg outline-none pl-4"
            value={name}
            placeholder="e.g egg"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-r-lg bg-blue-300 px-3 py-1 capitalize hover:bg-blue-400 hover:text-white outline-none"
          >
            submit
          </button>
        </div>
      </form>
      {
        list.length > 0 && (
          <div className="mx-8">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button
              className="block mx-auto text-red-500 capitalize"
              onClick={clearItems}
            >
              clear items
            </button>
          </div>
        )
      }
    </div>
  );
}

export default App;
