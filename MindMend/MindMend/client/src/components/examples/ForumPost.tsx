import ForumPost from '../ForumPost';

export default function ForumPostExample() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <ForumPost
        id="1"
        title="Struggling with exam anxiety - any tips?"
        content="Hi everyone, I have finals coming up and I'm feeling really overwhelmed. The anxiety is making it hard to focus on studying. Has anyone found strategies that really help with test anxiety?"
        author="Sarah M."
        authorInitials="SM"
        category="Academic Stress"
        timestamp="2 hours ago"
        likes={12}
        replies={8}
      />
      <ForumPost
        id="2"
        title="Thank you to this community"
        content="I just wanted to say how grateful I am for this space. Going through a tough time with depression and having supportive people here makes such a difference."
        author="Anonymous"
        authorInitials="A"
        category="Support"
        timestamp="1 day ago"
        likes={24}
        replies={15}
        isAnonymous={true}
      />
    </div>
  );
}