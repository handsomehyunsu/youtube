import React, { useState, useEffect, useCallback } from "react";
import styles from "./app.module.css";
import Video_detail from "./compoenets/video_detail/video_detail";
import VideoList from "./compoenets/video_list/video_list";
import Video_search from "./compoenets/video_search/video_search";

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = useCallback(
    (query) => {
      youtube
        .search(query) //
        .then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
        });
    },
    [youtube]
  );

  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, [youtube]);
  return (
    <div className={styles.app}>
      <Video_search onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <Video_detail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
          ;
        </div>
      </section>
    </div>
  );
}

export default App;
