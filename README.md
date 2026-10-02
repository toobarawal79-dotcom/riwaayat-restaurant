# RIWAAYAT — Restaurant Website

A responsive, SEO-friendly static restaurant website built with HTML, CSS and vanilla JavaScript.

## Included
- Responsive mobile/tablet/desktop layout
- SEO title, description, canonical URL, Open Graph and robots metadata
- Restaurant JSON-LD structured data
- Accessible navigation and skip link
- Hero section, story, menu, experience, gallery, reservations and footer
- Reservation form with client-side validation/confirmation
- Custom SVG logo
- No build tools or frameworks required

## Run locally
Open `index.html` in a browser.

## Deploy
Upload the entire project folder to any static host such as Netlify, Vercel, GitHub Pages or shared hosting.

## Before publishing
1. Replace `https://example.com/` in `index.html` with the real website URL.
2. Replace the sample restaurant name, address, phone, hours and prices.
3. Replace social links (`#`) with the real profiles.
4. Connect the reservation form to a real form/email/backend service if you need actual booking submissions.
5. Add your own restaurant photos where possible and keep meaningful alt text.
6. Submit the final URL and sitemap to Google Search Console and Bing Webmaster Tools.

### SEO note
A professional design can improve user experience and engagement, but no design alone guarantees a higher search ranking. Search visibility also depends on content quality, relevance, technical SEO, backlinks, local SEO, performance and search-engine algorithms.


## Online ordering
The site includes a cart and delivery/pickup order form. When the customer submits an order, the order details are formatted and opened in WhatsApp for confirmation.

**Important:** Replace `WHATSAPP_NUMBER` in `js/script.js` with the restaurant's real WhatsApp number (country code, no + or spaces).

## Contact
The contact form prepares a message in the visitor's email application. For a true server-side contact form that works even when visitors have no email app configured, connect the form to a service such as Formspree or your own backend.


## Updated food images
The menu cards now use a locally stored set of Pakistani food visuals matching the RIWAAYAT branding: Beef Biryani, Chicken Karahi, Nihari and Seekh Kebab.
