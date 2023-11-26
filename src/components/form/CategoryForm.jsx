import React from 'react'

const CategoryForm = ({submitHandler, value, setValue}) => {
  return (
    <>
        <div>
            <form onSubmit={submitHandler}>
                <input onChange={(e)=>setValue(e.target.value)} value={value} type="text" placeholder='Enter Category Name'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </>
  )
}

export default CategoryForm