const ALBUM_URL =
  "https://photos.google.com/share/AF1QipPjx5HIBEXt6MLxFSM__b9NtLDZcF8mV6GqWiht1TXpapw2BYDtrpF-oynqavEXYA?key=YmxzaDBLaUYzWmotY3A3SUlrQUdwbXUyOXNrUEN3";

export default async () => {
  try {
    const response = await fetch(ALBUM_URL, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const html = await response.text();

    if (!response.ok) {
      return Response.json(
        {
          error: "Google Photos request failed",
          status: response.status,
          finalUrl: response.url,
        },
        { status: 502 },
      );
    }

    // Normalize escaped URLs in Google's HTML.
    const cleanHtml = html
      .replace(/\\u003d/g, "=")
      .replace(/\\u0026/g, "&")
      .replace(/\\\//g, "/");

    // Extract Google Photos image URLs.
    const regex =
      /https?:\/\/lh3\.googleusercontent\.com\/(?:pw\/|d\/)?[A-Za-z0-9_-]{30,}/g;

    const matches = cleanHtml.match(regex) || [];

    const photos = [...new Set(matches)]
      .filter((url) => {
        if (url.includes("/a/") || url.includes("/a-/")) return false;

        // Exclude URLs that explicitly identify video media.
        if (/video|videoplayback|\.mp4|\.mov|\.webm/i.test(url)) return false;

        return true;
      })
      .map((url) => `${url}=w2048-h2048-no`);

    return Response.json({
      success: photos.length > 0,
      count: photos.length,
      photos,
      diagnostic: {
        upstreamStatus: response.status,
        finalUrl: response.url,
        htmlLength: html.length,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
        success: false,
      },
      { status: 500 },
    );
  }
};
