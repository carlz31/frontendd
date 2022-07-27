import React from "react";
import "./style.css";

/* debo recibir los props */
export function PostItem({ post, deletePost }) {
  const { id, titulo, descr, completed} = post;
  let color;
  if (completed === true) {             
  color = 'importante'
  }
 
  const fndeletePost = () => {
    deletePost(id)
  }

  return  <li>
            <a href="#" className={color}>
              <button type="reset" id="delete" className="botonX" onClick={fndeletePost}>X</button>
              <h2 className="text-capitalize">{titulo}</h2>
              <p>{descr}</p>
            </a>
          </li>

     
}