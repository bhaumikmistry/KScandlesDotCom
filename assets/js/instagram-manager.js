// Instagram Posts Manager for KS Candles
// Handles manual Instagram post configuration with rotation

class InstagramManager {
  constructor() {
    // Embed the configuration directly to avoid CORS issues
    this.config = {
      posts: [
        {
          id: "reel-1",
          url: "https://www.instagram.com/_kscandles_/reel/DO06_vvCGMt/",
          imageUrl: "assets/images/instagram/1.png",
          caption: "Candle making process - from wax to wonder ✨",
          hashtags: ["#kscandles", "#candlemaking", "#artisan"],
          likes: 278,
          comments: 31,
          date: "2024-01-20",
          type: "reel",
        },
        {
          id: "reel-2",
          url: "https://www.instagram.com/_kscandles_/reel/DOoB9f0E8yT/",
          imageUrl: "assets/images/instagram/2.png",
          caption: "KS Candles Reel - Beautiful candle moments ✨",
          hashtags: ["#kscandles", "#reels", "#candlevibes"],
          likes: 245,
          comments: 18,
          date: "2024-01-19",
          type: "reel",
        },
        {
          id: "reel-3",
          url: "https://www.instagram.com/_kscandles_/reel/DOyVeeVCCI9/",
          imageUrl: "assets/images/instagram/3.png",
          caption: "The perfect candle for every mood 💫",
          hashtags: ["#kscandles", "#moodlighting", "#ambiance"],
          likes: 312,
          comments: 15,
          date: "2024-01-18",
          type: "reel",
        },
        {
          id: "reel-4",
          url: "https://www.instagram.com/_kscandles_/reel/DObJzNLCA3i/",
          imageUrl: "assets/images/instagram/4.png",
          caption: "Behind the scenes candle magic ✨",
          hashtags: ["#kscandles", "#behindthescenes", "#candlemaking"],
          likes: 189,
          comments: 12,
          date: "2024-01-17",
          type: "reel",
        },
        {
          id: "reel-5",
          url: "https://www.instagram.com/_kscandles_/reel/DOqmYzmk5hb/",
          imageUrl: "assets/images/instagram/5.png",
          caption: "Cozy vibes with KS Candles 🕯️",
          hashtags: ["#kscandles", "#cozyvibes", "#homedecor"],
          likes: 267,
          comments: 18,
          date: "2024-01-16",
          type: "reel",
        },
        {
          id: "reel-6",
          url: "https://www.instagram.com/_kscandles_/reel/DOvvjs0iHWV/",
          imageUrl: "assets/images/instagram/6.png",
          caption: "Handcrafted with love and care 💝",
          hashtags: ["#kscandles", "#handcrafted", "#artisan"],
          likes: 198,
          comments: 9,
          date: "2024-01-15",
          type: "reel",
        },
      ],
      settings: {
        rotationEnabled: false,
        rotationInterval: 24,
        rotationIntervalUnit: "hours",
        fallbackToStatic: true,
        maxPosts: 6,
        shuffleOnLoad: false,
      },
    };

    this.posts = this.config.posts || [];
    this.settings = this.config.settings || {};
    this.currentRotation = 0;
    this.fallbackImages = [
      "assets/images/instagram/1.png",
      "assets/images/instagram/2.png",
      "assets/images/instagram/3.png",
      "assets/images/instagram/4.png",
      "assets/images/instagram/5.png",
      "assets/images/instagram/6.png",
    ];
  }

  loadConfig() {
    // Configuration is now embedded directly in the class
    console.log(
      `Loaded ${this.posts.length} Instagram posts from embedded config`
    );
    return true;
  }

