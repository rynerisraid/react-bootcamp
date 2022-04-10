import React from "react";
import {useQuery,gql,useMutation} from '@apollo/client';


//query
const GET_TODOS = gql`
  query getTodos{
    todos{
      done
      id
      text
    }
  }
`
//execute mutation
const TOGGLE_TODO=gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(where: {id: {_eq:$id}}, _set:{done: $done}){
      returning {
        done
        id
        text
      }
    }
  }
`

//add todos
const ADD_TODO=gql`
  mutation addTodo($text:String!) {
    insert_todos(objects:{text:$text}){
      returning{
        done
        id
        text
      }
    }
  }
`
//
const DELTE_TODO=gql`
  mutation deleteTodo($id:uuid!) {
    delete_todos(where: {id: {_eq: $id}}){
      returning{
        done
        id
        text
      }
    }
  }
`


function App() {
  const [todoText,setTodoText] = React.useState('');
  const {data,loading,error} = useQuery(GET_TODOS);//hook
  const [toggleTodo]=useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO,{
    onCompleted: ()=>setTodoText('')
  });
  const [deleteTodo] = useMutation(DELTE_TODO);



  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error fetching todos</div>


  async function handleToggleTodo({ id, done }){
    const data = await toggleTodo({ variables:{id:id, done:!done}});
    console.log(data)
  }

  async function handleDeleteTodo({id}){
    const isComfirmed = window.confirm('Do you want to delete this todo?');
    if(isComfirmed){
      const data = await deleteTodo({
        variables:{id},
        update: cache=>{
          const prevData = cache.readQuery({query:GET_TODOS});
          const newTodos = prevData.todos.filter(todo=>todo.id!==id);
          cache.writeQuery({query:GET_TODOS,data:{todos:newTodos}});
        }
      });
      console.log('delete todo',data)
    }
  }

  async function handleAddTodos(event){
    event.preventDefault();
    if(!todoText.trim()) return;
    const data = await addTodo({
      variables:{text:todoText},
      refetchQueries:[
        { query: GET_TODOS }
      ]
    });
    setTodoText("");
  }



  return <div className="vh-100 code flex-column items-center bg-purple white pa5">
    <h1 className="f2-l flex items-center justify-center">GraphQL CheckList{" "}<span role="img" aria-label="Checkmark">✔</span></h1>
    <div className="flex items-center justify-center flex-column">
      <form onSubmit={handleAddTodos} className="mb3">
        <input className="pa2 f4 b--dashed items-center"
          type = "text"
          placeholder ="Write your todo"
          onChange={event=>setTodoText(event.target.value)}
          value={todoText}
        />
        <button type="submit" className="pa2 f4 bg-green">Create</button>
      </form>
    </div>

    <div className="flex items-center justify-center flex-column">
    {data.todos.map(todo=>(<p onDoubleClick={()=>handleToggleTodo(todo)} key={todo.id}>
      <span className={`pointer list pa1 f3 ${todo.done&&"strike"}`}>
        {todo.text}
      </span>
      <button className="bg-transparent bn f4" onClick={()=>handleDeleteTodo(todo)}>
        <span className="red">
          &times;
        </span>  
      </button>
    </p>))}

    </div>

  </div>;
}

export default App;
