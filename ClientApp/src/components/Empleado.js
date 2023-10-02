import axios from 'axios';
import React, { useState, useEffect } from 'react';
const App = () => {
    const[empleados, setempleados] = useState();
    const[id, setid] = useState("");
    const[nombre, setnombre] = useState("");
    const[cargo, setcargo] = useState("");
    
    useEffect(()=>{
        (async ()=> await ListEmpleados())();
    }, []);

    async function ListEmpleados()
    {
        const result = await axios.get("api/Empleado/GetEmpleados")
        setempleados(result.data);
        console.log(result.data);
    }
    async function AddEmpleado(event)
    {
        event.preventDefault();
        try{
            await axios.post("api/Empleado/AddEmpleado", {
             nombre: nombre,
             cargo: cargo,   
            })
            alert("Enpleado Agregado con EXITO");
            setid("");
            setnombre("");
            setcargo("");
            ListEmpleados();
        }catch(error){
            alert(error);            
        }
    }
    return ( 
        <div className='container'>
            <h1>Empleados</h1>
            <div className='row'>
                <form>
                    <div className='form-group'>
                        <input type='text' className='from-control' id='id' hidden value={id} 
                        onChange={(event)=>{
                            setid(event.target.value);
                        }} />
                    </div>
                    <div className='form-group'>
                        <label>Nombre</label>
                        <input type='text' className='from-control' id='nombre' hidden value={nombre} 
                        onChange={(event)=>{
                            setnombre(event.target.value);
                        }} />
                    </div>
                    <div className='form-group'>
                        <label>Cargo</label>
                        <input type='text' className='from-control' id='cargo' hidden value={cargo} 
                        onChange={(events)=>{
                            setcargo(events.target.value);
                        }} />
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={AddEmpleado}>Add</button>
                    </div>
                </form>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <table className='table table-bordered table-stripped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                            </tr>
                        </thead>
                        {empleados?.map(function fn(empleado) {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope='row'>{empleado.id}</th>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.cargo}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
}
export default App;
//export default Empleado;
