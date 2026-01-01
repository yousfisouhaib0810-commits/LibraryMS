export class CreateProjectDto {
    title: string;
    description: string;
    imageUrl?: string;
    tags?: string[];
    demoUrl?: string;
    githubUrl?: string;
}
