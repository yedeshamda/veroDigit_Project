package com.veroDigit.app.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @JsonProperty("main_reference_number")
    private String mainReferenceNumber;

    @JsonProperty("department_title")
    private String departmentTitle;

    @JsonProperty("artist_title")
    private String artistTitle;

    @JsonProperty("artist_display")
    private String artistDisplay;

    @JsonProperty("place_of_origin")
    private String placeOfOrigin;

    @JsonProperty("medium_display")
    private String mediumDisplay ;

    @JsonProperty("technique_titles")
    private List<String> techniqueTitles;

    @JsonProperty("term_titles")
    private List<String> termTitles;

    @JsonProperty("date_start")
    private String dateStart;

    // New field for ImageId
    @JsonProperty("image_id")
    private String ImageId;

}
