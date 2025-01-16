interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden my-4">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default YouTubeEmbed;