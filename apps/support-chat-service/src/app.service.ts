import { Injectable } from '@nestjs/common';
import {
  VertexAI,
  FunctionDeclarationSchemaType,
  FileDataPart,
} from '@google-cloud/vertexai';
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
            text: 'Split the answer into 2 parts, the first part is a short summary and the second part will be the examples and scenarios which like the read more function, split the two parts with *******',
          },
          {
            text: 'Generate the answer in markdown format',
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

  async getHelloMocked({ question, htmlContext }: GetHelpDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          candidates: [
            {
              content: {
                role: 'model',
                parts: [
                  {
                    text: "Hi there! \n\nIt looks like you're asking about the monthly repayment of £195.24, which is shown in the example for a £10,000 loan over 60 months.  This means you'd be paying £195.24 each month for the next 5 years. \n\nLet's break it down and explore how this impacts your finances:\n\n********\n\nHere are some scenarios to help you picture what this could mean for you:\n\n* **Scenario 1: Budgeting:**  If you're already tight on money, adding an extra £195.24 per month could make it harder to pay for essentials like groceries, bills, and rent. It's important to make sure you have enough left over each month to cover your needs after your loan payment.\n* **Scenario 2: Unexpected Expenses:** Life throws curveballs! If you have a sudden unexpected expense, like car repairs or a medical bill, having to pay £195.24 each month might make it more difficult to cover those costs.\n* **Scenario 3: Debt Snowball:** This repayment amount adds up!  Over 60 months, you'll pay a total of £11,714.40 back, which is more than the original £10,000 you borrowed. This extra cost is due to the interest charged on the loan. \n* **Scenario 4: Saving for the Future:**  The £195.24 you pay each month could be going towards your savings goals, like a house deposit, a holiday, or your children's education.  This is important to consider, as it could affect how quickly you reach your financial targets.\n\nIt's always best to be cautious and consider all aspects of the loan before taking it out. You should never feel pressured to take out a loan if you're unsure about the impact on your budget. \n\nRemember, **you can always contact a financial advisor** to discuss your specific situation and explore different loan options that best suit your needs.  \n",
                  },
                ],
              },
              finishReason: 'STOP',
              safetyRatings: [
                {
                  category: 'HARM_CATEGORY_HATE_SPEECH',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.053466797,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.099609375,
                },
                {
                  category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.125,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.11767578,
                },
                {
                  category: 'HARM_CATEGORY_HARASSMENT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.095214844,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.048095703,
                },
                {
                  category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                  probability: 'NEGLIGIBLE',
                  probabilityScore: 0.09814453,
                  severity: 'HARM_SEVERITY_NEGLIGIBLE',
                  severityScore: 0.099609375,
                },
              ],
              avgLogprobs: -0.5875591433425834,
              index: 0,
            },
          ],
          usageMetadata: {
            promptTokenCount: 648,
            candidatesTokenCount: 442,
            totalTokenCount: 1090,
          },
          modelVersion: 'gemini-1.5-flash-001',
        });
      }, 1500);
    });
  }
}
