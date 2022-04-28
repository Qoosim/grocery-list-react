import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="mx-8 my-4">
      {
        items.map((item) => {
          const { id, title } = item;
          return (
            <article key={id} className="flex place-content justify-between py-2">
              <p>{title}</p>
              <div className="flex text-xs">
                <button
                  className="mr-2 text-green-600"
                  onClick={() => editItem(id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-400"
                  onClick={() => removeItem(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </article>
          )
        })
      }
    </div>
  )
}

export default List;
