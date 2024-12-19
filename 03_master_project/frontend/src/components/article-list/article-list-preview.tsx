"use client";

import { ArticleData } from "@/app/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TipTapViewer } from "../tiptap/tiptap-viewer";
import { Input } from "../ui/input";

interface ArticleListPreviewProps {
  articles: ArticleData[];
}

export const ArticleListPreview = ({ articles }: ArticleListPreviewProps) => {
  const [articleList, setArticleList] = useState<ArticleData[]>(articles);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  // Debounce effect: update the debounced term after 300ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay in milliseconds

    return () => {
      clearTimeout(handler); // Cleanup timeout on every keystroke
    };
  }, [searchTerm]);

  // Fetch articles based on the debounced search term
  useEffect(() => {
    const searchArticles = async (term: string) => {
      const response = await fetch(`http://127.0.0.1:8000/api/articles?title=${term}`);

      if (!response.ok) {
        console.error("Failed to fetch articles:", response.status);
        return;
      }

      const data = await response.json();
      setArticleList(data);
    };

    if (debouncedSearchTerm || searchTerm === "") {
      searchArticles(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchTerm]);

  return (
    <>
      <Input
        placeholder='Search articles'
        className='mb-6'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {articleList.map((article: ArticleData) => (
        // here we use the Link Component from next.js
        // to enable routing whenever we click on an article
        <Link key={article.id} href={`/article/${article.id}`} className='w-full'>
          <Card>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <TipTapViewer content={article.content} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};
