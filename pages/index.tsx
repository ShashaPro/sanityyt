import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Header from '../components/Header'
import { sanityClient, urlFor } from "../sanity";
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({ posts }:Props) {
  console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
       <div className='flex justify-between items-center 
         bg-yellow-400 border-y border-black py-10 lg:py-10'>
        <div className='px-10 space-y-5'>
            <h1 className='text-6xl max-w-xl font-serif'>
                  <span className='underline decoration-orange-500 decoration-4'>
                  Paons  
                  </span>{" "}
                  is a place to write, read and connect
            </h1>
            <h2>
              It's easy and free to post your thinking on any topic and connect 
              with millions of readers.
            </h2>
        </div>
        <img 
          className='hidden md:inline-flex h-32 lg:h-90'
          src="/images/paonsv2_site.svg" 
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group rounded-lg cursor-pointer overflow-hidden'>
              <img 
                className='h-60 w-full object-cover rounded-md group-hover:scale-105
                transition-transform duration-200 ease-in-out'
                src={urlFor(post.mainImage).url()!} alt="" 
              />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-sm'>
                    {post.description} <br/>
                    <span className='text-gray-400'>
                      by {post.author.name}
                    </span>
                  </p>
                </div>

                <img 
                   className='h-12 w-12 rounded-full'
                   src={urlFor(post.author.image).url()!} alt="" 
                />
              </div>
            </div>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = 
    `*[_type == "post"]{
      _id,
       title,
       slug,
       author ->{
       name,
       image
   },
       description,
       mainImage,
       slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
