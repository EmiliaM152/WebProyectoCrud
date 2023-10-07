using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using asp_react_crud_webE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp_react_crud_webE.Models;

namespace asp_react_crud_webE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadoController : ControllerBase
    {
        private readonly ApplicationDbContext _dbcontext;
        public EmpleadoController(ApplicationDbContext dbcontext)
        {
            _dbcontext= dbcontext;
        }

        [HttpGet]
        [Route("GetEmpleados")]
        public IEnumerable<Empleado> GetEmpleados()
        {
            return _dbcontext.Empleado.ToList();           
        }
        [HttpPost]
        [Route("AddEmpleado")]
        public async Task<Empleado> AddEmpleado(Empleado empleado)
        {
            _dbcontext.Empleado.Add(empleado);
            await _dbcontext.SaveChangesAsync();
            return empleado;
        }
        [HttpPatch]
        [Route("UpdateEmpleado/{id}")]
        public async Task<Empleado> UpdateEmpleado(Empleado empleado)
        {
            _dbcontext.Entry(empleado).State = EntityState.Modified;
            await _dbcontext.SaveChangesAsync();
            return empleado;
        }
        [HttpDelete]
        [Route("DeleteEmpleado/{id}")]
        public bool DeleteEmpleado(int id)
        {
           bool deleted = false;
           var empleado = _dbcontext.Empleado.Find(id);
           if(empleado !=null){
            deleted = true;
            _dbcontext.Entry(empleado).State = EntityState.Deleted;
            _dbcontext.SaveChanges();
           }
           else
           {
                deleted=false;
           }
           return deleted;
        }

    }   
}
