export interface Skill {
  name: string;
  proficiency: string;
  percentage: number;
  color: string;
}

export interface CategorizedSkills {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  tools: Skill[];
}
