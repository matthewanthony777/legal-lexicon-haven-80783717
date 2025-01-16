# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8bfef11f-dd98-4098-ac35-e5e102b19c55

## Writing Content

### MDX File Structure

Each article should be placed in the `content/articles` directory and include the following frontmatter:

```mdx
---
title: "Your Article Title"
description: "Brief description of your article"
date: "2024-03-14"
author: "Your Name"
category: "Article Category"
coverVideo: "/path-to-video.mp4"  # Optional
coverImage: "/path-to-image.jpg"  # Optional
---
```

### Adding Media Content

#### Local Images
For images stored in the `public` folder:
```mdx
![Alt Text](/image-name.jpg)
```

#### External Images
For images from external URLs:
```mdx
![Alt Text](https://example.com/image.jpg)
```

#### YouTube Videos
To embed YouTube videos, use the YouTube component:
```mdx
<YouTube videoId="dQw4w9WgXcQ" />
```
The videoId can be found in the YouTube URL (e.g., youtube.com/watch?v=dQw4w9WgXcQ).

#### Local Videos
For videos stored in the `public` folder:
```mdx
<video src="/video-name.mp4" controls />
```

### Example Article

Here's a complete example of an article using various media types:

```mdx
---
title: "Understanding Cinema"
description: "A deep dive into cinematography"
date: "2024-03-14"
author: "John Doe"
category: "Film Analysis"
coverVideo: "/intro-video.mp4"
---

# Understanding Cinema

An introduction to the art of filmmaking.

![Local Image Example](/cinematography.jpg)

![External Image](https://example.com/film-camera.jpg)

## Behind the Scenes
<YouTube videoId="dQw4w9WgXcQ" />

## On-Set Footage
<video src="/behind-scenes.mp4" controls />
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8bfef11f-dd98-4098-ac35-e5e102b19c55) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8bfef11f-dd98-4098-ac35-e5e102b19c55) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)