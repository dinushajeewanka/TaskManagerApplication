using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskMngAppBackend.Models
{
    public class Task
    {
        [Key]
       public int Id {  get; set; }

        [Column(TypeName = "nvarchar(100)")]
       public string Title { get; set; }

        [Column(TypeName = "nvarchar(100)")] 
       public string Description { get; set; }
       public bool IsCompleted { get; set; }
       public DateTime CreateDate { get; set; }
       public DateTime DueDate { get; set; }
       public int UserId { get; set; } //foreign key to associate task with a user

        // Navigation property to access the associated user
        public virtual User User { get; set; }
    }


}
