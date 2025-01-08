import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../../Service/artwork.service'; // Update with the correct service path
import { Artwork } from '../../Model/Artwork'; // Update with the correct model path
import * as countries from 'i18n-iso-countries';

@Component({
  selector: 'app-list-artwork',
  templateUrl: './listArtwork.component.html',
  styleUrls: ['./listArtwork.component.css'],
})
export class ListArtworkComponent implements OnInit {
  itemsPerPage = 10;
  currentPage = 1;
  public searchTerm: string = ''; // Search term for filtering
  public artworks: Artwork[] = []; // Array to hold artwork data
  private countryCodes: { [key: string]: string } = {};
  public selectedArtwork: Artwork | null = null; // To store selected artwork for modal
  hover: boolean = false; // Declare hover state

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    // Ensure the country data is loaded and then access country names
    countries.registerLocale(require('i18n-iso-countries/langs/en.json')); // Ensure English locale is loaded

    // Get all country names in English (country code as keys, names as values)
    const allCountries = countries.getNames('en'); // Get all country names in English

    // Reverse the mapping to map country names to their respective codes
    this.countryCodes = this.reverseCountryMap(allCountries);

    this.fetchArtworks(); // Fetch artworks on component initialization
  }

  // Function to reverse the country code to name mapping
  reverseCountryMap(allCountries: { [key: string]: string }): { [key: string]: string } {
    const reversed: { [key: string]: string } = {};

    // Loop through the original country code to name mapping
    Object.keys(allCountries).forEach((countryCode) => {
      const countryName = allCountries[countryCode];
      // Reverse it: country name -> country code
      reversed[countryName] = countryCode.toLowerCase();
    });

    return reversed;
  }

  // Method to fetch artworks from the service
  fetchArtworks(): void {
    this.artworkService
      .ArtWorkList(this.currentPage, this.itemsPerPage)
      .subscribe(
        (data: Artwork[]) => {
          this.artworks = data; // Assign fetched data to the artworks array
        },
        (error) => {
          console.error('Error fetching artworks:', error);
        }
      );
  }
  // Method to fetch artworks from the service
  Artworks(): void {
    this.artworkService
      .ArtWorkSearch(this.searchTerm, this.currentPage, this.itemsPerPage)
      .subscribe(
        (data: Artwork[]) => {
          this.artworks = data; // Assign fetched data to the artworks array
        },
        (error) => {
          console.error('Error fetching artworks:', error);
        }
      );
  }
  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchTerm === '') {  // Fixed the equality check
      this.fetchArtworks();  // Fetch all artworks
    } else {
      this.Artworks();  // Fetch artworks based on search term
    }
  }

  // Handle search input change
  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page
    this.Artworks(); // Fetch artworks based on updated search term
  }
  openArtworkModal(artwork: Artwork): void {
    this.selectedArtwork = artwork;
  }

  closeModal(): void {
    this.selectedArtwork = null;
  }

  getCountryCode(place_of_origin: string): string {
    // Handle specific place_of_origin replacements
    const standardizedPlaceOfOrigin = this.standardizePlaceOfOrigin(place_of_origin);

    // Look up the standardized place_of_origin in the countryCodes
    const countryCode = this.countryCodes[standardizedPlaceOfOrigin];

    // Return the country code if found, or 'gray' if not
    return countryCode;
  }

// Function to standardize country names for specific cases
  standardizePlaceOfOrigin(place_of_origin: string): string {
    const replacements: { [key: string]: string } = {
      'United States': 'United States of America',
      'Russia': 'Russian Federation',
      'Scotland': 'United Kingdom',
      'England': 'United Kingdom',
      'Wales': 'United Kingdom',
      'Northern Ireland': 'United Kingdom',
      'Korea': 'South Korea',
      'Holland': 'Netherlands',
      'China': 'People\'s Republic of China',
    };

    // If place_of_origin matches a key in replacements, return the standardized name
    return replacements[place_of_origin] || place_of_origin;
  }
}
