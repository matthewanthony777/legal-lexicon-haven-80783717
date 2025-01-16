# Content Directory

This directory contains all the content for the movie blog.

## Structure

- `/articles`: Contains all MDX files for blog articles

## Media Files

Images and videos for articles should be placed in the `/public` folder. You can then reference them in your MDX files using absolute paths:

- Images: `![Alt text](/image-name.jpg)`
- Videos: `<video src="/video-name.mp4" controls></video>`

For example, if you have an image named `inception-poster.jpg` in the public folder, reference it in your MDX as:
`![Inception Movie Poster](/inception-poster.jpg)`