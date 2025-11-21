export enum SceneType {
  MOVEMENT = 'MOVEMENT', // 行程问题
  GEOMETRY = 'GEOMETRY', // 几何问题
  WORK = 'WORK' // 工程问题 (represented as progress bars)
}

export interface MovementParams {
  objectAName: string;
  objectBName: string;
  speedA: number; // Units per second
  speedB: number;
  initialDistance: number; // Distance between them
  direction: 'OPPOSITE' | 'SAME'; // 相向 or 同向
  totalTime: number; // Time to simulate
  meetingTime?: number; // Calculated answer time
}

export interface GeometryParams {
  shape: 'CUBE' | 'CYLINDER' | 'SPHERE';
  dimensionA: number; // radius or length
  dimensionB?: number; // height
  label: string;
  description: string;
}

export interface ProblemData {
  id: string;
  type: SceneType;
  title: string;
  source?: string; // e.g., "2024年国考地市级"
  question: string;
  analysis: string;
  solutionSteps: string[];
  answer: string;
  // Discriminated union for visual parameters
  movementParams?: MovementParams;
  geometryParams?: GeometryParams;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}