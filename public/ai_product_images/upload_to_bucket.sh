#!/bin/bash

# Enable strict error checking
set -euo pipefail

# Check for jq dependency
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed. Please install jq first."
    exit 1
fi

# Initialize timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "[$TIMESTAMP] Starting upload process"

# Temporary files tracking
declare -a TEMP_FILES=()

# Supabase credentials
SUPABASE_URL="https://ivhkoaubdkutsyxnnrmg.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2aGtvYXViZGt1dHN5eG5ucm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwODU1OTQsImV4cCI6MjA0OTY2MTU5NH0.qKoS9JCbyuqWdCCS5em4Cus8Elhn4rfIyLlFONkxtYk"
BUCKET_ID="uploads"

# Verify bucket permissions
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "[$TIMESTAMP] Verifying bucket permissions..."
BUCKET_CHECK=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/storage/v1/bucket/$BUCKET_ID" \
    -H "Authorization: Bearer $SUPABASE_KEY")
    
if [[ "$BUCKET_CHECK" != "200" ]]; then
    echo "[ERROR] Bucket check failed with status $BUCKET_CHECK"
    echo "Please verify:"
    echo "1. The bucket '$BUCKET_ID' exists"
    echo "2. The API key has proper permissions"
    exit 1
fi

# Configuration
TEXT_FILE="${1:-/path/to/myfile.txt}"  # Allow path as first argument

# Validate text file path
if [[ ! -f "$TEXT_FILE" ]]; then
    echo "Error: Text file not found at $TEXT_FILE"
    exit 1
fi

# Add directory debugging
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -lh
echo "Searching for image files..."

# Find image files in current directory only
find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | while read -r IMAGE_FILE; do
    # Get file name without path
    FILENAME=$(basename "$IMAGE_FILE")
    # Get description from file name (remove extension)
    DESCRIPTION="${FILENAME%.*}"
    
    # Verify file exists
    if [[ ! -f "$IMAGE_FILE" ]]; then
        echo "[ERROR] File not found: $IMAGE_FILE"
        continue
    fi

    # Debug output
    echo "Processing file: $IMAGE_FILE"
    echo "File details:"
    ls -lh "$IMAGE_FILE"
    file "$IMAGE_FILE"
    echo "Filename: $FILENAME"
    echo "Description: $DESCRIPTION"
    
    # Use fixed Content-Type
    CONTENT_TYPE="application/octet-stream"
    echo "Using Content-Type: $CONTENT_TYPE"
    
    # URL encode the filename
    ENCODED_FILENAME=$(echo "$FILENAME" | jq -sRr @uri)
    
    # Upload to Supabase storage with verbose output
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] Uploading to Supabase Storage..."
    echo "Debug - Supabase URL: $SUPABASE_URL/storage/v1/object/$BUCKET_ID/$ENCODED_FILENAME"
    echo "Debug - File size: $(stat -c%s "$IMAGE_FILE") bytes"
    echo "Debug - File content (first 100 bytes): $(head -c 100 "$IMAGE_FILE" | xxd -p)"
    
    UPLOAD_RESPONSE=$(curl --trace-ascii /tmp/curl_trace.log -v -X POST "$SUPABASE_URL/storage/v1/object/$BUCKET_ID/$ENCODED_FILENAME" \
        -H "Authorization: Bearer $SUPABASE_KEY" \
        -H "Content-Type: $CONTENT_TYPE" \
        --data-binary @"$IMAGE_FILE" 2>&1)
        
    if [[ -f /tmp/curl_trace.log ]]; then
        echo "Curl trace output:"
        cat /tmp/curl_trace.log
        rm /tmp/curl_trace.log
    fi
    
    # Verify file was actually uploaded
    CHECK_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SUPABASE_URL/storage/v1/object/info/$BUCKET_ID/$ENCODED_FILENAME" \
        -H "Authorization: Bearer $SUPABASE_KEY")
        
    if [[ "$CHECK_RESPONSE" != "200" ]]; then
        echo "[ERROR] File verification failed with status $CHECK_RESPONSE"
        echo "File does not appear to be in the bucket"
        exit 1
    fi
    
    # Extract HTTP status code
    HTTP_STATUS=$(echo "$UPLOAD_RESPONSE" | grep -oP '(?<=< HTTP/1.1 )\d{3}')
    
    if [[ "$HTTP_STATUS" != "200" ]]; then
        echo "[ERROR] Upload failed with status $HTTP_STATUS"
        echo "Full response:"
        echo "$UPLOAD_RESPONSE"
        echo "Cleaning up temporary files..."
        rm -f "${TEMP_FILES[@]}"
        continue
    fi
    TEMP_FILES+=("$IMAGE_FILE")
    
    # Get public URL
    PUBLIC_URL="$SUPABASE_URL/storage/v1/object/public/$BUCKET_ID/$ENCODED_FILENAME"
    echo "Public URL: $PUBLIC_URL"
    
    # Insert into image_gen table with verbose output
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] Inserting into image_gen table..."
    DB_RESPONSE=$(curl -v -X POST "$SUPABASE_URL/rest/v1/image_gen" \
        -H "apikey: $SUPABASE_KEY" \
        -H "Authorization: Bearer $SUPABASE_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"image_id\": \"$DESCRIPTION\",
            \"key\": \"$PUBLIC_URL\",
            \"description\": \"$DESCRIPTION\"
        }" 2>&1)
    
    # Extract HTTP status code
    DB_HTTP_STATUS=$(echo "$DB_RESPONSE" | grep -oP '(?<=< HTTP/1.1 )\d{3}')
    
    if [[ "$DB_HTTP_STATUS" != "201" ]]; then
        echo "[ERROR] Database insert failed with status $DB_HTTP_STATUS"
        echo "Full response:"
        echo "$DB_RESPONSE"
        echo "Cleaning up uploaded file..."
        curl -X DELETE "$SUPABASE_URL/storage/v1/object/$BUCKET_ID/$ENCODED_FILENAME" \
            -H "Authorization: Bearer $SUPABASE_KEY"
        continue
    fi
    
    echo "Successfully uploaded $IMAGE_FILE as $DESCRIPTION"
    echo "----------------------------------------------"
