type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPage({ params }: PageProps) {

  const {id} = await params;

  return (
    <main className="min-h-screen flex items-center justify-center text-3xl font-bold text-white">
      Viewing Post {id}
    </main>
  );
}
