import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5165/api/posts'; // adjust the URL based on your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all posts
  getAllPosts(): Observable<any[]> { // Ideally, you'd have a type like PostModel[]
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single post by ID
  getPostById(id: number): Observable<any> { // Replace 'any' with your actual type
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new post
  createPost(postData: any): Observable<any> { // Replace 'any' with your actual type
    return this.http.post<any>(this.apiUrl, postData);
  }

  // Update a post by ID
  updatePost(id: number, postData: any): Observable<any> { // Replace 'any' with your actual type
    return this.http.put<any>(`${this.apiUrl}/${id}`, postData);
  }

  // Delete a post by ID
  deletePost(id: number): Observable<any> { // Replace 'any' with your actual type
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
