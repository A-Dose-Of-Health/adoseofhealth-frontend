import { NHSSection, WomensHealthTopic } from "@/lib/api/nhs/types";
import { getWomensHealthTopic } from "@/lib/api/nhs/womensHealth";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function WomensHealthTopicPage({ params }: PageProps) {
  const data: WomensHealthTopic = await getWomensHealthTopic(params.slug);

  return (
    <main className="p-6 max-w-3xl">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="mt-2 text-gray-600">{data.description}</p>

      <div className="mt-6 space-y-6">
        {data.hasPart?.map((section: NHSSection, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{section.name}</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
            {section.hasPart?.map((sub, j) => (
              <div key={j} className="pl-4 border-l ml-2 mt-2">
                <h3 className="font-medium">{sub.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: sub.description }} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
