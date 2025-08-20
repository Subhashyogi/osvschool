import React, { useState, useEffect } from "react";

// NOTE: In a real app, the API token should be on a backend/serverless function
// to keep it secure, not exposed in the frontend code.
const INSTA_TOKEN = "YOUR_LONG_LIVED_ACCESS_TOKEN";
const API_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTA_TOKEN}`;

const InstagramFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // This fetch logic would be in a real implementation
    // For now, we can use dummy data matching the structure
    // fetch(API_URL).then(res => res.json()).then(data => setFeed(data.data.slice(0, 6)));

    // Using dummy data for display purposes:
    const dummyFeed = [
      {
        media_url:
          "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400",
        permalink: "#",
      },
      {
        media_url:
          "https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=400",
        permalink: "#",
      },
      {
        media_url:
          "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400",
        permalink: "#",
      },
      // ... more posts
    ];
    setFeed(dummyFeed.slice(0, 6)); // Show latest 6 posts
  }, []);

  return (
    <section className="py-24 bg-brand-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          Follow Our Journey on Instagram
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {feed.map((post, index) => (
            <a
              key={index}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full aspect-square overflow-hidden"
            >
              <img
                src={post.media_url}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
