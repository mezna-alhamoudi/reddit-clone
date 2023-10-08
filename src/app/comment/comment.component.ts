import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comments.service';
import { AuthService } from  '../auth/auth.service'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: Comment[] = []; 
  newComment: string = '';
  editCommentForm!: FormGroup;
  editingCommentId: number | null = null;

  @Input() postId: number = 0;
  constructor(
    private commentService: CommentService,
    public authService: AuthService,
    private fb: FormBuilder) { 
      this.editCommentForm = this.fb.group({
        content: [''],
      });
    }

 

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.postId).subscribe(
      (response:any) => {
        this.comments = response.data;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );  
  }

  addComment() {
    if (this.authService.loggedIn) {
      if (this.newComment.trim() !== '') {
        // Create a new comment object
        const newComment: Comment = {
          id:  this.comments.length + 1,
          userName: this.authService.userName, 
          content: this.newComment
        };

        // Call your CommentService to add the comment via API
        this.commentService.addComment(newComment, this.postId).subscribe(
          (response: any) => {
            
            console.log(response, 'response')
            this.comments.push(response);
            this.newComment = '';
            this.showSuccessMessage('Comment added successfully.');
          },
          (error:any) => {
            console.error('Error adding comment:', error);
            this.showErrorMessage('Failed to add comment.');
          }
        );
      } else {
        this.showErrorMessage('Comment field cannot be empty.');
      }
    } else {
      this.showErrorMessage('Please log in to comment.');
    }
  }

  deleteComment(comment: Comment) {
    if (this.authService.loggedIn) {
      if (confirm('Are you sure you want to delete this comment?')) {
        this.commentService.deleteComment(comment.id).subscribe(
          () => {
            this.comments = this.comments.filter((c) => c.id !== comment.id);
          },
          (error) => {
            console.error('Error deleting comment:', error);
          }
        );
      }
    } else {
      this.showErrorMessage('Please log in to delete a comment.');
    }
  }

  editComment(commentId: number): void {
    const comment = this.comments.find((c) => c.id === commentId);
    if (comment) {
        this.editingCommentId = commentId;
        this.editCommentForm.controls['content'].setValue(comment.content);
    }
}


  cancelEdit(): void {
    this.editingCommentId = null;
    this.editCommentForm.reset();
  }

  updateComment(commentId: number): void {
    const content = this.editCommentForm.value.content;
    if (!content.trim()) {
      // Handle empty content
      return;
    }

    this.commentService.updateComment(commentId, content).subscribe(() => {
      // Update the comment locally
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.content = content;
      }

      // Clear the edit form
      this.cancelEdit();
    });
  }
  
  get contentControl(): FormControl {
    return this.editCommentForm.get('content') as FormControl;
  }
  
  showSuccessMessage(message='Your comment has been successfully added.') {
    Swal.fire({
      icon: 'success',
      title: 'Comment Added',
      text: message,
    });
  }
  
  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
}



interface Comment {
  id: number;
  userName: string;
  content: string;
}
