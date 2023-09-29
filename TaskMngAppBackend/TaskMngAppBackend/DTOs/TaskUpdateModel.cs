namespace TaskMngAppBackend.DTOs
{
    public class TaskUpdateModel
    {
        public int Id { get; set; }  // Task Id
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; } // Allow nullable DueDate
    }
}
