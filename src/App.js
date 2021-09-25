// import logo from './logo.svg';
import React, {useState,useEffect} from 'react';
import './App.css';

import Form from './components/Forms';
import TodoList from './components/TodoList';


function App() {
  
  //state
  const [inputText,setInputText] = useState('');
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState('all');
  const [filteredTodos,setFilteredTodos] = useState([]);

//run once
  useEffect(()=>{
    getLocalTodos();
  },[]);

  //useEffect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status])

  //function
  const filterHandler = ()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.complete===true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.complete===false))
        break; 
      default:
        setFilteredTodos(todos)
        break;
    }
  };

  //save todo to local storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos',JSON.stringify(todos));
  };

  const getLocalTodos=()=>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }

  return (
    <div className="App">
      <header>
      <h1>Todo List</h1>
      </header>
      <Form 
      inputText={inputText} 
      todos ={todos} 
      setTodos={setTodos} 
      setInputText ={setInputText}
      setStatus = {setStatus}
      
      />
      <TodoList 
      setTodos={setTodos} 
      todos ={todos}
      filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
