import React, { useEffect } from 'react'
import Ingredient from './components/Ingredient'
import Skeleton from './components/Skeleton'
import useAxios from './hooks/useAxios'

function App() {
  const { fetchData, response, loading } = useAxios()
  const { strMeal, strMealThumb, strInstructions, strYoutube } = response

  const youTubeUrl = strYoutube?.replace('watch?v=', 'embed/')

  useEffect(() => {
    fetchData()
  }, [])

  if(loading) {
    return (
      <div className='max-w-4xl mx-auto px-4 py-10'>
        <Skeleton className='h-10 mb-6 md:w-40' />
        <Skeleton className='h-10 w-72 mb-4' />
        <div className='grid gap-4 mb-6 md:grid-cols-2'>
          <Skeleton className='h-52 md:h-72' />
          <Skeleton className='h-52 md:h-72' />
        </div>
        <Skeleton className='h-10 w-72' />
        <Skeleton className='h-64 mb-6 md:h-72' />
        <Skeleton className='h-72' />
      </div>
    )
  }

  let ingredients = []
    Object.keys(response).forEach((item, idx) => {
      if(response[`strIngredient${idx}`]) {
        ingredients.push({
          'ingredient': response[`strIngredient${idx}`],
          'measure' : response[`strMeasure${idx}`]
        })
      }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button 
        onClick={() => fetchData()}
        className='text-white capitalize w-full rounded-md bg-gray-800 px-4 py-2 mb-6 md:w-40'>Get a new Meal!</button>
      <h1 className='text-4xl font-bold underline mb-5'>{strMeal}</h1>

      <div className='mb-5 md:grid md:grid-cols-2 md:gap-10'>
        <div className='h-80 border-orange-500 border-4 rounded-md'>
          <img className='w-full h-full object-cover' src={strMealThumb} alt={strMeal} />
        </div>

        <div className='my-6 md:my-0'>
          <h3 className='text-4xl font-bold mb-5'>Ingredients:</h3>
          <ul>
            {ingredients.map((item, idx) => 
              <Ingredient item={item} idx={idx} key={idx} />
            )}
          </ul>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-4xl font-bold mb-5'>Instructions:</h3>
        <p>{strInstructions}</p>
      </div>

      <div className='aspect-w-16 aspect-h-9'>
        <iframe src={youTubeUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default App
