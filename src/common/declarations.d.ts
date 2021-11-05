declare const BFF_URL: string;
declare const GA_ID: string;

declare module '*.eot' {
  const eot: string;
  export = eot;
}

declare module '*.css' {
  const css: { [className: string]: string };
  export = css;
}

declare module '*.scss' {
  const scss: { [className: string]: string };
  export default scss;
}

declare module '*.png' {
  const png: string;
  export = png;
}

declare module '*.svg' {
  const svg: string;
  export = svg;
}

declare module '*.ttf' {
  const ttf: string;
  export = ttf;
}

declare module '*.woff' {
  const woff: string;
  export = woff;
}
