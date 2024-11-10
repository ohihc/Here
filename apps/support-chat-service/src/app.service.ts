import { Injectable } from '@nestjs/common';
import { VertexAI } from '@google-cloud/vertexai';
import { GetHelpDto } from './dto/get-help.dto';

const BaseInstructionParts = [
  {
    text: 'You are a professional finance assistent based in UK. your name is HERE, escpically in loan area',
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
  {
    text: 'Generate the answer in markdown format',
  },
];

const TipInstructionParts = [
  {
    text: 'Split the answer into 2 parts, the first part is a short summary in paragraph stylea and the second part will be the examples and scenarios which like the read more function, split the two parts with *******',
  },
  {
    text: 'the second part should be short and high readability, and also use titles to separate scenarios, factors and examples , to allow vulnerable user easy to read',
  },
];

const SummaryInstructionParts = [
  {
    text: 'the result should be short and clear in points form',
  },
];

@Injectable()
export class AppService {
  private generateModel({ mode }: GetHelpDto) {
    const projectId = process.env.VERTEX_AI_PROJECT_ID;
    const location = process.env.VERTEX_AI_LOCATION;
    const model = process.env.VERTEX_AI_MODEL;

    // Initialize Vertex with your Cloud project and location
    const vertexAI = new VertexAI({
      project: projectId,
      location: location,
    });

    // generate system instruction
    let systemInstructionParts = [...BaseInstructionParts];
    if (mode === 'summary') {
      systemInstructionParts = [
        ...BaseInstructionParts,
        ...SummaryInstructionParts,
      ];
    } else {
      systemInstructionParts = [
        ...BaseInstructionParts,
        ...TipInstructionParts,
      ];
    }

    // Instantiate the model
    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: model,
      systemInstruction: {
        role: 'system',
        parts: systemInstructionParts,
      },
    });

    return generativeModel;
  }

  private generateVertexRequest({ question, htmlContext, mode }: GetHelpDto) {
    const textPart = {
      text:
        mode === 'summary'
          ? `please help to summarise: ${question}`
          : `
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

    return request;
  }

  async getTips(getHelpDto: GetHelpDto) {
    const generativeModel = this.generateModel(getHelpDto);
    const result = await generativeModel.generateContent(
      this.generateVertexRequest(getHelpDto),
    );
    return result.response;
  }

  async getTipsStream(getHelpDto: GetHelpDto) {
    const generativeModel = this.generateModel(getHelpDto);
    return generativeModel.generateContentStream(
      this.generateVertexRequest(getHelpDto),
    );
  }

  async getTipsMocked(_: GetHelpDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          candidates: [
            {
              content: {
                role: 'model',
                parts: [
                  {
                    text: "The monthly repayment amount of £195.24 is a significant financial commitment. It's important to consider how this repayment will fit into your overall budget and how it might affect your everyday spending. \n\n*******\n\n## Scenarios and Factors\n\n### Scenario 1: Impact on Everyday Spending\n\nImagine you currently spend £1,000 per month on essential expenses like food, bills, and transportation. If you add a £195.24 loan repayment, you'll have less money for these essential items each month.  This could mean:\n\n* **Cutting back:** You may need to reduce spending on non-essentials like entertainment, dining out, or clothes.\n* **Prioritizing:** You might need to prioritize certain expenses over others, potentially delaying or canceling other purchases.\n\n### Scenario 2: Impact on Saving\n\nIf you were aiming to save £100 per month, adding a £195.24 loan repayment would make it harder to reach your savings goals. This could mean:\n\n* **Delayed savings:** You might need to postpone reaching a specific savings target.\n* **Reduced savings:** You might have to lower your monthly savings amount to accommodate the loan repayment.\n\n### Factors Affecting Financial Vulnerability\n\n* **Income:** If your income is low or uncertain, a loan repayment could make it difficult to cover essential expenses.\n* **Debt:** If you already have other debt obligations, adding a loan repayment could increase your financial burden and lead to overstretching your budget.\n* **Unexpected expenses:** If you face unexpected costs like medical bills or car repairs, a loan repayment could put additional pressure on your finances. \n",
                  },
                ],
              },
              finishReason: 'STOP',
              safetyRatings: [
                {
                  category: 'HARM_CATEGORY_HATE_SPEECH',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.040283203,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.08154297,
                },
                {
                  category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.11425781,
                  severity: 'HARM_SEVERITY_MEDIUM',
                  severityScore: 0.4375,
                },
                {
                  category: 'HARM_CATEGORY_HARASSMENT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.10498047,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.12158203,
                },
                {
                  category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.11425781,
                  severity: 'HARM_SEVERITY_MEDIUM',
                  severityScore: 0.5859375,
                },
              ],
              avgLogprobs: -0.49043985706029064,
              index: 0,
            },
          ],
          usageMetadata: {
            promptTokenCount: 31458,
            candidatesTokenCount: 343,
            totalTokenCount: 31801,
          },
          modelVersion: 'gemini-1.5-flash-001',
        });
      }, 1500);
    });
  }
}
