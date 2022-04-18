#!/usr/bin/env node
import axios from 'axios';
import readline from 'readline';
import prompts from './prompts.js';
import { promisify } from 'util';

(async () => {
  const url = 'https://api.datamuse.com/words?rel_rhy=';
  const word = 'node';

  const greet = async () => {
    prompts.welcome();
  };

  const askQuestion = async (text = prompts.basic()) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    const question = promisify(rl.question).bind(rl);

    const word: any = await question(text);

    if (!word) askQuestion(prompts.retry());
    else if (word === '-q') rl.close();
    else {
      const { data } = await axios.get(`${url}${word}`);

      if (data.length) {
        const index = Math.floor(Math.random() * (data.length - 1));
        prompts.found({ word, rhyme: data[index].word });
        askQuestion();
      } else {
        prompts.notFound({ word });
        askQuestion();
      }
    }
  };

  await greet();
  await askQuestion();
})();
