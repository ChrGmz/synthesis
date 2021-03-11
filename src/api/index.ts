const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

interface SampleObject {
  [key: string]: File[];
}

async function getSampleNames(): Promise<SampleObject> {
  const sampleNames = await fetch(`${BASE_URL}/samples`).then((res) => {
    console.log(res);
    return res.json();
  });
  return sampleNames;
}

export { getSampleNames };
