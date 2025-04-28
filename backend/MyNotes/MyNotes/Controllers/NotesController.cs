using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;

namespace MyNotes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly NotesDbContext _context;

    public NotesController(NotesDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);
        await _context.Notes.AddAsync(note, ct);
        await _context.SaveChangesAsync(ct);
        
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct )
    {
        var notesQuery = _context.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                   n.Title.ToLower().Contains(request.Search.ToLower())); //фильтр по поиску названии заметок

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };
            
        
        if (request.SortOrder == "desc")
        {
            notesQuery = notesQuery.OrderByDescending(selectorKey);
        }
        else
        {
            notesQuery = notesQuery.OrderBy(n => n.CreatedAt);
        }
        
        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(cancellationToken: ct);
        
        return Ok(new GetNoteResponse(noteDtos));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var note = await _context.Notes.FirstOrDefaultAsync(p => p.Id == id, ct);
        
        if (note == null)
            return NotFound();
        
        _context.Notes.Remove(note);
        await _context.SaveChangesAsync(ct);
        return NoContent(); 
    }
    
}