package com.backend.notes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.notes.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
