type GenerativeModel = {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
};

export const getGenerativeModel = async (
  question: string,
  htmlContext: string
) => {
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, htmlContext }),
  });

  return response.json() as Promise<GenerativeModel>;
};

export const getGenerativeModelStream = async (
  question: string,
  htmlContext: string
): Promise<any> => {
  const response = await fetch("http://localhost:3000/here/tips-stream", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, htmlContext }),
  });

  if (response.ok && response.body) {
    return response.body.getReader();
  }
};
