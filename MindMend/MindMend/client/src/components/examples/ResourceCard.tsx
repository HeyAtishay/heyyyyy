import ResourceCard from '../ResourceCard';

export default function ResourceCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <ResourceCard
        title="Managing Academic Stress"
        description="Learn effective strategies to handle academic pressure and maintain healthy study habits."
        type="article"
        category="Stress Management"
        readTime="5 min read"
        url="#"
      />
      <ResourceCard
        title="Breathing Exercises for Anxiety"
        description="Guided meditation session to help reduce anxiety and promote relaxation."
        type="audio"
        category="Mindfulness"
        readTime="10 min"
        url="#"
      />
      <ResourceCard
        title="Understanding Depression"
        description="Educational video covering the signs, symptoms, and treatment options for depression."
        type="video"
        category="Education"
        readTime="15 min"
        url="#"
      />
    </div>
  );
}