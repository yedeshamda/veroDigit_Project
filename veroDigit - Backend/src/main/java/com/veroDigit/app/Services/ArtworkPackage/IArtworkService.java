package com.veroDigit.app.Services.ArtworkPackage;

import com.veroDigit.app.DTO.ArtworkSummary;
import com.veroDigit.app.entity.Artwork;

import java.util.List;
import java.util.Optional;

public interface IArtworkService {

    List<ArtworkSummary> searchArtworks(String query, int page, int limit);

    // Step 2: Get full artwork details by id
    Artwork getArtworkById(Long id, int page, int limit);

    List<Artwork> Artworks(int page, int limit);
}
