import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5165/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/comments/post/${postId}`;
    return this.http.get<Comment[]>(url);
  }

  addComment(comment: any, postId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments`, {
      Content: comment.content,
      PostId: postId
    });
  }

  updateComment(commentId: number, content: string): Observable<void> {
    const url = `${this.apiUrl}/comments/${commentId}`; // Replace with your API endpoint
    const body = { content: content };
    return this.http.put<void>(url, body);
  }

  deleteComment(commentId: number): Observable<void> {
    const url = `${this.apiUrl}/comments/${commentId}`;
    return this.http.delete<void>(url);
  }
}



interface Comment {
  id: number;
  content: string;
  userId: string;
  userName: string;
  postId: number;
}
