#!/bin/bash

echo "Updating LoveIt theme..."

# Navigate to theme directory
cd themes/LoveIt || exit

# Fetch latest changes
git fetch origin

# Get current version
CURRENT_VERSION=$(git rev-parse HEAD)

# Pull latest changes
git pull origin master

# Get new version
NEW_VERSION=$(git rev-parse HEAD)

# Navigate back to project root
cd ../..

if [ "$CURRENT_VERSION" != "$NEW_VERSION" ]; then
    echo "Theme updated from ${CURRENT_VERSION:0:7} to ${NEW_VERSION:0:7}"
    
    # Add and commit the changes
    git add themes/LoveIt
    git commit -m "chore: update LoveIt theme to ${NEW_VERSION:0:7}"
    
    # Push changes
    git push origin master
    
    echo "Changes pushed to repository"
else
    echo "Theme is already up to date"
fi

# Run Hugo to verify everything works
hugo server