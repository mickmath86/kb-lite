import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'media-id': string;
        aspect?: string;
        autoplay?: boolean | string;
        muted?: boolean | string;
        playsinline?: boolean | string;
        loop?: boolean | string;
      };
    }
  }
}

export {};
