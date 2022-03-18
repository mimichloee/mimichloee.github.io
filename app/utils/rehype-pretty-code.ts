import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import minDarkTheme from 'shiki/themes/min-dark.json';

async function configureRehypePrettyCode(): Promise<
  [typeof rehypePrettyCode, Partial<Options>]
> {
  return [
    rehypePrettyCode,
    {
      theme: minDarkTheme as any,
    },
  ];
}

export default configureRehypePrettyCode;
