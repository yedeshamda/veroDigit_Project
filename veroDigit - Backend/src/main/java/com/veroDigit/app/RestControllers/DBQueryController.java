package com.veroDigit.app.RestControllers;

import com.veroDigit.app.Services.ArtworkPackage.IArtworkService;
import com.veroDigit.app.entity.Artwork;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class DBQueryController {

    private final String SUPERUSER = "super-user";

    @Autowired
    private IArtworkService artworkService;

    /**
     * This method should query all the saved Artwork, while only Artwork which was displayed in the FE should be saved in the first place.
     * This method should be used by super-users only.
     * // TODO: i forgot to implement some things here i think, but i seems to work?
     * @return
     */
    @GetMapping("queryDB")
    private ResponseEntity<List<Artwork>> getArtworksFromDB(@RequestHeader (value = "userRole") String role){
        if (role.equals(SUPERUSER)) {
            return ResponseEntity.of(Optional.of(artworkService.getSavedArtworks()));
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
