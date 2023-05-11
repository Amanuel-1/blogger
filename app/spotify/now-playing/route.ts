import { log } from "next-axiom";
import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const runtime = "edge";
export const revalidate = 60;

export const GET = async () => {
  const response = await getNowPlaying();

  log.debug("response", response);

  if (
    !response ||
    response.status === 204 ||
    response.status > 400 ||
    !response.data
  ) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = response.data;

  // Don't show song if it is paused
  if (song.is_playing === false) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const name = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImage = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return NextResponse.json({
    isPlaying,
    name,
    artist,
    album,
    albumImage,
    songUrl,
  });
};
