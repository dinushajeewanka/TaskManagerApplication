using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskMngAppBackend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")] 
        public string Username { get; set; }

        [Column(TypeName = "nvarchar(100)")] 
        public string PasswordHash { get; set; }

        [Column(TypeName = "nvarchar(100)")] 
        public string FullName { get; set; }

        [Column(TypeName = "nvarchar(100)")] 
        public string Email { get; set; }

        // Navigation property to access the tasks associated with this user
        //public virtual ICollection<Task> Tasks { get; set; }
    }
}
