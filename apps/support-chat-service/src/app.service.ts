import { Injectable } from '@nestjs/common';
import {
  VertexAI,
  FunctionDeclarationSchemaType,
  FileDataPart,
} from '@google-cloud/vertexai';
import * as fs from 'fs';
import { GetHelpDto } from './dto/get-help.dto';

@Injectable()
export class AppService {
  async getHello({ question, htmlContext }: GetHelpDto) {
    const projectId = 'gemini-hackathon-439210';
    const location = 'europe-west2';
    const model = 'gemini-1.5-flash-001';

    // Initialize Vertex with your Cloud project and location
    const vertexAI = new VertexAI({
      project: projectId,
      location: location,
    });

    // Instantiate the model
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: model,
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'You are a professional finance assistent in UK. your name is HERE, escpically in loan area',
          },
          {
            text: 'Your mission is to help people espically vulnerable users to understand how a loan will impact their live',
          },
          {
            text: 'People are not aware they have vulnerabilities, please do not mention vulnerability in the answer',
          },
          {
            text: 'Provide the anwser in a friendly way, and provide mulitple scenarios to allow user picture the impact',
          },
          {
            text: 'If the qustion is related to a loan, mention the factors which may increase risk of vulnerability to financial harm',
          },
        ],
      },
    });

    const textPart = {
      text: `
      What does ${question} mean to me, referring to the given html content
      `,
    };

    const htmlContentPart = {
      text: htmlContext,
    };

    const request = {
      contents: [
        {
          role: 'user',
          parts: [textPart, htmlContentPart],
        },
      ],
      // tools: functionDeclarations,
    };
    const result = await generativeModel.generateContent(request);
    return result.response;
  }
}
