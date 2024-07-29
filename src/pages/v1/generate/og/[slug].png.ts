import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';

const fontFile = await fetch(
  'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

const height = 400;
const width = 800;

const posts = await getCollection('blog');

export function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { imgUrl: post.data.imgUrl },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const imgUrl = props.imgUrl.trim() ?? 'Blogpost';
  const html = toReactElement(`
  <div style="
    display: flex;
    height: ${height}px;
    width: ${width}px;
    align-items: center;
    justify-content: center;
    background: white;
    box-sizing: border-box;
  ">
    <img 
      src="${imgUrl}" 
      alt="Dynamic Image" 
      style="
        max-width: 100%; 
        height: auto; 
        border-radius: 8px;
      " 
    />
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
      mode: 'width', // If you need to change the size
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