package com.backend.notes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.notes.model.Note;
import com.backend.notes.service.NoteService;

@RestController
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteService service;

    public NoteController(NoteService service){
        this.service = service;
    }

    @GetMapping(value="/api/notes")
    public List<Note> getNotes(){
        return service.getAllNotes();
    }
    @GetMapping(value="/api/notes/{id}")
    public Note getNote(@PathVariable("id") Long id){
        return service.getNoteById(id);
    }
    
    @PostMapping(value="/api/notes")
    public void addNote(@RequestBody Note note){
        service.saveNote(note);
    }
    @PutMapping(value="/api/notes/{id}")
    public void editNote(@RequestBody Note note, @PathVariable("id") Long id){
        service.editNoteById(id, note);
    }

    @DeleteMapping(value="/api/notes/{id}")
    public void deleteNote(@PathVariable("id") Long id){
        service.deleteNoteById(id);
    }
}
