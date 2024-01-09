import React from 'react'

const AddTask = ({handleSubmit,editid ,todo,setTodo }) => {
 

  return (
    <section className='addTask'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='task' value={todo}  autoComplete='off' placeholder='add task' maxLength={25} onChange={(e) => setTodo(e.target.value)}/>
            <button type='submit'>{editid ? 'Update':"Add"}</button>
        </form>

    </section>
  )
}

export default AddTask