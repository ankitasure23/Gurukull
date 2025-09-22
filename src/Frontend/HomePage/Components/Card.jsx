import React from 'react';
import '../index.css'
function Card({icon , title , description , link}) {
    return (
        <>
            <div className="card">
                <img className='max-w-52 h-20 object-contain mx-auto mb-4 rounded-lg shadow' src={icon} alt="ICON" />
                <h1 className='font-bold text-purple-800 text-4xl mt-12 mb-10'>{title}</h1>
                <p className='font-bold text-purple-500 text-xl'>{description}</p>
            </div>
        </>
    )
}

export default Card;