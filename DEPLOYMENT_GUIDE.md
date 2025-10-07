# GitHub Pages Deployment Guide

## 🚀 Deploy Your Dungeon Destiny Dashboard to GitHub Pages

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account (@odaat1991)
2. **Click the "+" icon** in the top right → "New repository"
3. **Repository name**: `dungeon-destiny-dashboard`
4. **Description**: `Interactive development management dashboard for Dungeon Destiny tabletop RPG`
5. **Visibility**: Public (required for free GitHub Pages)
6. **Initialize**: ✅ Add a README file
7. **Click "Create repository"**

### Step 2: Upload Your Files

#### Option A: Web Interface (Easiest)
1. **Click "uploading an existing file"** link
2. **Drag and drop all the generated files**:
   - index.html
   - README.md
   - _config.yml
   - .gitignore
   - assets/ folder (with all CSS/JS files)
3. **Commit message**: "Initial dashboard deployment"
4. **Click "Commit changes"**

#### Option B: Git Command Line
```bash
# Clone your new repository
git clone https://github.com/odaat1991/dungeon-destiny-dashboard.git
cd dungeon-destiny-dashboard

# Copy all generated files to this directory
# Then commit and push
git add .
git commit -m "Initial dashboard deployment"
git push origin main
```

### Step 3: Enable GitHub Pages

1. **Go to repository Settings** tab
2. **Scroll to "Pages"** section in left sidebar
3. **Source**: Deploy from a branch
4. **Branch**: main / (root)
5. **Click "Save"**

### Step 4: Access Your Live Dashboard

Your dashboard will be available at:
**https://odaat1991.github.io/dungeon-destiny-dashboard/**

⏱️ It may take 5-10 minutes for the site to become available after first deployment.

## 🔄 Making Updates

### To update your dashboard:

1. **Edit files** directly on GitHub (click pencil icon)
2. **Or use Git**: Make changes locally, then:
```bash
git add .
git commit -m "Update dashboard features"
git push origin main
```

3. **Changes deploy automatically** - wait 2-5 minutes to see updates live

## ✅ Verification Checklist

After deployment, verify:
- [ ] Dashboard loads at your GitHub Pages URL
- [ ] All navigation links work
- [ ] Save system functions properly
- [ ] Character creation tools work
- [ ] Task management displays correctly
- [ ] Equipment database is searchable
- [ ] Mobile responsive design works

## 🛠️ Troubleshooting

### Site Not Loading
- Wait 10 minutes after initial setup
- Check Settings → Pages for deployment status
- Ensure `index.html` is in repository root

### Features Not Working
- Check browser console (F12) for JavaScript errors
- Verify all asset files uploaded correctly
- Clear browser cache and refresh

### Save System Issues
- Modern browsers required (Chrome, Firefox, Safari, Edge)
- Private/incognito mode may block localStorage
- Check browser allows local data storage

## 🔧 Customization Options

### Custom Domain (Optional)
1. **Buy a domain** (e.g., dungeonDestiny.dev)
2. **Settings → Pages → Custom domain**
3. **Add CNAME file** with your domain
4. **Configure DNS** with your domain registrar

### Analytics (Optional)
Add Google Analytics to `_config.yml`:
```yaml
google_analytics: G-YOUR-TRACKING-ID
```

### Branding
- Replace favicon.ico in assets/images/
- Update colors in assets/css/style.css
- Modify project info in assets/js/gameData.js

## 📊 Repository Structure

```
dungeon-destiny-dashboard/
├── index.html                 # Main dashboard page
├── README.md                  # Project documentation
├── _config.yml               # Jekyll/GitHub Pages config
├── .gitignore               # Git ignore rules
└── assets/
    ├── css/
    │   └── style.css        # Main styles
    ├── js/
    │   ├── main.js          # Core application
    │   ├── gameData.js      # Game content data
    │   ├── saveSystem.js    # Persistence system
    │   ├── dashboard.js     # Dashboard components
    │   ├── characterCreator.js
    │   ├── taskManager.js
    │   └── equipmentDatabase.js
    └── images/
        └── favicon.ico      # Site icon
```

## 🎯 Next Steps

1. **Share the URL** with your development team
2. **Start using the dashboard** for Phase 2 development
3. **Regular backups** using the export function
4. **Customize** content as your project evolves
5. **Version control** all changes through Git

Your Dungeon Destiny dashboard is now live and ready for collaborative development! 🎉

---

For questions: odaat1991@gmail.com
Repository: https://github.com/odaat1991/dungeon-destiny-dashboard