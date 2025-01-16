# Articles Directory

This directory contains all MDX files for the movie blog articles. Each article should be written in MDX format with the proper frontmatter metadata.

## File Structure

Each article should be in its own `.mdx` file with a clear, URL-friendly filename (e.g., `inception-movie-review.mdx`).

## Metadata Structure

Each article should include the following frontmatter:

```mdx
---
title: Article Title
date: YYYY-MM-DD
author: Author Name
description: Brief description of the article
slug: url-friendly-slug
tags: [tag1, tag2]
imageUrl: (optional) URL to header image
---

Article content goes here...
```

## Including Media

### Images
You can include images in your articles using standard Markdown syntax:
```md
![Alt text](/image-name.jpg)
```

### Videos
For videos, use the HTML video tag:
```html
<video src="/video-name.mp4" controls width="100%"></video>
```

All media files should be placed in the `/public` folder at the project root. Reference them using absolute paths starting with `/`.