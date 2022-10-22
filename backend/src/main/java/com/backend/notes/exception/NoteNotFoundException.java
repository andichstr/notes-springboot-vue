package com.backend.notes.exception;

public class NoteNotFoundException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

    public NoteNotFoundException(){
        super();
    }

    public NoteNotFoundException(String msg){
        super(msg);
    }
}
