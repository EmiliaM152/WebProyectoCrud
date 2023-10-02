using System.ComponentModel.DataAnnotations;

namespace asp_react_crud_webE.Models
{
    public class Empleado
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cargo { get; set; }

    }
}