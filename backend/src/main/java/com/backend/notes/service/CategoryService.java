package com.backend.notes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.notes.exception.CategoryNotFoundException;
import com.backend.notes.model.Category;
import com.backend.notes.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository repo;

    public Category saveCategory(Category category) {
        return repo.save(category);
    }

    public List<Category> getAllCategories(){
        return repo.findAll();
    }

    public Category getCategoryById(Long id){
        Optional<Category> opt = repo.findById(id);
        if (opt.isPresent()){
            return opt.get();
        } else {
            throw new CategoryNotFoundException("Category with Id: " + id + " Not Found");
        }
    }

    public void deleteCategoryById(Long id){
        repo.delete(getCategoryById(id));
    }
}
