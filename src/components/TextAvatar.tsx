import { Avatar } from '@mui/material';
import { deepOrange, deepPurple, blue, green, red, pink, indigo, teal, amber, cyan } from '@mui/material/colors';
import { useMemo } from 'react';

const avatarColors = [
  deepOrange[500], deepPurple[500], blue[500],
  green[600], red[500], pink[500],
  indigo[500], teal[500], amber[700], cyan[700]
];

const stringToColor = (string: string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % 10;
  return avatarColors[index];
};

export type LetterAvatarProps = {
  value: string;
}

export default function LetterAvatar({ value }: LetterAvatarProps) {
  const valueToDisplay = useMemo(() => {
    const valueToUppercase = value.toUpperCase();
    const splitBySpace = valueToUppercase.split(' ');
    const first2Words = splitBySpace.slice(0, 2);
    const mergedFirstLetters = first2Words.map(word => word[0]).join('');
    return mergedFirstLetters;
  }, [value])

  const color = stringToColor(valueToDisplay);

  return (
    <Avatar
      sx={{
        bgcolor: color,
        width: 40,
        height: 40
      }}
    >
      {valueToDisplay}
    </Avatar>
  );
}