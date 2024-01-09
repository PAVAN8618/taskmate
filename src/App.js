import { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import ShowTask from './components/ShowTask';
import Header from './components/Header';


function App() {
  const [tasklist, setTasklist] = useState(JSON.parse(localStorage.getItem('tasklist')) || []);
  const [todo, setTodo] = useState('');
  const [editid, setEditid] = useState(0);
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || "medium");

  useEffect(()=>{
    localStorage.setItem("tasklist", JSON.stringify(tasklist))
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const handleDelete = (id)=>{

    setTasklist(tasklist.filter(todo=>todo.id !==id))
  }

  const handleSubmit =(e)=>{
    e.preventDefault();

    if(editid){
      const date = new Date();
      const selectedTask = tasklist.find(task => task.id === editid);
      const updateTask = tasklist.map((e) => (e.id === selectedTask.id ? (e = {id: e.id, name: todo, time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`}) : {id: e.id, name: e.name, time: e.time}));
      setTasklist(updateTask);
      setEditid(0);
      setTodo("");
      return;
    }
    if(todo){ 
      const date = new Date();
    const newTask ={
      id:date.getTime(),
      name:todo,
      time:`${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
    }
    Object.keys(newTask.name).length && setTasklist([...tasklist,newTask]);
    setTodo('');
  }

  }
  const handleEdit = (id) => {
    const selectedTask = tasklist.find(task => task.id === id);
    setTodo(selectedTask.name);
    setEditid(id);
  }
  return (
    <div className={"App " + theme}>
      <div className="container">
    <Header theme={theme} setTheme={setTheme}/>
    <AddTask  todo={todo} setTodo={setTodo} editid={editid} handleSubmit={handleSubmit}/>
    <ShowTask tasklist={tasklist} setTasklist={setTasklist} handleEdit={handleEdit}  handleDelete={handleDelete}/>
    
    </div>
    </div>


  );
}

export default App;
