namespace TaskMngAppBackend.DTOs
{
    public class RegisterViewModel
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        //public string ConfirmPassword { get; set; }
    }
}
