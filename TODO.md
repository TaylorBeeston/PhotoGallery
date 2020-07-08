# 📝 TODO

---

## 🚀 Features
- [x] Update metatags
- [x] Read EXIF data from photos
- [x] Add option to manually rotate image during upload
- [x] Sort Photos by Date uploaded
- [x] Pagination
- [x] Infinite Scrolling
- [x] Download Buttons
   - [ ] Create API endpoint for photo downloads instead of relying on download attribute
- [ ] HTTPS
- [ ] Better Lighthouse Performance Scores
  - [ ] HTTP/2
  - [ ] Compress build files with brotli
  - [x] Cache-Control header sent with files to S3
- [x] Photos CRUD
- [ ] Users CRUD
- [ ] Better handling of missing environment variables
- [ ] Make Redis optional
- [x] Thumbnails
- [ ] Lazy loading
- [ ] Touch Events
   - [ ] Swipe left/right in lightbox
   - [ ] Pinch to zoom in/out
- [ ] Video support
## 🧪 Testing
- [ ] Better test coverage
## 📄 Documentation
- [ ] Formal API documentation using Swagger
- [x] Improved README.md
## 🔧 Devops
- [x] Allow for different development/testing/production environments
- [ ] Set up Github Actions to automatically build and deploy to Heroku
- [ ] Set up Husky to lint before commit
## 💪 Refactoring
- [x] Refactor Frontend authentication structure
  - [x] Store logged in state using React Context
  - [x] Set up ProtectedRoute component
- [ ] Typescript
  - [x] Frontend
  - [ ] Backend
