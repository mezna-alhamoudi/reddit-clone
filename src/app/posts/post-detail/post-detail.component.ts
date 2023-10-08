import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../posts.service'; 
import { CommentComponent } from '../../comment/comment.component'; 

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId: number = 0;
  post: any; // Replace 'any' with your actual type
  newComment: string = ''; // Store the new comment text

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    if (paramMap.has('id')) {
      this.postId = +paramMap.get('id')!;
      // Retrieve the post data and comments
      this.getPostDetails();
    } else {
      // Handle the case when 'id' is not available in the URL
      // You can set a default value or display an error message.
    }
  }

  getPostDetails(): void {
    // Use your PostService to retrieve post details, including comments
    this.postService.getPostById(this.postId).subscribe((result) => {
      this.post = result.data;
      console.log('result', result)
    });
  }

  addComment(): void {
    // if (this.newComment.trim() !== '') {
    //   // Use your PostService to add a new comment
    //   this.postService.addComment(this.postId, this.newComment).subscribe((result) => {
    //     // After adding the comment, refresh the post details to show the updated comments
    //     this.getPostDetails();
    //     // Clear the new comment input
    //     this.newComment = '';
    //   });
    // }
  }
}
