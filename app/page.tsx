import { client } from "../libs/microcms";

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

export default async function Home() {
  const data = await client.getList<News>({ endpoint: "news" });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white">
      <h1 className="text-4xl font-bold text-blue-600 mb-12">
        有限会社コウユウ社
      </h1>

      <section className="w-full max-w-2xl bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
          最新のお知らせ
        </h2>
        
        <ul className="space-y-6">
          {data.contents.map((news) => (
            <li key={news.id} className="pb-6 border-b border-gray-200 border-dashed last:border-0 last:pb-0">
              <div className="text-sm text-gray-500 mb-2">
                {new Date(news.publishedAt).toLocaleDateString('ja-JP')}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {news.title}
              </h3>
              <div
                className="prose prose-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
