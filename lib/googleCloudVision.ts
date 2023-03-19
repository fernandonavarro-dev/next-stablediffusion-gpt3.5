async function labelDetection(
  imageBase64: string,
  apiKey: string
): Promise<string[]> {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const body = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  if (response.status !== 200) {
    throw new Error(jsonResponse.error.message);
  }

  const labels = jsonResponse.responses[0].labelAnnotations.map(
    (label: any) => label.description
  );
  return labels;
}

export { labelDetection };
