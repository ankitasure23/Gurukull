import React,{useState} from 'react'

function Button({name , icon, text, dropDownMenu = [], onClick }) {
    
    const [isOpen, setIsopen] = useState(false);
    const toggleMenu = () => {
        if (dropDownMenu.length > 0) {
            setIsopen(!isOpen);
        } else {
            onClick && onClick();
        }
    }
    return (
        <>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className=' group relative bg-purple-600 text-white flex flex-col items-center justify-center w-20 h-20 rounded- px-4 py-2 hover:bg-purple-700 ' style={{borderRadius:'50%'}} onClick={toggleMenu}>
                    {icon && <img src={icon} />}
                    <span className="absolute top-full mb-2 left-1/2 -translate-x-1/2 
                   px-2 py-1 text-sm text-white bg-black rounded opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300">
                    {name}
                    </span>
                {text && <span className='font-bold text-4xl'>{text}</span>}
            </button>

            {dropDownMenu.length > 0 && isOpen && (
                <ul className='bg-purple-400 p-4 mt-2 rounded shadow-lg absolute' style={{ listStyle: 'none' }}>
                    {dropDownMenu.map((item, index) => (
                        <button key={index} className='text-xl font-bold text-purple-950' onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}>{item.label}</button>
                    ))}
                </ul>
            )}
        </div >
        </>
    )

}

export default Button