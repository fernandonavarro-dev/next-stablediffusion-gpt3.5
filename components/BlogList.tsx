import Image from 'next/image';
import urlFor from '../lib/urlFor';

type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-orange-400 mb-10" />

      <div>
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col group cursor-pointer">
            <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
              <Image
                className="object-cover object-left lg:object-center"
                src={post.imageUrl}
                alt={post.author.name}
                width={600}
                height={1000}
              />
              <h2>{post.author.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
