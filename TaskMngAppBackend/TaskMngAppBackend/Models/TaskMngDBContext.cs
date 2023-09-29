using Microsoft.EntityFrameworkCore;

namespace TaskMngAppBackend.Models
{
    public class TaskMngDBContext:DbContext
    {
        public TaskMngDBContext(DbContextOptions<TaskMngDBContext> options):base(options)
        {


        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

