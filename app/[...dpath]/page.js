import React from 'react'

function page({params}) {
    console.log(params)
  return (
    <div>
        <ul>
            {params.dpath.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
    
  )
}

export default page