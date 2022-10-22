package com.backend.notes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.notes.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{
    
}
