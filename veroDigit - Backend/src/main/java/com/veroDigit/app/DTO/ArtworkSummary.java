package com.veroDigit.app.DTO;

public class ArtworkSummary {
    private Long id;
    private String title;

    // Constructor
    public ArtworkSummary(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

