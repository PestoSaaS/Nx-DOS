export function YouTube(props: { [prop: string]: unknown }): JSX.Element {
  return (
    <iframe
      {...props}
      title={`${props['video_id']}`}
      src={`https://www.youtube-nocookie.com/embed/${props['video_id']}?modestbranding=1`}
      frameBorder="0"
      style={{
        aspectRatio: 16 / 9,
        marginTop: '1.75rem',
        marginBottom: '1.75rem',
      }}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      loading="lazy"
      data-testid="embeddedYouTube--video"
    />
  );
}
