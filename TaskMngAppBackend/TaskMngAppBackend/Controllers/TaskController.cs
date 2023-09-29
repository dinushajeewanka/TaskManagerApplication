using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskMngAppBackend.DTOs;
using TaskMngAppBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace TaskMngAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly TaskMngDBContext _context;

        public TaskController(TaskMngDBContext context)
        {
            _context = context;
        }

        // GET: api/<TaskController>
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var usernameClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (usernameClaim == null)
                return BadRequest("Username claim not found.");

            var username = usernameClaim.Value;

            // Use the username to get the associated user ID
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest("Invalid user.");

            var userId = user.Id;

            // Now you have the user ID and can use it in your logic

            var tasks = await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
            return Ok(tasks);
        }

        // POST api/<TaskController>/5
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateModel taskModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid task data.");

            var usernameClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (usernameClaim == null)
                return BadRequest("Username claim not found.");

            var username = usernameClaim.Value;

            // Use the username to get the associated user ID
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
                return BadRequest("Invalid user.");

            var userId = user.Id;

            var task = new Models.Task
            {
                Title = taskModel.Title,
                Description = taskModel.Description,
                UserId = userId, // Use the UserId from the token
                CreateDate = DateTime.UtcNow,
                DueDate = taskModel.DueDate,
                IsCompleted = false // Default to not completed
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }


        // PUT api/<TaskController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateModel taskModel)
        {
            if (!ModelState.IsValid || id != taskModel.Id)
                return BadRequest("Invalid task data.");

            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound("Task not found.");

            // Update properties if provided in the taskModel
            if (!string.IsNullOrEmpty(taskModel.Title))
                task.Title = taskModel.Title;

            if (!string.IsNullOrEmpty(taskModel.Description))
                task.Description = taskModel.Description;

            if (taskModel.DueDate != null)
                task.DueDate = (DateTime)taskModel.DueDate;

            task.IsCompleted = taskModel.IsCompleted;

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(task);
        }


        // DELETE api/<TaskController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound("Task not found.");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }
}
