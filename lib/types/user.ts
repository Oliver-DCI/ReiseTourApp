export interface User {
  _id: string;
  username: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  
  // Erweiterungen für das System-Management
  role: "user" | "admin"; // Wichtig für den Schutz der Admin-URL
  profileImage?: string;  // Für die spätere Bilder-Upload-Funktion
  isOnline?: boolean;     // Für das Friend-System (online status)
  
  createdAt?: string;
  updatedAt?: string;
}