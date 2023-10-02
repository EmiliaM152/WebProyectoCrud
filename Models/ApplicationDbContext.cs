using Microsoft.EntityFrameworkCore;

namespace asp_react_crud_webE.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {

        }
        public virtual DbSet<Empleado> Empleado { get; set; }
    }
}
