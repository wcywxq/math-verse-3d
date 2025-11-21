import { GoogleGenAI, Type } from "@google/genai";
import { ProblemData, SceneType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const problemSchema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      enum: [SceneType.MOVEMENT, SceneType.GEOMETRY],
      description: "The category of the math problem.",
    },
    title: { type: Type.STRING, description: "A short title for the problem." },
    question: { type: Type.STRING, description: "The full text of the math word problem." },
    analysis: { type: Type.STRING, description: "A brief analysis of the core logic." },
    solutionSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step calculation process.",
    },
    answer: { type: Type.STRING, description: "The final numeric answer." },
    movementParams: {
      type: Type.OBJECT,
      nullable: true,
      description: "Required only if type is MOVEMENT.",
      properties: {
        objectAName: { type: Type.STRING, description: "e.g., 甲车, 兔子" },
        objectBName: { type: Type.STRING, description: "e.g., 乙车, 乌龟" },
        speedA: { type: Type.NUMBER, description: "Speed of object A" },
        speedB: { type: Type.NUMBER, description: "Speed of object B" },
        initialDistance: { type: Type.NUMBER, description: "Start distance between them" },
        direction: { type: Type.STRING, enum: ["OPPOSITE", "SAME"] },
        totalTime: { type: Type.NUMBER, description: "Simulation duration sufficient to show the event" },
        meetingTime: { type: Type.NUMBER, description: "The time when they meet or catch up" }
      },
      required: ["objectAName", "objectBName", "speedA", "speedB", "initialDistance", "direction", "totalTime"]
    },
    geometryParams: {
      type: Type.OBJECT,
      nullable: true,
      description: "Required only if type is GEOMETRY.",
      properties: {
        shape: { type: Type.STRING, enum: ["CUBE", "CYLINDER", "SPHERE"] },
        dimensionA: { type: Type.NUMBER, description: "Primary dimension (side, radius)" },
        dimensionB: { type: Type.NUMBER, description: "Secondary dimension (height), optional for Sphere/Cube" },
        label: { type: Type.STRING, description: "Label for the object" },
        description: { type: Type.STRING, description: "Visual description" }
      },
      required: ["shape", "dimensionA", "label", "description"]
    }
  },
  required: ["type", "title", "question", "analysis", "solutionSteps", "answer"]
};

export const generateMathProblem = async (topic: string): Promise<ProblemData> => {
  const prompt = `
    Generate a Chinese Civil Service Exam (Gongkao) quantitative reasoning math problem about "${topic}".
    
    If the topic implies movement (speed, distance, time, chasing, meeting), set type to "MOVEMENT" and fill movementParams.
    If the topic implies geometry (volume, surface area, cutting), set type to "GEOMETRY" and fill geometryParams.
    
    For MOVEMENT:
    - Ensure "speedA" and "speedB" are reasonable relative numbers.
    - "initialDistance" should be the gap between them.
    - "direction": 'OPPOSITE' means they move towards each other (meeting). 'SAME' means A chases B.
    - Calculate the exact "meetingTime" for the visualization.
    
    For GEOMETRY:
    - Ensure dimensions correspond to the problem.
    
    The response MUST be valid JSON following the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: problemSchema,
        thinkingConfig: { thinkingBudget: 1024 } // Allow some reasoning for math accuracy
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as ProblemData;
      data.id = Date.now().toString();
      return data;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};