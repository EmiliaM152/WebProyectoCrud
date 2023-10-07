import axios from 'axios';
import React, { useState, useEffect } from 'react';
const App = () => {
    const[empleados, setempleados] = useState();
    const[id, setid] = useState("");
    const[nombre, setnombre] = useState("");
    const[cargo, setcargo] = useState("");
    const [telefono, setTelefono] = useState("");

    
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
            elefono: telefono,  
            })
            alert("Empleado agregado con EXITO");
            setid("");
            setnombre("");
            setcargo("");
            setTelefono("");
            ListEmpleados();
        } catch(error){
            alert(error);                 
        }
    }
    async function EditEmpleado(empleado){
      setnombre(empleado.nombre);
        setcargo(empleado.cargo);
        setid(empleado.id);
        setTelefono(empleado.telefono);
    }
    async function update(event){
        event.preventDefault();
        try {
            await axios.patch("api/Empleado/UpdateEmpleado/"+empleados.find((u)=>u.id ==id).id || id,
           {
                id: id,
                nombre: nombre,
                cargo: cargo,
               telefono: telefono
           })
            alert("Empleado actualizado");   
             setid("");
            setnombre("");
            setcargo("");
            setTelefono("");
            ListEmpleados(); 
        } catch (error) {
            alert(error);            
        }
    }
    async function DeleteEmpleado(id){
        await axios.delete("api/Empleado/DeleteEmpleado/"+id)
        alert("Eliminacion exitosa")
        setid("");
            setnombre("");
            setcargo("");
            setTelefono("");
            ListEmpleados();   
            async function AddEmpleado(event) {
                event.preventDefault();
                try {
                    await axios.post("api/Empleado/AddEmpleado", {
                        nombre: nombre,
                        cargo: cargo,
                        telefono: telefono, // Include the telefono field
                    });
                    // Rest of your code...
                } catch (error) {
                    alert(error);
                }
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
                        <input type='text' className='from-control' id='nombre' value={nombre} 
                        onChange={(event)=>{
                            setnombre(event.target.value);
                        }} />
                    </div>
                    <div className='form-group'>
                        <label>Cargo</label>
                        <input type='text' className='from-control' id='cargo' value={cargo} 
                        onChange={(events)=>{
                            setcargo(events.target.value);
                        }} />
                        <div className='form-group'>
                    <label>Telefono</label>
                    <input
                        type='text'
                        className='form-control'
                        id='telefono'
                        value={telefono}
                        onChange={(event) => setTelefono(event.target.value)}
                    />
                </div>
                    </div>
                    <div className='btn-toolbar'>
                        <button className='btn btn-primary mt-4' onClick={AddEmpleado}>Add</button>
                        <button className='btn btn-success mt-4' onClick={update}>Update</button>
                    </div>
                    
                </form>
            </div>
            <br/>
            <div className='row'>
                <div className='col-12'>
                    <table className='table table-bordered table-stripped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Telefono</th>
                                <th></th>
                            </tr>
                        </thead>
                        {empleados?.map(function fn(empleado) {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope='row'>{empleado.id}</th>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.cargo}</td>
                                        <td>{empleado.telefono}</td>
                                        <td>
                                        <button className='btn btn-warning' onClick={()=>EditEmpleado(empleado)}>Edit</button>
                                        <button className='btn btn-danger' onClick={()=>DeleteEmpleado(empleado.id)}>Delete</button>

                                        </td>
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
