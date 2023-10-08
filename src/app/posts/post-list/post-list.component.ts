import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = []; // Ideally, you'd have a type for this like PostModel[]

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getAllPosts().subscribe(
      (data: any) => {
        this.posts = data.data;
      },
      (error: any) => {
        console.error("Error fetching posts:", error);
      }
    );
  }

  goToPostDetail(id: number): void {
    this.router.navigate(['/posts', id]);
  }
}
