# Contact Form Setup Guide

## Overview
Your contact form is now powered by a Node.js + Express backend with Nodemailer, deployed on Vercel.

## Setup Steps

### 1. **Sign up for Vercel** (Free)
   - Go to [https://vercel.com](https://vercel.com)
   - Sign in with your GitHub account (recommended)

### 2. **Configure Environment Variables**
   
   You need to add these environment variables to Vercel for Gmail SMTP:
   
   - `EMAIL_USER`: Your Gmail address (e.g., `your-email@gmail.com`)
   - `EMAIL_PASSWORD`: Your Gmail App Password (NOT your regular password)

   **How to get Gmail App Password:**
   1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
   2. Enable "2-Step Verification" if not already enabled
   3. Go to "App passwords"
   4. Select "Mail" and "Windows Computer"
   5. Copy the 16-character password
   6. Use this as `EMAIL_PASSWORD`

### 3. **Deploy to Vercel**
   
   **Option A: Using Vercel CLI**
   ```bash
   npm install -g vercel
   cd path/to/sinanlab.github.io
   vercel
   ```
   - Follow the prompts
   - Link to your GitHub repo
   - Add environment variables when prompted

   **Option B: Using Vercel Web Dashboard**
   1. Go to Vercel Dashboard
   2. Click "Add New" → "Project"
   3. Import your `sinanlab.github.io` GitHub repo
   4. In Settings → Environment Variables, add:
      - `EMAIL_USER`
      - `EMAIL_PASSWORD`
   5. Deploy

### 4. **Update Form Endpoint** (if needed)
   
   By default, the form submits to `/api/send-email`. If your Vercel deployment is at a custom domain, update the fetch URL in `scripts/main.js`:
   
   ```javascript
   const response = await fetch('/api/send-email', {
   ```
   
   Change to:
   ```javascript
   const response = await fetch('https://your-domain.vercel.app/api/send-email', {
   ```

### 5. **Test the Form**
   - Go to your website's contact section
   - Fill out the form and submit
   - You should receive two emails:
     - **Admin email**: Contains the user's message
     - **User confirmation email**: Sent to the visitor's email

## Features

✅ **Automatic Admin Notification** - You get an email with the message  
✅ **User Confirmation Email** - Visitor gets a thank you email  
✅ **Form Validation** - Client-side and server-side validation  
✅ **Error Handling** - Clear error messages  
✅ **Success Feedback** - Visual feedback after submission  
✅ **Security** - HTML escaping to prevent XSS attacks  
✅ **Free** - No monthly costs  

## Alternative Email Services

Instead of Gmail, you can use:

- **SendGrid** (Free tier available)
- **Mailgun** (Free tier available)
- **AWS SES** (Free tier available)

Just update the transporter configuration in `api/send-email.js`.

## Troubleshooting

**Q: "Failed to send email" error**
- Check that environment variables are set correctly in Vercel
- Verify Gmail 2FA is enabled and App Password is correct

**Q: Emails going to spam**
- Add SPF and DKIM records for your domain
- Use a custom email service instead of Gmail

**Q: Form not submitting**
- Check browser console for errors (F12)
- Verify Vercel deployment is successful
- Check that API endpoint is accessible

## Support
For issues with Nodemailer: https://nodemailer.com/
For Vercel help: https://vercel.com/docs
