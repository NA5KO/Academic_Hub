import { Component } from '@angular/core';
import { CommunitiesService } from 'src/services/communities.service';

@Component({
  selector: 'app-top-communities',
  templateUrl: './top-communities.component.html',
  styleUrls: ['./top-communities.component.css']
})
export class TopCommunitiesComponent {
  
  constructor(private communityService: CommunitiesService) {}

  topCommunities: any[] = [];
  // topCommunities = [
  //   { id: 1, name: 'MachineLearning', description: 'Discuss the latest advancements in AI.', memberCount: 65000000 },
  //   { id: 2, name: 'DataScience', description: 'Explore the world of data analysis and visualization.', memberCount: 50000000 },
  //   { id: 3, name: 'WebDevelopment', description: 'Learn to build amazing websites and applications.', memberCount: 45000000 },
  //   { id: 4, name: 'SoftwareEngineering', description: 'Discuss software development best practices and technologies.', memberCount: 40000000 },
  //   { id: 5, name: 'Cybersecurity', description: 'Stay informed about the latest cyber threats and security measures.', memberCount: 35000000 },
  //   { id: 6, name: 'ArtificialIntelligence', description: 'Explore the cutting edge of AI research and development.', memberCount: 30000000 },
  //   { id: 7, name: 'DevOps', description: 'Learn about automation and continuous delivery in software development.', memberCount: 25000000 },
  //   { id: 8, name: 'CloudComputing', description: 'Discuss cloud technologies like AWS, Azure, and GCP.', memberCount: 20000000 },
  //   { id: 9, name: 'Blockchain', description: 'Explore the world of blockchain technology and cryptocurrencies.', memberCount: 15000000 },
  //   { id: 10, name: 'UXDesign', description: 'Discuss user experience design principles and best practices.', memberCount: 10000000 },
  //   { id: 11, name: 'GameDevelopment', description: 'Learn about game development technologies and share your creations.', memberCount: 8000000 },
  //   { id: 12, name: 'IoT', description: 'Discuss the Internet of Things and its applications.', memberCount: 5000000 }
  // ];

  getCommunityLink(name: string): string {
    // Replace with the actual URL for your community pages
    return `http://localhost:4200/community/${name}`; 
  }

  ngOnInit(): void {
    this.communityService.getTopCommunities().subscribe((data) => {
      console.log(data);
      this.topCommunities = data;
    });
  }
}
