package com.veroDigit.app.Services.ArtworkPackage;

import com.veroDigit.app.DTO.ArtworkSummary;
import com.veroDigit.app.Repositories.ArtworkRepository;
import com.veroDigit.app.entity.Artwork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IArtworkServiceIMP implements IArtworkService {

    private final RestTemplate restTemplate;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Value("${artic.api.url}")  // You can define the base URL in your application.properties
    private String apiBaseUrl;

    public IArtworkServiceIMP(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<ArtworkSummary> searchArtworks(String query, int page, int limit) {
        // Build the URL for the Art Institute API
        String encodedQuery = UriUtils.encode(query, StandardCharsets.UTF_8);
        String url = UriComponentsBuilder.fromHttpUrl(apiBaseUrl + "/artworks/search")
                .queryParam("q", encodedQuery)
                .queryParam("page", page) // Pagination: page
                .queryParam("limit", limit) // Pagination: limit
                .toUriString();

        try {
            System.out.println("Request URL: " + url);  // Log the URL to verify

            // Call the API and get the response
            ArtworkApiResponse response = restTemplate.getForObject(url, ArtworkApiResponse.class);

            if (response != null) {
                return response.getData().stream()
                        .map(data -> new ArtworkSummary(data.getId(), data.getTitle())) // Only id and title
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // Log the error and return an empty list or null based on your error handling policy
            System.err.println("Error occurred during API request: " + e.getMessage());
        }

        return List.of();  // Return an empty list in case of error
    }

    /**
     * This method should return all saved Artworks, any artwork which was searched by ID should have been saved.
     * @return
     */
    @Override
    public List<Artwork> getSavedArtworks() {
        return artworkRepository.findAll();
    }

    // Step 2: Get full artwork details by id
    @Override
    public Artwork getArtworkById(Long id, int page, int limit) {
        System.out.println("idd: " + id);  // Log the URL to verify

        // Build the URL to fetch the full artwork details by id
        String url = UriComponentsBuilder.fromHttpUrl(apiBaseUrl + "/artworks/" + id)
                .queryParam("page", page) // Pagination: page
                .queryParam("limit", limit) // Pagination: limi
                .toUriString();
        System.out.println("ill: " + url);  // Log the URL to verify

        ArtworkApiSingleResponse response = restTemplate.getForObject(url, ArtworkApiSingleResponse.class);
        System.out.println("ress: " + response);  // Log the URL to verify

        // Check if response is valid and contains artwork data
        if (response != null && response.getData() != null) {
            ArtworkData data = response.getData();  // Directly access the single ArtworkData object
            System.out.println("dd: " + data);  // Log the URL to verify

            String imageId = data.getImageId();
            String imageUrl = imageId != null ?
                    "https://www.artic.edu/iiif/2/" + imageId + "/full/843,/0/default.jpg" : null;

            Artwork artwork = new Artwork(
                    data.getId(),
                    data.getTitle(),
                    data.getMainReferenceNumber(),
                    data.getDepartmentTitle(),
                    data.getArtistTitle(),
                    data.getArtistDisplay(),
                    data.getPlaceOfOrigin(),
                    data.getMediumDisplay(),
                    data.getTechniqueTitles(),
                    data.getTermTitles(),
                    data.getDateStart(),
                    imageUrl // Construct the image URL if necessary

                    );
            artworkRepository.save(artwork);
            return artwork;
        }
        return null;  // Return null if no data found
    }

    @Override
    public List<Artwork> Artworks(int page, int limit) {
        // Build the URL for the Art Institute API
        String url = UriComponentsBuilder.fromHttpUrl(apiBaseUrl + "/artworks")
                .queryParam("page", page) // Pagination: page
                .queryParam("limit", limit) // Pagination: limit
                .toUriString(); // No need for .encode() here, we manually encoded the query

        // Call the API and get the response
        ArtworkApiResponse response = restTemplate.getForObject(url, ArtworkApiResponse.class);

        // Map API response to Artwork entities
        return response != null ? response.getData().stream()
                .map(data -> {
                    String imageId = data.getImageId();
                    String imageUrl = imageId != null ?
                            "https://www.artic.edu/iiif/2/" + imageId + "/full/843,/0/default.jpg" : null;

                    return new Artwork(
                            data.getId(),
                            data.getTitle(),
                            data.getMainReferenceNumber(),
                            data.getDepartmentTitle(),
                            data.getArtistTitle(),
                            data.getArtistDisplay(),
                            data.getPlaceOfOrigin(),
                            data.getMediumDisplay(),
                            data.getTechniqueTitles(),
                            data.getTermTitles(),
                            data.getDateStart(),
                            imageUrl
                    );
                })
                .collect(Collectors.toList()) : List.of();
    }
}