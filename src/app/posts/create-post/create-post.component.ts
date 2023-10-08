import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../posts.service'; // Import the PostService

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'], // Include your component's CSS file
})
export class CreatePostComponent implements OnInit {
  post: Post = new Post(); // Initialize an empty Post object

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if there is a post ID in the route parameters (for editing)
    const postId = this.route.snapshot.params['id'];
    if (postId) {
      // Load the post details for editing
      this.loadPostDetails(postId);
    }
  }

  loadPostDetails(postId: number): void {
    // Use the PostService to fetch post details by ID
    this.postService.getPostById(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (error: any) => {
        console.error('Error loading post details:', error);
      }
    );
  }

  submitForm(): void {
    if (this.post.id) {
      // If the post has an ID, it's an edit operation
      this.postService.updatePost(this.post.id, this.post).subscribe(
        () => {
          console.log('Post updated successfully');
          this.router.navigate(['/posts']); // Redirect to the posts list after editing
        },
        (error: any) => {
          console.error('Error updating post:', error);
        }
      );
    } else {
      // If the post doesn't have an ID, it's a create operation
      this.postService.createPost(this.post).subscribe(
        () => {
          console.log('Post created successfully');
          this.router.navigate(['/posts']); // Redirect to the posts list after creation
        },
        (error: any) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }
}

class Post {
  id: number;
  title: string;
  content: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.content = '';
  }
}