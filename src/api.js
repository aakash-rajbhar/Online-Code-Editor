import axios from 'axios';
import { LANGUAGE_VERSIONS } from './constants';

const API = axios.create({
  baseURL: 'https://ce.judge0.com/submissions',
});

export const executeCode = async (language, sourceCode, input) => {
  const response = await API.post('?wait=true', {
    language_id: LANGUAGE_VERSIONS[language],
    source_code: sourceCode,
    stdin: input,
  });

  return response.data;
};
