import { IInstrumentOption } from "../components/library/SelectionPanel/SelectionPanel";

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

async function getSampleNames(): Promise<IInstrumentOption[]> {
  const sampleNames = await fetch(`${BASE_URL}/samples`).then((res) => {
    console.log(res);
    return res.json();
  });
  return sampleNames;
}

export { getSampleNames };
