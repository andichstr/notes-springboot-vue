package com.backend.notes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.notes.exception.NoteNotFoundException;
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

    public void deleteNoteById(Long id){
        repo.delete(getNoteById(id));
    }
}
