using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectRestfulAPI.DAL;
using ProjectRestfulAPI.Models;

namespace ProjectRestfulAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetStudent()
        {
            var liat = (from s in _context.Student
                        select new
                        {
                            s.StudentId,
                            s.FName,
                            s.LName,
                            s.Dob,
                            s.Address,
                            s.Email,
                            s.Phone
                        }).ToListAsync();
            return await liat;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetStudent(int id)
        {
            var student = (from s in _context.Student
                          where s.StudentId == id
                          select new
                          {
                              s.StudentId,
                              s.FName,
                              s.LName,
                              s.Dob,
                              s.Address,
                              s.Email,
                              s.Phone
                          }).ToListAsync();

            if (student == null)
            {
                return NotFound();
            }

            return await student;
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            Student s;

            if (id != student.StudentId)
            {
                return BadRequest();
            }

            if (student.StudentId != 0)
            {
                s = new Student();
                s.FName = student.FName;
                s.LName = student.LName;
                s.Dob = student.Dob;
                s.Address = student.Address;
                s.Email = student.Email;
                s.Phone = student.Phone;
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            Student s;
            if (student.StudentId == 0)
            {
                s = new Student();
                s.FName = student.FName;
                s.LName = student.LName;
                s.Address = student.Address;
                s.Dob = student.Dob;
                s.Email = student.Email;
                s.Phone = student.Phone;

            }
            _context.Student.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.StudentId }, student);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Student.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            else
            {
                _context.Student.Remove(student);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return _context.Student.Any(e => e.StudentId == id);
        }
    }
}
