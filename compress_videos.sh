for file in public/*.mp4; do
    ffmpeg -i "$file" -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k "${file%.mp4}_compressed.mp4"
done
