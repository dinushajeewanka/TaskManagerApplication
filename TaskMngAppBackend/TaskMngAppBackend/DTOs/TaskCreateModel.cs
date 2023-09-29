namespace TaskMngAppBackend.DTOs
{
    public class TaskCreateModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool CreateDate { get; set; }
        public DateTime DueDate { get; set; }
    }
}
