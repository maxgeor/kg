import { sanityClient } from './client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source)
}

export { urlFor };

