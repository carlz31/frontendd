import React, { Fragment, useState, useRef, useEffect } from "react";
import {v4 as uuid} from 'uuid';
import { PostItem } from "./PostItem";
import "./style.css";

export function PostIt() {
  let importancia;
  importancia = false
  const cambiarImportancia = () =>{
    importancia = !importancia;
    if (importancia === true){
      return console.log(true)  
    }
    if (importancia === false){
      return console.log(false)
    }
  }
  
  const [posts, setPosts] = useState([]);
  
  const tituloRef = useRef();
  const descrRef = useRef();
  
  const agregarNota = () => {
    /* Rescatar el valor del input */
    const titulo = tituloRef.current.value
    console.log(titulo);
    const descr = descrRef.current.value
    console.log(descr);
    
    
    
    
    if(titulo.trim() === '' || descr.trim() === '') return;
    console.log('agregando tarea...')
    
    
    
    
    /* Metodo definido por react para operar los elementos */
    setPosts((prevPosts) => {
      const newPost = {
        id : uuid(),
        titulo: titulo,
        descr: descr,
        completed: importancia
      };
      
      
      return[...prevPosts, newPost]
      
    });
    localStorage.setItem('posts', JSON.stringify(posts));
  };
  
  const deletePost = (id) => {
    console.log(id)
    const filteredPost = posts.filter(post => post.id !== id)
    setPosts(filteredPost)
    localStorage.removeItem(id)
  }
  
  useEffect(() => {
    const posts = () =>JSON.parse(localStorage.getItem('posts'));
    setPosts(posts);    
  }, []);
  
  
  
  return (
    <Fragment>
      <h1 className="mt-2 fw-bolder">Simulador de Post It</h1>
      <form className="row g-3 align-items-center mt-2">
        <div className="col-auto">
          <input type="text" className="form-control border-primary" ref={tituloRef} placeholder="Ingrese un título"/>
        </div>
        <div className="col-md-4 col-sm-7 col-8">
          <input type="text" className="form-control border-primary" ref={descrRef} placeholder="Descripción"/>
        </div>
        <div className="col-auto form-check ms-2">
        <input className="form-check-input" onClick={cambiarImportancia} type="checkbox" />
          <label className="form-check-label" form="flexCheckDefault">
          Importante
          </label>
        </div>
        <div className="col-auto">
          <button type="reset" value='Reset' onClick={agregarNota} className="btn btn-agregar btn-primary">Agregar</button>
        </div>
      </form>
      
      {/* Cargar post it */}
      <div>
       <ul>
          {posts.map((post) => (
            <PostItem post={post} deletePost={deletePost} key={post.id} ></PostItem>
            ))}
         </ul>
      </div>

      
    </Fragment>
  );
}