import boxen from 'boxen';
import chalk from 'chalk';

const generatePrompts = () => {
  const welcome = () => {
    const greetingBox = boxen(
      'Welcome to Rhymeo! \n\nType -q at any time to quit. ',
      {
        padding: 1,
        margin: 1,
        backgroundColor: 'magenta',
        borderColor: 'green',
        borderStyle: 'round',
        title: 'Rhymeo CLI',
        textAlignment: 'center',
      }
    );
    console.log(greetingBox);
  };

  const basic = () => {
    return 'What word would you like to rhyme? ';
  };

  const retry = () => {
    return 'Sorry, but you have to choose a word -- try again: ';
  };

  const found = ({ word, rhyme }: { word: string; rhyme: string }) => {
    console.log(
      `Found ${chalk.blue(rhyme)} as a word that rhymes with ${chalk.green(
        word
      )}!`
    );
  };

  const notFound = ({ word }: { word: string }) => {
    console.log(`Sorry! No words could be found that rhymes with ${word}.`);
  };

  return {
    welcome,
    basic,
    retry,
    found,
    notFound,
  };
};

export default generatePrompts();
