#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Publishing ByteAuth NextJS to npm${NC}"
echo -e "${YELLOW}===============================${NC}"

# Step 1: Install dependencies
echo -e "${GREEN}Step 1: Installing dependencies...${NC}"
npm install

# Step 2: Run linting
echo -e "${GREEN}Step 2: Running linting...${NC}"
npm run lint

# Step 3: Run build
echo -e "${GREEN}Step 3: Building package...${NC}"
npm run build

# Step 4: Pack the package for testing
echo -e "${GREEN}Step 4: Creating package tarball (dry-run)...${NC}"
npm pack --dry-run

echo -e "${YELLOW}===============================${NC}"
echo -e "${GREEN}Package preparation complete!${NC}"
echo -e "${YELLOW}To publish, run the following commands:${NC}"
echo -e "${YELLOW}1. npm login${NC}"
echo -e "${YELLOW}2. npm publish --access public${NC}"
echo -e "${YELLOW}===============================${NC}"