  createFallbackPosts() {
    this.posts = this.fallbackImages.map((image, index) => ({
      id: `fallback-${index}`,
      url: "https://instagram.com/_kscandles_",
      imageUrl: image,
      caption: `Beautiful candle styling inspiration ${index + 1}`,
      hashtags: ["#kscandles", "#handpoured", "#soycandles"],
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 20) + 1,
      date: new Date().toISOString().split("T")[0],
    }));
  }

  getRotatedPosts(count = 6) {
    if (this.posts.length === 0) return [];

    // Always return posts in order, no rotation
    return this.posts.slice(0, count);
  }

  rotateSelection() {
    this.currentRotation = (this.currentRotation + 1) % this.posts.length;
    localStorage.setItem(
      "instagram_rotation_offset",
      this.currentRotation.toString()
    );
    console.log(`Instagram posts rotated to offset: ${this.currentRotation}`);
  }

  getRotationIntervalMs() {
    const interval = this.settings.rotationInterval || 24;
    const unit = this.settings.rotationIntervalUnit || "hours";

    switch (unit) {
      case "minutes":
        return interval * 60 * 1000;
      case "hours":
        return interval * 60 * 60 * 1000;
      case "days":
        return interval * 24 * 60 * 60 * 1000;
      default:
        return 24 * 60 * 60 * 1000; // 24 hours default
    }
  }

  renderToGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }

    // Load configuration (now embedded)
    this.loadConfig();

    // Get posts to display
    const postsToShow = this.getRotatedPosts(this.settings.maxPosts || 6);

    if (this.settings.shuffleOnLoad) {
      this.shuffleArray(postsToShow);
    }

    // Render posts
    container.innerHTML = this.getPostsHTML(postsToShow);
    this.addClickHandlers();
    this.addImageLoadHandlers();
  }

  getLoadingHTML() {
    return `
            <div class="instagram__loading">
                <div class="loading-spinner"></div>
                <p>Loading Instagram posts...</p>
            </div>
        `;
  }

  getPostsHTML(posts) {
    console.log("Rendering posts:", posts);
    return posts
      .map(
        (post) => `
            <div class="instagram__post ${
              post.type === "reel" ? "instagram__post--reel" : ""
            }" data-url="${post.url}" data-id="${post.id}">
                <img src="${post.imageUrl}" 
                     alt="${post.caption}" 
                     class="instagram__img"
                     onerror="this.src='${this.getFallbackImage(post.id)}'">
                <div class="instagram__overlay">
                    ${
                      post.type === "reel"
                        ? '<div class="reel__indicator">📹 REEL</div>'
                        : ""
                    }
                    <div class="instagram__stats">
                        <span class="likes">❤️ ${post.likes}</span>
                        <span class="comments">💬 ${post.comments}</span>
                    </div>
                    <svg class="instagram__icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
                        <path d="M16 11.37C16 14.24 13.24 16 10.37 16H10C7.13 16 5.37 14.24 5.37 11.37V11C5.37 8.13 7.13 6.37 10 6.37H10.37C13.24 6.37 16 8.13 16 11V11.37Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M17.5 6.5H17.51" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        `
      )
      .join("");
  }

  getFallbackImage(postId) {
    const index = parseInt(postId.replace(/\D/g, "")) || 0;
    return this.fallbackImages[index % this.fallbackImages.length];
  }

  addClickHandlers() {
    const posts = document.querySelectorAll(".instagram__post");
    console.log(`Adding click handlers to ${posts.length} posts`);
    posts.forEach((post) => {
      post.addEventListener("click", (e) => {
        e.preventDefault();
        const url = post.dataset.url;
        console.log("Clicked post with URL:", url);
        if (url) {
          window.open(url, "_blank");
        } else {
          console.error("No URL found for post:", post);
        }
      });
    });
  }

  addImageLoadHandlers() {
    const images = document.querySelectorAll(".instagram__img");
    images.forEach((img) => {
      img.addEventListener("load", function () {
        this.parentElement.classList.add("loaded");
      });
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Manual methods for updating posts
  addPost(post) {
    this.posts.unshift(post); // Add to beginning
    this.saveConfig();
  }

  removePost(postId) {
    this.posts = this.posts.filter((post) => post.id !== postId);
    this.saveConfig();
  }

  updatePost(postId, updates) {
    const index = this.posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updates };
      this.saveConfig();
    }
  }

  async saveConfig() {
    // In a real implementation, this would save to your backend
    // For now, we'll just log the updated config
    console.log("Updated Instagram config:", {
      posts: this.posts,
      settings: this.settings,
    });
  }
}

// Export for use in other files
if (typeof window !== "undefined") {
  window.InstagramManager = InstagramManager;
}