done

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "[$TIMESTAMP] Upload process completed"

# Process text file separately
if [[ -f "$TEXT_FILE" ]]; then
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] Processing text file: $TEXT_FILE"
    echo "Text file details:"
    ls -lh "$TEXT_FILE"
    file "$TEXT_FILE"
    
    # Get filename and description
    FILENAME=$(basename "$TEXT_FILE")
    DESCRIPTION="${FILENAME%.*}"
    ENCODED_FILENAME=$(echo "$FILENAME" | jq -sRr @uri)
    
    # Upload text file with proper content type
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] Uploading text file to Supabase Storage..."
    UPLOAD_RESPONSE=$(curl -v -X POST "$SUPABASE_URL/storage/v1/object/$BUCKET_ID/$ENCODED_FILENAME" \
        -H "Authorization: Bearer $SUPABASE_KEY" \
        -H "Content-Type: text/plain" \
        --data-binary @"$TEXT_FILE" 2>&1)
    
    # Extract HTTP status code
    HTTP_STATUS=$(echo "$UPLOAD_RESPONSE" | grep -oP '(?<=< HTTP/1.1 )\d{3}')
    
    if [[ "$HTTP_STATUS" != "200" ]]; then
        echo "[ERROR] Text file upload failed with status $HTTP_STATUS"
        echo "Full response:"
        echo "$UPLOAD_RESPONSE"
        exit 1
    fi
    
    # Get public URL
    PUBLIC_URL="$SUPABASE_URL/storage/v1/object/public/$BUCKET_ID/$ENCODED_FILENAME"
    echo "Text file public URL: $PUBLIC_URL"
    
    # Insert into image_gen table
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] Inserting text file metadata into image_gen table..."
    DB_RESPONSE=$(curl -v -X POST "$SUPABASE_URL/rest/v1/image_gen" \
        -H "apikey: $SUPABASE_KEY" \
        -H "Authorization: Bearer $SUPABASE_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"image_id\": \"$DESCRIPTION\",
            \"key\": \"$PUBLIC_URL\",
            \"description\": \"$DESCRIPTION\"
        }" 2>&1)
    
    # Extract HTTP status code
    DB_HTTP_STATUS=$(echo "$DB_RESPONSE" | grep -oP '(?<=< HTTP/1.1 )\d{3}')
    
    if [[ "$DB_HTTP_STATUS" != "201" ]]; then
        echo "[ERROR] Text file database insert failed with status $DB_HTTP_STATUS"
        echo "Full response:"
        echo "$DB_RESPONSE"
        exit 1
    fi
    
    echo "Successfully uploaded text file $TEXT_FILE as $DESCRIPTION"
else
    echo "[WARNING] Text file not found at $TEXT_FILE"
    echo "Current directory contents:"
    ls -lh
fi
