import { render } from '@testing-library/react';
import React from 'react';
import {v4 as uuidv4} from "uuid";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

const prioritys = [
    { label: 'Highest'  , id:5},
    { label: 'High'     , id:4},
    { label: 'Average'  , id:3},
    { label: 'Low'      , id:2},
    { label: 'Lowest'   , id:1}
];

class Todo1 extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            todos: JSON.parse(localStorage.getItem("todos")) || []
        }
    }

    save(changedTodos){
        changedTodos.sort(function(a, b) {
            return parseInt(b.priority) - parseInt(a.priority);
        });
        localStorage.setItem("todos", JSON.stringify(changedTodos));
        this.setState({todos : changedTodos});
    }
    
    addTodo(e){
        e.preventDefault();
        var stored_todos = this.state.todos;

        var new_todos = [...stored_todos, {
            id:uuidv4(),
            title:document.getElementById("todo-title").value,
            priority:document.getElementById("todo-priority").value,
            complete:false
        }]

        this.save(new_todos);
        e.target.reset();
    }

    clickOnTodo(type, id){
        var stored_todos = this.state.todos;
        var new_todos = [];

        stored_todos.forEach(todo => {
            if(todo.id === id){
                // console.log(todo, type);
                if(type === "Complete"){
                    todo.edit = false;
                    todo.complete = !todo.complete;
                    new_todos.push(todo);
                }
                else if(type === "Edit"){
                    console.log("Edit mode");
                    if(!todo.complete && todo.edit){
                        todo.title = document.getElementById("title-"+todo.id).value;
                    }
                    todo.edit =! todo.edit;
                    new_todos.push(todo);
                }
            }
            else{
                if(todo.edit){
                    todo.edit = false;
                }
                new_todos.push(todo);
            }
        });
        this.save(new_todos);
        this.forceUpdate();
    }

    render () {
        return (
            <> 
                <div class="row">
                    <div class="col">
                        <div name="dummy, for spacing" style={{height:"20px"}}></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h1 class="display1 text-center"><b>To Do List</b></h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10 pl-0"><b>Add Todo</b></div>
                    <div class="col-2 pr-0"><b>Priority</b></div>
                </div>
                <div class="row mb-5">
                    <form class="form w-100" onSubmit={this.addTodo.bind(this)}>
                        <div class="form-group w-100">
                            <div class=" ml-1 row">
                                <input 
                                    id="todo-title"
                                    type="text" 
                                    class="form-control col-9" 
                                    placeholder="todo..."
                                />
                                <select
                                    id="todo-priority"
                                    class="form-control select col-3"
                                    defaultValue={1}
                                >
                                    {
                                        prioritys.map((p)=>(
                                            <option value={p.id}>{p.id} - {p.label}</option>
                                        ))  
                                    }
                                </select>
                            </div>
                            <input type="submit" class="form-control row col-2 mt-1 ml-1 btn btn-primary" value="Submit" aria-describedby="helpId"/>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <div class="col-9">
                        <ul class="list-group w-100">
                        {(this.state.todos).map((todo)=>{
                            return (
                                <li 
                                    class = "list-group-item row"
                                    key   = {todo.id}
                                    type  = {1}
                                >
                                    <div class="row w-100">
                                        <div class="col-9">
                                                {(()=>{
                                                    if(todo.complete){
                                                        return (
                                                            <strike>
                                                                {todo.title}
                                                            </strike>
                                                        )
                                                    }else {
                                                        if(todo.edit)
                                                            return (
                                                                <input id={"title-"+(todo.id)} defaultValue={todo.title}/>
                                                            )
                                                        else
                                                            return todo.title
                                                    }
                                                })()}
                                        </div>
                                        <button class="btn btn-outline-success col-1 pl-0 pr-0" type="button" onClick={() => this.clickOnTodo('Complete', todo.id)}>
                                            <CheckCircleIcon/>
                                        </button>
                                        <button class="btn btn-outline-warning col-1 pl-0 pr-0" type="button" onClick={() => this.clickOnTodo('Edit', todo.id)}>
                                            <EditIcon/>
                                        </button>
                                        <button class="btn btn-outline-danger col-1 pl-0 pr-0" type="button"  onClick={() => this.clickOnTodo('Delete', todo.id)}>
                                            <ClearIcon/>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                        {/* <TodoListItem id={todo.id} title={todo.title} priority={todo.priority} handleClick={(type, id) => console.log("Clicked "+type+" on "+id)}/> */}
                        </ul>
                    </div>
                    <div class="col-3">
                        <ul class="list-group w-100">
                        {(JSON.parse(localStorage.getItem("todos"))).map((todo)=>(
                            <li 
                                class="list-group-item row"
                                key={todo.id}
                                type={1}
                                
                            >
                                <form class="form-inline w-100">
                                    <div class="form-group w-100">
                                        <span class="col-12 my-2">{todo.priority} &nbsp;</span>
                                    </div>
                                </form>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Todo1;