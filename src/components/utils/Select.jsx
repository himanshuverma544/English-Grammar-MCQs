import { useState, useEffect, useRef } from 'react';


const ArrowDropdown = ({ className = "", size = 20, fill = "none" }) =>
  <svg
    className={`iconfinder arrow-drop-down-icon ${className}`}
    height={size}
    viewBox="0 0 48 48"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 20l10 10 10-10z"/>
    <path d="M0 0h48v48h-48z" fill={fill}/>
  </svg>


const Select = ({ className, label = "", defaultValue = null, options=[], onChange = option => {} }) => {


  const [selected, setSelected] = useState(options[0]);
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef(null);


  const handleOptionClick = option => {

    onChange(option);
    setSelected(option);
    setShowOptions(false);
  };

  useEffect(() => {

    const handleDocumentClick = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`
        ${className}
        ${label && "flex justify-center items-center gap-3"}
        relative inline-block
      `}
    >
      {label && <label htmlFor="select">{label}</label>}
      <div
        id="select"
        className={`
          wrapper
          flex justify-between items-center border
          rounded
          cursor-pointer
        `}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className="select-selected px-6 py-1 text-gray-300">
          <span
            className={`${selected === defaultValue ? "opacity-50" : ""}`}
          >
            {selected}
          </span>
        </div>
        <div className="icon-cont me-3">
          <ArrowDropdown/>
        </div>
      </div>

      {showOptions && (
        <div className="select-items w-[42%] absolute top-full right-[1px] border rounded-b bg-white">
          {options.map((option, index) => (
            <div
              key={index}
              className={`
                py-1 px-6
                cursor-pointer
                text-black hover:bg-secondaryLight
                ${selected === option ? 'bg-primaryLight' : ''}
              `}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;