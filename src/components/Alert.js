import React from 'react';

const Alert = ({ type, msg, bg, removeAlert, list }) => {

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      removeAlert();
    }, 3000)
    return () => clearTimeout(timeout);
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  return <p
    className={`w-full text-center text-sm rounded-lg capitalize ${type} ${bg}`}
    >
    {msg}
    </p>
}

export default Alert;
