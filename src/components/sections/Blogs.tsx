import React from "react";
import { Calendar, ArrowUpRight, Heart } from "lucide-react";

interface BlogPost {
  title: string;
  date: string;
  claps: number;
  tags: string[];
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title:
      "Build & Deploy Next.js apps ke personal GitHub Pages menggunakan GitHub Action",
    date: "January 2025",
    claps: 0,
    tags: ["Next.js", "GitHub Pages"],
    link: "https://medium.com/@zurravie/build-deploy-next-js-apps-ke-personal-github-pages-menggunakaan-github-action-45ffd165dd00",
  },
];

const ClapMeter = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Heart className="size-3.5" />
      <span className="text-[0.85rem] font-medium">{count}</span>
    </div>
  );
};

const BlogItem = ({ post, isLast }: { post: BlogPost; isLast: boolean }) => {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block py-4 lg:py-5 transition-all duration-300 ${!isLast ? "dashed-border-bottom" : ""}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1rem] font-bold text-title group-hover:text-foreground transition-colors duration-300 leading-snug">
            {post.title}
          </h3>
          <ArrowUpRight className="size-5 text-muted-foreground/70 group-hover:text-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 text-muted-foreground text-[0.85rem]">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span className="font-medium">{post.date}</span>
            </div>
            <ClapMeter count={post.claps} />
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-transparent border border-muted-foreground/30 text-muted-foreground text-[0.75rem] font-medium rounded-[6px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

const BlogsSection = () => {
  return (
    <section className="relative z-50 bg-background">
      <div className="dashed-separator"></div>
      <div className="relative p-3">
        <h2 className="text-lg font-semibold text-title select-none">
          Compound wins.
        </h2>
      </div>
      <div className="dashed-separator"></div>
      <div className="relative px-4 md:px-5">
        <div className="flex flex-col">
          {blogPosts.map((post, index) => (
            <BlogItem
              key={index}
              post={post}
              isLast={index === blogPosts.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="dashed-separator"></div>
      <div className="relative p-3">
        <div className="flex justify-center py-2">
          <a
            href="https://medium.com/@zurravie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#404040] hover:bg-[#262626] text-white text-[13px] font-medium rounded-[9px] transition-colors duration-300 group"
          >
            View All
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
      <div className="dashed-separator"></div>
    </section>
  );
};

export default BlogsSection;
