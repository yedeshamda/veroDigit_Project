package com.veroDigit.app.Services.ArtworkPackage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ArtworkApiSingleResponse {
    private ArtworkData data;
}

@Data
class ArtworkDta {
    private Long id;
    private String title;
    @JsonProperty("main_reference_number")  // Mapping the snake_case JSON key to camelCase Java field
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
    private String mediumDisplay;

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
