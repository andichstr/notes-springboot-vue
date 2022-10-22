package com.backend.notes.exception;

public class CategoryNotFoundException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

    public CategoryNotFoundException(){
        super();
    }

    public CategoryNotFoundException(String msg){
        super(msg);
    }
}
