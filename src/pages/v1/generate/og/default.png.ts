import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';

const fontFile = await fetch(
  'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
);

const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 400;
const width = 800;

export const GET: APIRoute = async () => {
  const html = toReactElement(`
  <div style="
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  letter-spacing: -.02em;
  font-weight: 700;
  background: white;
">
  <div style="
    left: 42px;
    top: 42px;
    position: absolute;
    align-items: center;
  ">
    <span style="
      width: 24px;
      height: 24px;
      background: black;
    "></span>
    <span style="
      display: flex;
      margin-left: 8px;
      font-size: 20px;
    ">gabrielpalhares.dev</span>
  </div>
  <div style="
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 50px;
    margin: 0 42px;
    font-size: 40px;
    width: auto;
    max-width: 550px;
    text-align: center;
    background-color: black;
    color: white;
    line-height: 1.4;
  ">
    Digital.Garden
  </div>
</div>
  `);

  const svg = await satori(html, {
    fonts: [
      {
        name: 'Inter Latin',
        data: fontData,
        style: 'normal',
      },
    ],

    height,
    width,
  });

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width',
      value: width,
    },
  };
  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'content-type': 'image/png',
    },
  });
};