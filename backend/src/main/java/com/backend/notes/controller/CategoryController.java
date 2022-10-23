package com.backend.notes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.notes.model.Category;
import com.backend.notes.service.CategoryService;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService service;

    public CategoryController(CategoryService service){
        this.service = service;
    }

    @GetMapping(value="/api/categories")
    public List<Category> getCategories(){
        return service.getAllCategories();
    }

    @GetMapping(value="/api/categories/{id}")
    public Category getCategory(@PathVariable("id") Long id){
        return service.getCategoryById(id);
    }
    
    @PostMapping(value="/api/categories/")
    public void addCategory(@RequestBody List<Category> categories){
        for (Category category : categories) {
            service.saveCategory(category);
        }
    }


    @DeleteMapping(value="/api/categories/")
    public void deleteCategory(@RequestBody List<Long> ids){
        for (Long id : ids) {
            service.deleteCategoryById(id);
        }
    }
}
