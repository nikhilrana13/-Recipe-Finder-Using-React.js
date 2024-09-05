import React, { useEffect, useState } from 'react'
import './Style.css'

 const Recipedata = () => {
    const [input, setInput] = useState('')
    const [recipedata, setRecipedata] = useState([])

    const getdata = async (Input) =>{
        try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Input}`)
            const data = await res.json()
            setRecipedata(data.meals)
      

        }catch(error){
            console.log('error Failed to load api:',error)

        }
  
    }

    useEffect(()=>{
      getdata("")
    },[])


    const handleclick = () =>{
      getdata(input)
      setInput('')
    }

    const Recipeinstructions = ({Instructions})=>{
        const [isReadMore,setReadMore] = useState(false)

        const toggleReadMore = ()=>{
            setReadMore(!isReadMore)
        }

        return(
            <p>
                {isReadMore ? Instructions :`${Instructions.slice(0,200)}...`}
                {Instructions.length > 200 && (
                    <button className="Readmore"onClick={toggleReadMore}>
                        {isReadMore ? 'Show less' : 'Read more'}
                    </button>

                )}
            </p>
        )

    }



  return (

    <>
      <div className="main">
     <h2>Receipe finder</h2>
    <div className="search-grp">
      <input type="text" placeholder="" id="searchbox" value={input} onChange={(e)=>setInput(e.target.value)} />
      <button  onClick={handleclick}id="searchbtn">Search</button>
    </div>
    <div className="receipecontainer">
        {recipedata.length > 0 ? (
          recipedata.map((meal) => (
            <div className="meal" key={meal.idMeal}>
               <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <Recipeinstructions  Instructions={meal.strInstructions}/>
            </div>
          ))
        ) : (
          <p>No receipes found</p>
        )}
    
    </div>
  </div>
    </>

    
   )
}



export default Recipedata