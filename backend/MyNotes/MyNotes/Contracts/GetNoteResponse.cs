using MyNotes.Models;

namespace MyNotes.Contracts;

public record GetNoteResponse(List<NoteDto> notes);