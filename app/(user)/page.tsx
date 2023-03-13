import React from 'react';
// import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import PreviewSuspense from '../../components/PreviewSuspense';
import BlogList from '../../components/BlogList';

type Props = {};

const query = groq`
  *[_type=='post'] {
    ...,
  author->,
  categories[]->
  } | order(_createdAt desc)  
`;

export default async function HomePage({}: Props) {
  // if (previewData()) {
  //   return (
  //     <PreviewSuspense
  //       fallback={
  //         <div role="status">
  //           <p className="text-center text-lg animate-pulse text-orange-400">
  //             Loading Preview Data...
  //           </p>
  //         </div>
  //       }
  //     ></PreviewSuspense>
  //   );
  // }

  const posts = await client.fetch(query);
  console.log(posts);

  return (
    <div>
      <h1>Not in preview mode</h1>
      <BlogList posts={posts} />
    </div>
  );
}
