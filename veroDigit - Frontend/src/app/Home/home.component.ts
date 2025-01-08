import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../Service/artwork.service'; // Update with the correct service path
import { Artwork } from '../Model/Artwork'; // Update with the correct model path
import { CalendarOptions } from '@fullcalendar/core'; // FullCalendar CalendarOptions type
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core'; // EventInput type
import multiMonthPlugin from '@fullcalendar/multimonth'

@Component({
  selector: 'app-list-artwork',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public artworks: Artwork[] = []; // Array to hold artwork data
  public totalArtworks: number = 0; // Total number of artworks
  public artistsStats: { [key: string]: number } = {}; // Dictionary to store artist's count
  public uniqueArtistsCount: number = 0; // Number of unique artists
  public calendarOptions: CalendarOptions = { // Initialize calendar options directly
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, multiMonthPlugin],
    initialView: 'listYear',  // Change to 'dayGridYear' to display by year
    events: [], // Set an empty array initially
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'listYear', // Add 'dayGridYear' to the toolbar
    },
    eventClick: (info) => {
      this.showArtworkDetails(info.event.extendedProps['artworkId']); // Handle event click
    },
  };

  private currentPage: number = 1; // Start at the first page
  private totalPages: number = 1;  // Total number of pages, set this value based on the response from the backend

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.fetchArtworks(); // Fetch artworks on component initialization
  }

  // Fetch artworks from the service with pagination
  fetchArtworks(): void {
    const pageSize = 100;
    this.artworkService.ArtWorkList(this.currentPage, pageSize).subscribe(
      (data: Artwork[]) => {
        if (data && data.length > 0) {
          this.artworks = this.artworks.concat(data); // Append new artworks to the existing list
          this.updateCalendarEvents(); // Update calendar events with the new artwork data
          this.updateStats(); // Update statistics

          // If the number of artworks returned is less than the page size, it's the last page
          if (data.length < pageSize) {
            this.totalPages = this.currentPage; // Last page reached
          } else {
            this.currentPage++; // Increment the page number for the next fetch
            this.fetchArtworks(); // Fetch the next page
          }
        }
      },
      (error) => {
        console.error('Error fetching artworks:', error);
      }
    );
  }

  // Update the statistics (total artworks, artist count, etc.)
  updateStats(): void {
    this.totalArtworks = this.artworks.length; // Update total artworks count

    // Group artworks by artist_title
    this.artistsStats = this.artworks.reduce((acc, artwork) => {
      const artistName = artwork.artist_title || 'Unknown Artist'; // Handle cases where artist_title is missing
      if (acc[artistName]) {
        acc[artistName]++;
      } else {
        acc[artistName] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    // Calculate the number of unique artists
    this.uniqueArtistsCount = Object.keys(this.artistsStats).length;
  }

  // Update the calendar events with artwork data
  updateCalendarEvents(): void {
    // Mapping artwork data to FullCalendar events
    const events: EventInput[] = this.artworks.map(artwork => {
      const year = artwork.date_start ? new Date(artwork.date_start).getFullYear() : null;
      if (year) {
        return {
          title: artwork.title,
          start: new Date(year, 0, 1), // Assuming start of year for the artwork
          description: artwork.artist_display,
          extendedProps: {
            artworkId: artwork.id,
            artist: artwork.artist_title,
            medium: artwork.medium_display,
          },
        } as EventInput;
      }
      return null; // Return null if year is not available
    }).filter((event): event is EventInput => event !== null);

    // Update the calendar options with the new events
    this.calendarOptions.events = events;
  }

  // Handle click on an artwork event
  showArtworkDetails(artworkId: number): void {
    const artwork = this.artworks.find(a => a.id === artworkId);
    if (artwork) {
      alert(`Artwork: ${artwork.title}\nArtist: ${artwork.artist_display}\nMedium: ${artwork.medium_display}`);
    }
  }
}
