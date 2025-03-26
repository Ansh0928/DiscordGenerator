'use client';

import { useState } from 'react';
import { Button, Tooltip, Textarea, Container, Title, Text, Group } from '@mantine/core';
import styles from './DiscordTextGenerator.module.css';

const ansiClasses: Record<number, string> = {
  30: 'gray',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'pink',
  36: 'teal',
  37: 'white',
};


export default function DiscordTextGenerator(...args: []) {
  const [text, setText] = useState('Welcome to Discord Colored Text Generator!');
  const [copyCount, setCopyCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const copyToClipboard = () => {
    const formattedText = `\`\`\`ansi\n${text}\n\`\`\``;
    navigator.clipboard.writeText(formattedText).then(() => {
      setCopyCount((prev) => prev + 1);
      setTimeout(() => setCopyCount(0), 2000);
    });
  };

  return (
    <Container className={styles.wrapper}>
      <Title order={1} className={styles.centeredTitle}>
        Discord <span className={styles.colored}>Colored</span> Text Generator
      </Title>
      <Text style={{ textAlign: 'center' }}>Write your text and format it using ANSI color codes.</Text>
      <Textarea
        autosize
        minRows={4}
        maxRows={10}
        value={text}
        onChange={handleTextChange}
        className={styles.textarea} />
      <Group align="center" mt="md">
        {Object.entries(ansiClasses).map(([code, color]) => (
          <Tooltip label={color} key={code}>
            <Button
              className={styles[`ansi-${code}`] || ''}
              onClick={() => setText((prev) => `\x1b[${code}m${prev}\x1b[0m`)}
            >
              {color}
            </Button>
          </Tooltip>
        ))}
      </Group>

      <Button fullWidth mt="md" onClick={copyToClipboard}>
        {copyCount > 0 ? `Copied! (${copyCount})` : 'Copy Text'}
      </Button>
    </Container>
  );
}
function setText(arg0: (prev: any) => string): void {
  throw new Error('Function not implemented.');
}

