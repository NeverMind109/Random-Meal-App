import React from 'react'

const Ingredient = ({ item, idx }) => (
  <li before={idx+1 + ')'} className='relative flex text-sm mb-2 before:content-[attr(before)] before:mr-1'>
    <span>{item.ingredient}</span>
    <span className='mx-1'>-</span>
    <span className='italic text-gray-500'>{item.measure}</span>
  </li>
)

export default Ingredient