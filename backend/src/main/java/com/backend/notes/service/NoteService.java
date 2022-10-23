package com.backend.notes.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.notes.exception.NoteNotFoundException;
import com.backend.notes.model.Category;
import com.backend.notes.model.Note;
import com.backend.notes.repository.NoteRepository;

@Service
public class NoteService {
    
    @Autowired
    private NoteRepository repo;

    public Note saveNote(Note note) {
        return repo.save(note);
    }

    public List<Note> getAllNotes(){
        return repo.findAll();
    }

    public Note getNoteById(Long id){
        Optional<Note> opt = repo.findById(id);
        if (opt.isPresent()){
            return opt.get();
        } else {
            throw new NoteNotFoundException("Note with Id: " + id + " Not Found");
        }
    }

    public void editNoteById(Long id, Note note){
        Note updateNote = getNoteById(id);
        Date date = new Date();
        updateNote.setTitle(note.getTitle());
        updateNote.setDescription(note.getDescription());
        updateNote.setDate(date);
        updateNote.setArchived(note.isArchived());
        updateNote.removeAllCategories();
        updateNote.setCategories(note.getCategories());
        repo.save(updateNote);
    }

    public void deleteNoteById(Long id){
        repo.delete(getNoteById(id));
    }
}
