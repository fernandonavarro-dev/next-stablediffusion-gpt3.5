import { client } from './sanity.client';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const options = {
  format: 'png',
};

// const builder = new ImageUrlBuilder(client, options);

export default function urlFor(source: any) {
  //   return builder.image(source);
}
