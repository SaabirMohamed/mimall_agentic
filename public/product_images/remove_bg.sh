
#!/bin/bash

API_KEY="sk_2055a1eee22241dc983c036e45d227fa"
API_URL="https://api.developer.pixelcut.ai/v1/remove-background"
INPUT_DIR="."
OUTPUT_DIR="."

# Loop through all PNG files in the directory
for file in "$INPUT_DIR"/*.png; do
  echo "Processing file: $file"

  # Prepare the curl command
  curl -L "$API_URL" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-API-KEY: $API_KEY" \
    -d "{
      \"image_url\": \"file://$(realpath "$file")\",
      \"format\": \"png\"
    }" -o "$OUTPUT_DIR/$(basename "${file%.png}")_no_bg.png"

  echo "Processed file saved to: $OUTPUT_DIR/$(basename "${file%.png}")_no_bg.png"
done
