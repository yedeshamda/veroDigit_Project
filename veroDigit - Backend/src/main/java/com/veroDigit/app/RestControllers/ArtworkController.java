package com.veroDigit.app.RestControllers;

import com.veroDigit.app.DTO.ArtworkSummary;
import com.veroDigit.app.entity.Artwork;
import com.veroDigit.app.Services.ArtworkPackage.IArtworkService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/artworks")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ArtworkController {

    private final IArtworkService artworkService;

    // Search and get the full artwork by ID
    @GetMapping("/search")
    public ResponseEntity<List<Artwork>> searchAndGetArtwork(@RequestParam String q,
                                                             @RequestParam(defaultValue = "1") int page,
                                                             @RequestParam(defaultValue = "10") int limit) {
        // Step 1: Search artworks and get summary (id, title)
        List<ArtworkSummary> summaries = artworkService.searchArtworks(q, page, limit);

        // Step 2: Fetch full artwork details based on ids from the search results
        List<Artwork> fullArtworks = summaries.stream()
                .map(summary -> artworkService.getArtworkById(summary.getId(), page, limit)) // Get full details by id
                .collect(Collectors.toList());

        return ResponseEntity.ok(fullArtworks);
    }

    @GetMapping("")
    public List<Artwork> Artworks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return artworkService.Artworks(page, limit);
    }
}