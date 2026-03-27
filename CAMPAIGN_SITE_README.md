# Campaign Website Template

This project is now set up as a hosted-ready campaign website with a browser editing path.

## What is included

- `index.html` - homepage with all 13 candidates
- `candidate.html` - individual candidate profile page
- `content/campaign.json` - all editable website content in one file
- `styles.css` - the visual design
- `assets/placeholder-profile.svg` - placeholder photo
- `admin/` - Decap CMS admin panel files
- `netlify.toml` - Netlify hosting config

## Best hosting option

The best match for your request is:

- host on Netlify
- edit in a browser through `/admin`

That gives you:

- a public website anyone can open on the internet
- a simple content editor closer to Google Sites than raw code editing
- easy replacement of placeholder names, statements, emails, and photos

## How editing works

All site content lives in:

- `content/campaign.json`

Once connected to Netlify CMS, you can edit that content through the admin screen instead of manually changing the file.

## What you can replace quickly

For each of the 13 candidates you can update:

- name
- position
- department
- email
- photo
- statement

The placeholder image currently used is:

- `assets/placeholder-profile.svg`

## Important setup note

I prepared the website and CMS files, but I cannot finish the live Netlify account connection from inside this workspace because that requires your browser login and account authorization.

## Next steps to publish

1. Put this project in a GitHub repository
2. Connect that repo to Netlify
3. In Netlify, enable Identity and Git Gateway
4. Open `/admin` on the live site
5. Edit candidates and upload real photos from the browser

## If you want the simplest path

If you want, I can do the next step for you inside this project too:

1. make the design more polished for a real election campaign, or
2. prepare a step-by-step Netlify publishing checklist for your exact account setup
