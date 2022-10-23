package com.backend.notes.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean archived;
    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date date;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "note_category",
                joinColumns = @JoinColumn(name = "note_id"),
                inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;

    public void addCategory(Category category){
        categories.add(category);
        category.getNotes().add(this);
    }

    public void removeCategory(Category category){
        categories.remove(category);
        category.getNotes().remove(this);
    }

    public void removeAllCategories(){
        for (Category category : categories) {
            category.getNotes().remove(this);
        }
        categories.clear();
    }
}
