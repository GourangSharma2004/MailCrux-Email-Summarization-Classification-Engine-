// Demo data for different email categories
export const demoEmails = {
  inbox: [
    {
      id: "inbox-1",
      data: {
        to: "user@example.com",
        from: "support@mailcrux.com",
        subject: "Welcome to MailCrux - Your Smart Email Management Solution",
        message: `Dear User,

Thank you for choosing MailCrux as your email management solution! We're thrilled to have you on board.

MailCrux is designed to streamline your email experience by leveraging advanced NLP (Natural Language Processing) techniques to filter, categorize, and summarize your emails automatically.

Key features you'll enjoy:
• Smart inbox organization with AI-powered categorization
• Automatic detection of important messages vs promotional content
• Daily personalized summaries of your inbox
• Email automation tools for scheduling and follow-ups
• Enhanced security and privacy protections

To get started, we recommend exploring the sidebar options, especially the new "Summary" feature that gives you an overview of your important communications.

If you have any questions or feedback, please don't hesitate to reply to this email.

Best regards,
The MailCrux Team`,
        timestamp: { seconds: Date.now() / 1000 - 3600 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "inbox-2",
      data: {
        to: "user@example.com",
        from: "newsletter@techinsider.com",
        subject: "Tech Insider Monthly: AI Breakthroughs and Industry Updates",
        message: `# TECH INSIDER MONTHLY
## May 2023 Edition

### BREAKING NEWS: Revolutionary AI Model Demonstrates Human-Level Reasoning

Researchers at OpenAI have unveiled their latest model, which demonstrates unprecedented capabilities in logical reasoning and problem-solving. The model, named "GPT-5," showed remarkable performance across various benchmarks, including mathematical reasoning, coding challenges, and complex decision-making scenarios.

"This represents a significant milestone in AI development," said Dr. Sarah Johnson, lead researcher. "The model's ability to follow multi-step reasoning and explain its thought process brings us closer to artificial general intelligence."

Industry experts predict this breakthrough could transform fields ranging from scientific research to personal productivity tools. Concerns about ethical implications and job displacement have also resurfaced.

### INDUSTRY ROUNDUP

1. **Apple** unveiled its next-generation M3 chip, promising 40% better performance with half the power consumption.

2. **Google Cloud** announced a new sustainability initiative, pledging carbon-negative data centers by 2030.

3. **Microsoft** acquired cybersecurity firm ShieldTech for $3.2 billion, strengthening its enterprise security portfolio.

4. **Tesla** revealed plans for a more affordable electric vehicle model priced at $25,000, expected to enter production next year.

### UPCOMING TECH EVENTS

* **WorldTech Conference** - June 15-18, San Francisco
* **AI Summit 2023** - July 7-9, London
* **Cyber Security Expo** - July 21-23, Singapore

### FEATURED ARTICLE: The Rise of Quantum Computing in Financial Services

[Read our in-depth analysis on how major banks are investing billions in quantum computing research, aiming to revolutionize risk assessment and trading algorithms...]

To unsubscribe or manage your newsletter preferences, click here.`,
        timestamp: { seconds: Date.now() / 1000 - 7200 },
        isImportant: false,
        category: "promotions",
        read: true
      }
    },
    {
      id: "inbox-3",
      data: {
        to: "user@example.com",
        from: "security@yourbank.com",
        subject: "Important Security Alert: Unusual Account Activity Detected",
        message: `SECURITY ALERT

Dear Valued Customer,

We have detected unusual activity on your account that requires your immediate attention.

Activity Details:
- Date: ${new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleDateString()}
- Time: ${new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleTimeString()}
- Location: Moscow, Russia
- Device: Unknown Android Device
- IP Address: 195.xxx.xxx.xxx

If you recognize this activity, no further action is needed. However, if you did not authorize this access, please take the following steps immediately:

1. Log in to your account and change your password
2. Enable two-factor authentication if not already active
3. Review recent transactions for any unauthorized charges
4. Contact our fraud department at 1-800-555-0123

For your security, we recommend:
- Using strong, unique passwords for each of your online accounts
- Regularly monitoring your account activity
- Never sharing your login credentials with anyone
- Being cautious of phishing attempts that may impersonate our bank

Your security is our top priority. If you have any questions or concerns, please contact our customer service team.

Sincerely,
YourBank Security Team

IMPORTANT: YourBank will never ask for your password, PIN, or full account details via email or phone.`,
        timestamp: { seconds: Date.now() / 1000 - 10800 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "inbox-4",
      data: {
        to: "user@example.com",
        from: "sales@fashionoutlet.com",
        subject: "Weekend Sale - 50% Off Everything! Limited Time Only",
        message: `WEEKEND FLASH SALE! 50% OFF EVERYTHING!

🎉 OUR BIGGEST SALE OF THE YEAR IS HERE! 🎉

Dear Valued Customer,

We're excited to announce our ANNUAL FLASH SALE with incredible savings across all departments!

## SALE HIGHLIGHTS:
• 50% OFF all regular-priced items
• Additional 15% OFF already reduced items
• FREE shipping on orders over $50
• EXCLUSIVE early access for our loyal customers

## TOP DEALS:
• Designer handbags starting at just $49.99
• Premium denim jeans from $29.99
• Luxury watches at unbeatable prices
• Home décor and accessories from $12.99

SALE ENDS SUNDAY AT MIDNIGHT!

This offer is only available for 48 hours, so don't miss your chance to refresh your wardrobe and home at these unbelievable prices!

Shop now: www.fashionoutlet.com/flash-sale

Use code: FLASH50 at checkout for an EXTRA 10% OFF!

*Terms and conditions apply. Cannot be combined with other offers.
Offer valid online and in participating stores until Sunday, 11:59 PM EST.`,
        timestamp: { seconds: Date.now() / 1000 - 18000 },
        isImportant: false,
        category: "promotions",
        read: true
      }
    },
    {
      id: "inbox-5",
      data: {
        to: "user@example.com",
        from: "subscriptions@streamflix.com",
        subject: "Your Premium Subscription is About to Expire - Renew Now",
        message: `Your StreamFlix Premium Plan Expires Soon

Hi there,

We hope you've been enjoying unlimited access to thousands of movies and TV shows on StreamFlix Premium. We wanted to let you know that your subscription is scheduled to expire on May 31, 2023.

## What Happens if You Don't Renew?
If you don't renew by the expiration date, your account will be downgraded to the Basic plan, which means:
• You'll lose access to 4K Ultra HD content
• Simultaneous streaming will be limited to 1 device (instead of 4)
• New releases and exclusive Premium content will be unavailable
• You'll see ads during your viewing experience

## Renewal Options:
• Monthly Premium: $15.99/month
• Annual Premium: $159.99/year (save 16%)
• NEW! Family Premium: $19.99/month (6 devices, parental controls)

## What's New on StreamFlix Premium?
We've recently added hundreds of new titles, including:
• The award-winning series "Quantum Break" (exclusive to Premium)
• 25 new international films from acclaimed directors
• The complete "Galaxy Wars" collection in 4K with bonus content
• Live sports streaming for selected events

To renew your subscription and continue enjoying Premium benefits without interruption, simply log in to your account and visit the Subscription section.

Thank you for being a valued StreamFlix member!

The StreamFlix Team

P.S. Looking for a more affordable option? Check out our new StreamFlix Lite plan at just $7.99/month.`,
        timestamp: { seconds: Date.now() / 1000 - 21600 },
        isImportant: false,
        category: "promotions",
        read: false
      }
    },
    {
      id: "inbox-6",
      data: {
        to: "user@example.com",
        from: "sarah.johnson@company.com",
        subject: "Team Meeting Rescheduled + Important Project Updates",
        message: `Hi Team,

I hope this email finds you well. I'm writing to inform you about some important updates regarding our weekly meeting and the current project status.

## Meeting Rescheduled
Our regular weekly team meeting has been moved from Tuesday to Thursday at 2:00 PM (EST) this week. The change is due to the executive review session that has been scheduled for Tuesday. The meeting link remains the same, and calendar invites have been updated accordingly.

## Project Alpha Status Update
As you know, we're approaching the final phase of Project Alpha. Here's where we stand:

1. **Backend Development (87% complete)**
   - API integration with third-party services is finalized
   - Database optimization still in progress (Est. completion: Friday)
   - Need to address the performance issues identified in last week's testing

2. **Frontend Development (73% complete)**
   - Main dashboard redesign is complete
   - User profile section needs further work
   - Mobile responsiveness being implemented

3. **QA Testing (45% complete)**
   - First round of testing revealed 23 bugs (17 resolved, 6 pending)
   - Need more comprehensive testing on the new features
   - Automated testing scripts being updated

## Client Presentation
Remember that our client presentation is scheduled for next Wednesday. We'll need to have a presentable version ready by Monday for internal review. Please prioritize any tasks that affect the demo functionality.

## Resource Allocation
We've secured additional resources for the final push:
- Two more QA specialists joining the team tomorrow
- Cloud infrastructure capacity has been increased
- Design team will provide expedited feedback on UI changes

Let me know if you have any questions or concerns before Thursday's meeting. Please come prepared to discuss your specific component status and any blockers you're facing.

Best regards,
Sarah Johnson
Project Manager

P.S. Don't forget about the team lunch scheduled for Friday to celebrate the milestone achievements!`,
        timestamp: { seconds: Date.now() / 1000 - 25200 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "inbox-7",
      data: {
        to: "user@example.com",
        from: "security-alerts@google.com",
        subject: "New Sign-In Detected on Your Account",
        message: `Google Security Alert: New Device Sign-In

We detected a new sign-in to your Google Account on a Windows device in San Francisco, CA, USA.

Sign-in details:
- Date: May 15, 2023
- Time: 2:34 PM PST
- Location: San Francisco, California, USA
- Device: Windows PC
- Browser: Chrome

If this was you, you don't need to do anything. If you don't recognize this activity, someone else might be using your account.

REVIEW YOUR ACCOUNT ACTIVITY

We sent this email to let you know about important changes to your Google Account and services.
© 2023 Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA`,
        timestamp: { seconds: Date.now() / 1000 - 28800 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "inbox-8",
      data: {
        to: "user@example.com",
        from: "orders@amazonshopping.com",
        subject: "Your Order Has Shipped - Expected Delivery: May 18-19",
        message: `Your Amazon Order #112-4791036-3253768 Has Shipped

Hello,

Good news! We're writing to let you know that your order has shipped. Your package is on the way and expected to arrive in 2-3 business days.

ORDER DETAILS:
Order #: 112-4791036-3253768
Placed on: May 14, 2023

SHIPMENT DETAILS:
Shipped via: Amazon Logistics
Tracking Number: TBA017823649301
Estimated Delivery: May 18-19, 2023

ITEMS IN THIS SHIPMENT:
1. Wireless Noise-Cancelling Headphones - Black ($249.99)
2. USB-C Fast Charging Cable 6ft - 2 Pack ($15.99)
3. Protective Case for Headphones ($19.99)

Shipping Address:
John Doe
123 Main Street
Apt 4B
San Francisco, CA 94103

You can track your package or view full order details by clicking the button below:

VIEW ORDER STATUS

Need to make changes?
- For delivery issues, you can track your package and make adjustments on the tracking page
- If you need to return an item, you can initiate a return through "Your Orders" on our website
- For other questions, please visit our Help Center

Thank you for shopping with Amazon!

Amazon.com Customer Service

Please note: This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.`,
        timestamp: { seconds: Date.now() / 1000 - 32400 },
        isImportant: false,
        category: "updates",
        read: false
      }
    },
    {
      id: "inbox-9",
      data: {
        to: "user@example.com",
        from: "recruitment@techcorp.com",
        subject: "Interview Invitation: Senior Developer Position at TechCorp",
        message: `Dear Applicant,

Thank you for your application to the Senior Developer position at TechCorp. We were impressed with your qualifications and experience, and we would like to invite you for an interview.

## Interview Details:
- Position: Senior Developer - Frontend Specialist
- Date: May 25, 2023
- Time: 10:00 AM - 11:30 AM (EST)
- Format: Video Conference (Zoom)
- Interviewers: James Wilson (Engineering Manager), Lisa Chen (Tech Lead), Michael Rodriguez (HR Director)

## What to Prepare:
1. A 10-minute presentation on a challenging project you've worked on
2. Code samples or portfolio links (if not already provided)
3. Questions about our company, team, or the role

## Interview Process:
The 90-minute session will be structured as follows:
- Introduction and overview (10 minutes)
- Your brief presentation (10 minutes)
- Technical discussion (30 minutes)
- Problem-solving exercise (20 minutes)
- Culture fit assessment (10 minutes)
- Your questions (10 minutes)

## Technical Focus Areas:
- React.js architecture and state management
- Performance optimization techniques
- Responsive design implementation
- Testing methodologies
- API integration best practices

Please confirm your availability by responding to this email. If the suggested time doesn't work for you, please provide a few alternatives in the next 5 business days.

We've attached some information about our company culture, benefits package, and the team you would be joining. Please review these materials before the interview.

We're looking forward to learning more about you and discussing how your skills and experience align with our needs at TechCorp.

Best regards,

Jennifer Thompson
Talent Acquisition Specialist
TechCorp, Inc.
j.thompson@techcorp.com
(555) 123-4567`,
        timestamp: { seconds: Date.now() / 1000 - 39600 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "inbox-10",
      data: {
        to: "user@example.com",
        from: "daniel.clark@projectpartners.org",
        subject: "Project Proposal Review - Feedback and Next Steps",
        message: `Dear Colleague,

I've reviewed the proposal for the Natural Language Processing implementation project that you submitted last week. I wanted to share my thoughts and suggest some next steps.

## Overall Assessment
The proposal is strong and well-structured. You've clearly articulated the business problem, technical approach, and expected outcomes. The timeline is realistic, and the budget justification is thorough.

## Strengths
1. Comprehensive analysis of the current email classification challenges
2. Clear methodology for implementing the NLP solution
3. Well-defined success metrics and evaluation framework
4. Thoughtful consideration of privacy and security implications
5. Realistic resource allocation and contingency planning

## Areas for Improvement
1. **Technical Details**: The section on model selection could benefit from more specificity. Which NLP algorithms are you considering, and why? What benchmarks will you use to evaluate them?

2. **Integration Plan**: There's limited information about how the solution will integrate with existing systems. Could you expand on this, especially regarding API endpoints and data flow?

3. **User Adoption Strategy**: While the technical implementation is solid, I'd like to see more emphasis on how we'll drive user adoption and measure satisfaction.

4. **Competitive Analysis**: It would strengthen the proposal to include a brief comparison with alternative solutions in the market.

## Next Steps
1. Could you address the feedback points above and submit a revised proposal by next Friday?
2. Let's schedule a meeting with the technical team to dive deeper into the integration questions.
3. I suggest we prepare a demonstration concept for the executive committee using sample data.

I've attached some reference materials that might be helpful, including case studies of similar implementations in other organizations.

Despite these suggestions for improvement, I want to emphasize that this is a strong proposal with significant potential. I'm excited about the direction and confident that with some refinements, we'll have a compelling case for approval.

Please let me know if you'd like to discuss any of this feedback in more detail.

Best regards,

Daniel Clark
Director of Innovation
Project Partners Organization`,
        timestamp: { seconds: Date.now() / 1000 - 46800 },
        isImportant: true,
        category: "primary",
        read: false
      }
    },
    {
      id: "social-connection-1",
      data: {
        to: "user@example.com",
        from: "alex.developer@techcompany.com",
        subject: "Connecting on a potential collaboration opportunity",
        message: `Hello there,

I hope this email finds you well. My name is Alex Chen, and I'm a Senior Developer at TechCompany. I recently came across your work on the open-source project "DataVisualizer" and was really impressed with your approach to handling large datasets efficiently.

Our team is currently working on a similar challenge, and I believe your expertise would be valuable. I'd love to connect and discuss a potential collaboration opportunity that could be mutually beneficial.

Some areas where I think we could collaborate:
- Optimizing data processing algorithms
- Implementing more intuitive visualization components
- Exploring new approaches to real-time data handling

Would you be open to a quick 30-minute call next week to discuss this further? I'm available most afternoons between 2-5pm PST.

Looking forward to connecting!

Best regards,
Alex Chen
Senior Developer, TechCompany
LinkedIn: linkedin.com/in/alexchen
GitHub: github.com/alexchendev`,
        timestamp: { seconds: Date.now() / 1000 - 4800 },
        isImportant: true,
        category: "social",
        read: false
      }
    },
    {
      id: "social-connection-2",
      data: {
        to: "user@example.com",
        from: "sarah.johnson@designstudio.io",
        subject: "Interested in your UX/UI expertise for our upcoming project",
        message: `Hi there,

I'm Sarah Johnson, Creative Director at DesignStudio. I was referred to you by Michael Peters, who spoke highly of your UX/UI work on the HealthTrack application.

We're launching a new project for a fintech client next month that requires strong expertise in creating intuitive interfaces for complex financial data. Based on your portfolio and Michael's recommendation, I believe you'd be a perfect fit for this project.

The project would involve:
- Redesigning their dashboard experience
- Creating a more intuitive navigation system
- Developing a cohesive design system for future scaling

This would be a 3-month contract with the possibility of extension. We offer competitive rates and a flexible remote work arrangement.

If this sounds interesting, I'd love to set up a meeting to discuss the details and show you more about the project scope.

Looking forward to connecting!

Best,
Sarah Johnson
Creative Director
DesignStudio.io
Instagram: @sarahjohnsondesigns`,
        timestamp: { seconds: Date.now() / 1000 - 9200 },
        isImportant: true,
        category: "social",
        read: false
      }
    },
    {
      id: "social-connection-3",
      data: {
        to: "user@example.com",
        from: "david.williams@venturecapital.com",
        subject: "Introduction and potential investment opportunity",
        message: `Hello,

I hope this message finds you well. I'm David Williams, Partner at Venture Capital Partners. I've been following your startup's progress over the past few months and have been impressed with your growth metrics and innovative approach to the market problem.

Our firm specializes in Series A investments for technology startups in your space, typically in the $2-5M range. We're particularly interested in companies that demonstrate strong product-market fit and scalable business models.

I'd like to arrange a meeting to learn more about your:
- Growth plans for the next 12-18 months
- Current challenges and opportunities
- Vision for the company's future
- Capital requirements to reach your next milestone

If you're currently fundraising or planning to do so in the near future, I believe we could be a good fit as an investor. Even if you're not actively seeking investment at this time, I'd still value connecting and introducing you to our network.

Would you be available for a call in the coming week?

Best regards,
David Williams
Partner, Venture Capital Partners
Phone: (555) 123-4567
LinkedIn: linkedin.com/in/davidwilliamsvc`,
        timestamp: { seconds: Date.now() / 1000 - 15300 },
        isImportant: true,
        category: "social",
        read: false
      }
    }
  ],
  starred: [
    {
      id: "starred-1",
      data: {
        to: "user@example.com",
        from: "hr@dream-company.com",
        subject: "Job Interview Invitation",
        message: "We would like to invite you for an interview next week...",
        timestamp: { seconds: Date.now() / 1000 - 86400 }
      }
    },
    {
      id: "starred-2",
      data: {
        to: "user@example.com",
        from: "travel@airlines.com",
        subject: "Flight Confirmation",
        message: "Your flight to Paris has been confirmed. Departure: 10:30 AM...",
        timestamp: { seconds: Date.now() / 1000 - 172800 }
      }
    },
    {
      id: "starred-3",
      data: {
        to: "user@example.com",
        from: "grants@foundation.org",
        subject: "Congratulations! Project Funding Approved",
        message: "We're pleased to inform you that your grant application has been approved for $50,000...",
        timestamp: { seconds: Date.now() / 1000 - 259200 }
      }
    },
    {
      id: "starred-4",
      data: {
        to: "user@example.com",
        from: "management@company.com",
        subject: "Promotion Announcement",
        message: "Congratulations on your promotion to Senior Developer! Your new role begins next month...",
        timestamp: { seconds: Date.now() / 1000 - 345600 }
      }
    },
    {
      id: "starred-5",
      data: {
        to: "user@example.com",
        from: "events@conference.com",
        subject: "Invitation: Annual Industry Conference",
        message: "You're invited to speak at our annual tech conference. Please confirm your availability...",
        timestamp: { seconds: Date.now() / 1000 - 432000 }
      }
    },
    {
      id: "starred-6",
      data: {
        to: "user@example.com",
        from: "realestate@agency.com",
        subject: "House Offer Accepted!",
        message: "Great news! The sellers have accepted your offer on the property at 123 Main Street...",
        timestamp: { seconds: Date.now() / 1000 - 518400 }
      }
    }
  ],
  orders: [
    {
      id: "order-1",
      data: {
        to: "user@example.com",
        from: "orders@amazon.com",
        subject: "Your Amazon Order #A280-5391847-1293805 Has Shipped",
        message: `# Your Amazon Order Has Shipped

Order #A280-5391847-1293805

Hello,

Your order has been shipped and is on its way to you! Your package is expected to arrive on Tuesday, June 20th.

## Items in this shipment:
- Wireless Earbuds - Black
- USB-C Charging Cable (3-Pack)
- Phone Case Protector

## Tracking Information:
Carrier: Amazon Logistics
Tracking Number: TBA9283701295X
Estimated Delivery: June 20, 2023

You can track your package or manage your delivery options by visiting Your Orders on Amazon.com.

## Order Summary:
Order Total: $89.97
Payment Method: Visa ending in 4321

Thank you for shopping with Amazon!

The Amazon Team`,
        timestamp: { seconds: Date.now() / 1000 - 259200 },
        isImportant: true,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-2",
      data: {
        to: "user@example.com",
        from: "billing@applestorepayments.com",
        subject: "Receipt for Your App Store Purchase",
        message: `# Your App Store Receipt

Dear Customer,

Thank you for your purchase from the App Store. Below is your receipt for reference.

## Purchase Details:
- Date: June 15, 2023
- Order Number: M2390572031
- Product: Premium Photo Editor Pro
- Developer: Creative Software Inc.
- Amount: $4.99
- Payment Method: Apple Pay

Your receipt has been emailed to your account email address. You can also view your purchase history in the App Store under your account.

If you did not make this purchase or if you have any questions, please contact Apple Support immediately.

Thank you for using the App Store.

Apple Inc.

*This is an automated message, please do not reply to this email.`,
        timestamp: { seconds: Date.now() / 1000 - 345600 },
        isImportant: false,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-3",
      data: {
        to: "user@example.com",
        from: "no-reply@payments.uber.com",
        subject: "Your Uber Eats Receipt - $42.85",
        message: `# Your Uber Eats Order

Thanks for ordering with Uber Eats!

## Order Details:
- Restaurant: Spicy Thai Kitchen
- Order #: UE-482901357
- Date: June 12, 2023
- Time: 7:45 PM

## Items:
- 1x Pad Thai (Chicken) - $15.99
- 1x Green Curry (Medium Spice) - $16.99
- 2x Spring Rolls - $7.98
- 1x Thai Iced Tea - $3.99

## Payment Summary:
- Subtotal: $44.95
- Delivery Fee: $2.99
- Service Fee: $4.49
- Tip: $8.00
- Tax: $3.42
- Promo Code (WELCOME20): -$11.00
- Total Charged: $52.85

Your food was delivered to: 123 Main St, Apt 4B, San Francisco, CA 94103

How was your order? Rate your experience in the Uber Eats app.

Thank you for ordering with Uber Eats!`,
        timestamp: { seconds: Date.now() / 1000 - 432000 },
        isImportant: false,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-4",
      data: {
        to: "user@example.com",
        from: "orders@bookstore.com",
        subject: "Your Book Order Invoice #BK78901",
        message: `# Book Order Invoice

## INVOICE
Invoice #: BK78901
Date: June 10, 2023
Customer ID: C4830217

Dear Valued Customer,

Thank you for your recent order from The Book Corner. Please find your invoice details below:

## Order Details:
- Order Date: June 9, 2023
- Shipping Method: Standard Shipping (3-5 business days)
- Payment Method: Credit Card (Mastercard ****5678)

## Items Purchased:
1. "The Art of Programming" - $45.99
2. "Machine Learning Fundamentals" - $39.99
3. "Digital Design Principles" - $29.95
4. "Business Strategy Handbook" - $34.50

## Price Summary:
- Subtotal: $150.43
- Shipping & Handling: $4.99
- Sales Tax (8.5%): $12.79
- Total: $168.21

Your order has been processed and will be shipped within 24 hours. You will receive a shipping confirmation email with tracking information once your package is on its way.

If you have any questions or concerns about your order, please contact our customer service team at support@bookstore.com or call us at 1-800-555-BOOK.

Thank you for shopping with us!

The Book Corner Team`,
        timestamp: { seconds: Date.now() / 1000 - 518400 },
        isImportant: true,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-5",
      data: {
        to: "user@example.com",
        from: "subscriptions@netflix.com",
        subject: "Your Netflix Subscription Invoice",
        message: `# Netflix Subscription

## BILLING STATEMENT
Netflix Subscription - Premium Plan

Dear Member,

We've successfully processed your monthly subscription payment. Here are your billing details:

## Subscription Details:
- Billing Date: June 1, 2023
- Membership Plan: Premium (4K Ultra HD + 4 screens)
- Next Billing Date: July 1, 2023

## Payment Information:
- Amount Charged: $19.99
- Payment Method: Visa card ending in 1234
- Transaction ID: NF829301752

Your subscription gives you unlimited access to our full content library in the highest quality available, on up to 4 screens simultaneously.

## Need Help?
- To view your billing details, visit netflix.com/YourAccount
- To change your payment method, visit netflix.com/BillingInfo
- For other questions, visit our Help Center at netflix.com/Help

Thank you for being a Netflix member!

The Netflix Team`,
        timestamp: { seconds: Date.now() / 1000 - 604800 },
        isImportant: false,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-6",
      data: {
        to: "user@example.com",
        from: "receipts@steamgames.com",
        subject: "Your Steam Purchase Receipt",
        message: `# Steam Purchase Receipt

Thank you for your purchase from the Steam Store!

## Transaction Details:
- Date: May 28, 2023
- Transaction ID: 901278453721
- Payment Method: PayPal

## Item(s) Purchased:
1. Cyberpunk 2077 - $59.99
2. Summer Game Festival Bundle - $39.99 
   (4 items: Space Explorer, Medieval Quest, Racing Simulator, Puzzle Masters)
3. Premium DLC Pack - $19.99

## Order Summary:
- Subtotal: $119.97
- Discount (Summer Sale): -$20.00
- Tax: $9.99
- Total: $109.96

Your games have been added to your Steam library and are available to download and play immediately.

If you did not make this purchase or if you have any questions about your order, please contact Steam Support as soon as possible.

Happy Gaming!

The Steam Team`,
        timestamp: { seconds: Date.now() / 1000 - 691200 },
        isImportant: false,
        category: "orders",
        read: false
      }
    },
    {
      id: "order-7",
      data: {
        to: "user@example.com",
        from: "info@airbnb.com",
        subject: "Receipt for Your Airbnb Stay - $895.00",
        message: `# Airbnb Receipt

## BOOKING CONFIRMATION & RECEIPT
Reservation Code: HMRK92

Thank you for booking with Airbnb!

## Reservation Details:
- Property: Modern Mountain Cabin with Hot Tub & Views
- Location: Aspen, Colorado
- Host: Sarah & Michael
- Check-in: Friday, July 14, 2023 (4:00 PM)
- Check-out: Monday, July 17, 2023 (11:00 AM)
- Guests: 4 people

## Payment Details:
- Nightly Rate: $250 x 3 nights = $750.00
- Cleaning Fee: $85.00
- Service Fee: $125.00
- Taxes (11.5%): $110.00
- Total Charged: $1,070.00
- Paid via: Mastercard ending in 7890

## Cancellation Policy:
Moderate - Full refund until 5 days before check-in. After that, the first night and 50% of the remaining nights are non-refundable.

## Property Address & Access:
You'll receive the exact address and check-in instructions 48 hours before your arrival.

## Need to get in touch?
- Message your host through the Airbnb app
- For other issues, visit airbnb.com/help

Thank you for choosing Airbnb for your travel needs!

The Airbnb Team`,
        timestamp: { seconds: Date.now() / 1000 - 777600 },
        isImportant: true,
        category: "orders",
        read: false
      }
    }
  ],
  important: [
    {
      id: "important-1",
      data: {
        to: "user@example.com",
        subject: "Urgent: Security Alert",
        message: "We detected unusual activity on your account...",
        timestamp: { seconds: Date.now() / 1000 - 14400 }
      }
    },
    {
      id: "important-2",
      data: {
        to: "user@example.com",
        subject: "Final Tax Deadline Reminder",
        message: "Please submit your tax documents by end of day...",
        timestamp: { seconds: Date.now() / 1000 - 28800 }
      }
    },
    {
      id: "important-3",
      data: {
        to: "user@example.com",
        subject: "URGENT: Server Outage Alert",
        message: "Our primary database server is currently down. The engineering team is working on it...",
        timestamp: { seconds: Date.now() / 1000 - 43200 }
      }
    },
    {
      id: "important-4",
      data: {
        to: "user@example.com",
        subject: "Critical Security Patch Required",
        message: "A zero-day vulnerability has been discovered. Please update your systems immediately...",
        timestamp: { seconds: Date.now() / 1000 - 57600 }
      }
    },
    {
      id: "important-5",
      data: {
        to: "user@example.com",
        subject: "Emergency Team Meeting",
        message: "All hands required for an emergency meeting regarding the product launch at 3:00 PM...",
        timestamp: { seconds: Date.now() / 1000 - 72000 }
      }
    },
    {
      id: "important-6",
      data: {
        to: "user@example.com",
        subject: "Deadline Extension Request",
        message: "The client has requested a deadline extension for the current project...",
        timestamp: { seconds: Date.now() / 1000 - 86400 }
      }
    }
  ],
  sent: [
    {
      id: "sent-1",
      data: {
        to: "client@example.com",
        subject: "Project Proposal",
        message: "Please find attached our proposal for your review...",
        timestamp: { seconds: Date.now() / 1000 - 43200 }
      }
    },
    {
      id: "sent-2",
      data: {
        to: "team@example.com",
        subject: "Meeting Notes",
        message: "Here are the notes from our meeting yesterday...",
        timestamp: { seconds: Date.now() / 1000 - 129600 }
      }
    },
    {
      id: "sent-3",
      data: {
        to: "support@example.com",
        subject: "Technical Issue",
        message: "I'm experiencing problems with the application...",
        timestamp: { seconds: Date.now() / 1000 - 216000 }
      }
    },
    {
      id: "sent-4",
      data: {
        to: "hr@example.com",
        subject: "Vacation Request",
        message: "I would like to request vacation time from July 15-22...",
        timestamp: { seconds: Date.now() / 1000 - 302400 }
      }
    },
    {
      id: "sent-5",
      data: {
        to: "accounting@example.com",
        subject: "Expense Report - May 2023",
        message: "Please find attached my expense report for reimbursement...",
        timestamp: { seconds: Date.now() / 1000 - 388800 }
      }
    },
    {
      id: "sent-6",
      data: {
        to: "vendor@example.com",
        subject: "Invoice Query",
        message: "There seems to be a discrepancy in the recent invoice you sent...",
        timestamp: { seconds: Date.now() / 1000 - 475200 }
      }
    },
    {
      id: "sent-7",
      data: {
        to: "partner@example.com",
        subject: "Partnership Agreement",
        message: "Attached is the signed partnership agreement as discussed...",
        timestamp: { seconds: Date.now() / 1000 - 561600 }
      }
    },
    {
      id: "sent-8",
      data: {
        to: "customer@example.com",
        subject: "Thank You for Your Purchase",
        message: "We appreciate your recent purchase and would love your feedback...",
        timestamp: { seconds: Date.now() / 1000 - 648000 }
      }
    },
    {
      id: "sent-9",
      data: {
        to: "interview@example.com",
        subject: "Thank You for the Interview Opportunity",
        message: "I wanted to express my gratitude for the opportunity to interview yesterday...",
        timestamp: { seconds: Date.now() / 1000 - 734400 }
      }
    },
    {
      id: "sent-10",
      data: {
        to: "landlord@example.com",
        subject: "Maintenance Request",
        message: "The kitchen sink has been leaking. Could you please send someone to fix it?",
        timestamp: { seconds: Date.now() / 1000 - 820800 }
      }
    }
  ],
  drafts: [
    {
      id: "draft-1",
      data: {
        to: "partner@example.com",
        subject: "Partnership Opportunity",
        message: "I would like to discuss a potential partnership...",
        timestamp: { seconds: Date.now() / 1000 - 432000 }
      }
    },
    {
      id: "draft-2",
      data: {
        to: "hr@example.com",
        subject: "Application for Senior Position",
        message: "Please find my resume attached for the senior position...",
        timestamp: { seconds: Date.now() / 1000 - 518400 }
      }
    },
    {
      id: "draft-3",
      data: {
        to: "client@example.com",
        subject: "Project Update - June",
        message: "Here's an update on the current status of the project...",
        timestamp: { seconds: Date.now() / 1000 - 604800 }
      }
    },
    {
      id: "draft-4",
      data: {
        to: "finance@example.com",
        subject: "Budget Approval Request",
        message: "Requesting approval for the additional budget for Q3...",
        timestamp: { seconds: Date.now() / 1000 - 691200 }
      }
    },
    {
      id: "draft-5",
      data: {
        to: "manager@example.com",
        subject: "Performance Review Discussion",
        message: "I'd like to schedule a meeting to discuss my recent performance review...",
        timestamp: { seconds: Date.now() / 1000 - 777600 }
      }
    },
    {
      id: "draft-6",
      data: {
        to: "team@example.com",
        subject: "New Project Kickoff",
        message: "I'm excited to announce we'll be starting a new project next month...",
        timestamp: { seconds: Date.now() / 1000 - 864000 }
      }
    },
    {
      id: "draft-7",
      data: {
        to: "conference@example.com",
        subject: "Speaker Submission",
        message: "I would like to submit a proposal to speak at your upcoming conference...",
        timestamp: { seconds: Date.now() / 1000 - 950400 }
      }
    }
  ],
  social: [
    {
      id: "social-1",
      data: {
        to: "user@example.com",
        from: "notifications@linkedin.com",
        subject: "5 new connections for you to explore",
        message: `# LinkedIn Connections Update

Hello,

You have 5 new connection suggestions this week based on your profile and network activity.

## New Connection Suggestions:
1. **Sarah Johnson** - Product Manager at Tech Innovations Inc.
2. **Michael Chen** - Software Engineer at Google
3. **Elena Rodriguez** - UX Designer at Creative Solutions
4. **David Kim** - Data Scientist at AI Research Labs
5. **Priya Patel** - Marketing Director at Global Brands

These professionals share interests or connections with you. Expanding your network can open new opportunities for collaboration and career growth.

## Recent Activity From Your Network:
- James Wilson shared an article: "The Future of Remote Work"
- Emily Clark posted about a job opening at her company
- Your post "Thoughts on AI in Healthcare" received 27 comments

## Upcoming Events For You:
- Virtual Networking: Tech Professionals Meetup - Next Tuesday
- Webinar: Advanced Leadership Skills - This Thursday

Keep growing your professional network!

The LinkedIn Team`,
        timestamp: { seconds: Date.now() / 1000 - 5400 },
        isImportant: false,
        category: "social",
        read: false
      }
    },
    {
      id: "social-2",
      data: {
        to: "user@example.com",
        from: "notifications@twitter.com",
        subject: "You have new followers and mentions",
        message: `# Twitter Activity Update

@YourHandle, you've got some new activity!

## New Followers (3):
- @TechExpert - Tech journalist and industry analyst
- @MarketingGuru - Digital marketing specialist
- @CodeMaster - Full-stack developer and open source contributor

## Mentions (2):
- @IndustryInsider mentioned you: "Great conversation with @YourHandle about emerging tech trends at the conference yesterday! Looking forward to collaborating."
- @NetworkPro mentioned you: "Thanks @YourHandle for the insightful comments on my thread about cloud security. Your perspective is always valuable."

## Popular in your network:
1. Big Tech announces new AI initiatives
2. The rise of blockchain in finance
3. Remote work culture continues to evolve

## Trending Topics:
#TechConference2023
#AIInnovation
#DeveloperLife
#RemoteWorkTips

Check your Twitter app or visit twitter.com to engage with your community!

Twitter Notifications Team`,
        timestamp: { seconds: Date.now() / 1000 - 8200 },
        isImportant: false,
        category: "social",
        read: false
      }
    },
    {
      id: "social-3",
      data: {
        to: "user@example.com",
        from: "no-reply@instagram.com",
        subject: "designerlife, techcreative and 8 others liked your post",
        message: `Instagram Notification

Your recent post is getting attention!

## Post Activity:
Your photo posted on May 28 has received:
- 52 likes
- 7 comments
- 3 shares

## New Likes From:
- @designerlife
- @techcreative
- @digitalartist
- @webdevmaster
- @uiuxgenius
- @creativeminds
- @photoeditor
- @visualdesigner
- @appdesigner
- @techart

## Recent Comments:
@digitalartist: "Love the composition! What tools did you use?"
@uiuxgenius: "This is incredible work! Would love to collaborate sometime."
@webdevmaster: "The attention to detail is amazing. Great job!"

## Similar Posts You Might Like:
We've curated some content similar to your recent posts that you might enjoy. Check them out in your Explore feed!

Stay connected with your community by responding to comments and messages!

The Instagram Team`,
        timestamp: { seconds: Date.now() / 1000 - 14000 },
        isImportant: false,
        category: "social"
      }
    },
    {
      id: "social-4",
      data: {
        to: "user@example.com",
        from: "noreply@facebook.com",
        subject: "John Smith and 5 others posted updates on their stories",
        message: `Facebook Notifications

Hi there,

Don't miss out on the latest updates from your friends!

## New Stories:
- **John Smith** posted 3 new photos to their story
- **Mary Johnson** shared a life event: "Got a new job at Tech Innovations Inc."
- **David Williams** is celebrating a birthday today
- **Lisa Brown** added a new video to their story
- **Michael Davis** created an event: "Summer Barbecue"
- **Sarah Miller** updated their profile picture

## Recent Friend Activity:
- You have 3 pending friend requests
- 7 friends have upcoming birthdays this week
- 2 friends tagged you in photos

## Groups Activity:
- "Tech Professionals Network" has 15 new posts
- "Local Community Events" added an upcoming event
- "Photography Enthusiasts" has a new discussion thread

## Suggested for You:
- Join "Web Developers Unite" group based on your interests
- Connect with colleagues from your workplace
- Discover local events happening this weekend

Visit Facebook to catch up with your friends and community!

The Facebook Team`,
        timestamp: { seconds: Date.now() / 1000 - 19800 },
        isImportant: false,
        category: "social"
      }
    }
  ],
  promotions: [
    {
      id: "promo-1",
      data: {
        to: "user@example.com",
        from: "deals@electronicstore.com",
        subject: "🔥 FLASH SALE: Tech Gadgets Up to 70% OFF - Today Only!",
        message: `# MEGA TECH FLASH SALE - TODAY ONLY!

**INCREDIBLE DEALS ON THE LATEST TECH - UP TO 70% OFF!**

Dear Valued Customer,

Our biggest tech sale of the year is happening NOW! For 24 hours only, we're offering massive discounts on the hottest gadgets and electronics.

## FEATURED DEALS:

🔹 **Premium Laptops** - Save up to $500
   * UltraBook Pro 15" - Was $1,299, NOW $799
   * TechMaster Gaming Laptop - Was $1,599, NOW $999
   * LightBook Air - Was $899, NOW $649

🔹 **Smartphones & Accessories** - Up to 60% OFF
   * Galaxy S23 Ultra - Was $1,199, NOW $899
   * iPhone 14 Pro - Was $999, NOW $799
   * Premium Phone Cases - Starting at just $9.99

🔹 **Smart Home Devices** - Buy One, Get One 50% OFF
   * Smart Speakers - Starting at $29.99
   * Video Doorbells - 40% OFF
   * Smart Lighting Kits - 30% OFF

🔹 **Wearable Tech** - Incredible Savings
   * Fitness Trackers - From $49.99
   * Smartwatches - Up to $150 OFF
   * Wireless Earbuds - Starting at $39.99

## EXTRA SAVINGS:
* Use code **FLASH70** for an ADDITIONAL 10% off
* FREE expedited shipping on orders over $100
* FREE extended warranty on purchases over $500

🕒 **HURRY! Sale ends tonight at midnight!**

[SHOP NOW](https://www.electronicstore.com/flash-sale)

*Limited stock available. No rainchecks. Cannot be combined with other offers.
Prices shown are valid online only during the flash sale period.*`,
        timestamp: { seconds: Date.now() / 1000 - 3600 },
        isImportant: false,
        category: "promotions"
      }
    },
    {
      id: "promo-2",
      data: {
        to: "user@example.com",
        from: "offers@traveldiscounts.com",
        subject: "✈️ Exclusive Summer Getaway Deals - Up to 50% Off Luxury Resorts",
        message: `# SUMMER ESCAPE DEALS
## Book by June 15 and SAVE BIG!

Dear Traveler,

Summer is approaching fast, and we've secured EXCLUSIVE deals on dream vacations just for our subscribers!

## TOP SUMMER DESTINATIONS:

### 🏝️ Tropical Paradise Escapes
* **Maldives Luxury Resort** - 50% OFF
  7 nights, overwater bungalow, all-inclusive
  Was $5,400 → NOW $2,700

* **Bali Beach Villas** - 40% OFF
  5 nights, private villa with pool
  Was $2,200 → NOW $1,320

* **Caribbean Cruise** - Buy One, Get One FREE
  7-day island hopping adventure
  Premium cabins available

### 🏙️ City Breaks & Cultural Tours
* **European Capitals Tour** - 35% OFF
  10 days, 4 cities, guided experiences
  Was $3,800 → NOW $2,470

* **Tokyo Explorer Package** - 30% OFF
  5 nights, central hotel, city tours included
  Was $1,900 → NOW $1,330

### 🏔️ Adventure & Nature Getaways
* **Costa Rica Eco Adventure** - 45% OFF
  8 days, rainforest and beach combo
  Was $2,600 → NOW $1,430

* **Safari Experience** - 35% OFF
  5-day luxury safari with private guide
  Was $4,200 → NOW $2,730

## EXCLUSIVE PERKS FOR EARLY BOOKINGS:
* FREE room upgrades (subject to availability)
* $100 resort credit per booking
* Flexible cancellation until 30 days before arrival
* 24/7 concierge service

## WHY BOOK WITH US:
* Price match guarantee
* Earn 2X loyalty points on summer bookings
* Installment payment options available
* Curated experiences by travel experts

**[BROWSE ALL DEALS](https://www.traveldiscounts.com/summer)**

Book by June 15 to secure these incredible prices!

Happy Travels,
The Travel Discounts Team

*Terms and conditions apply. Prices are per person based on double occupancy.
Availability is limited and subject to change without notice.*`,
        timestamp: { seconds: Date.now() / 1000 - 6500 },
        isImportant: false,
        category: "promotions"
      }
    },
    {
      id: "promo-3",
      data: {
        to: "user@example.com",
        from: "newsletter@fooddelivery.com",
        subject: "🍕 FREE DELIVERY all weekend! Plus 20% off your favorite restaurants",
        message: `# WEEKEND FOOD DEALS
## FREE DELIVERY + 20% OFF!

Hello Foodie!

We're making your weekend extra delicious with these exclusive offers:

## 🎉 WEEKEND SPECIALS:

### 📱 IN-APP DEALS:
* **FREE DELIVERY** on all orders over $15
* **20% OFF** your order with code: WEEKEND20
* **BOGO** deals from select premium restaurants

### 🔥 TRENDING RESTAURANTS:
* **Urban Burger** - Free appetizer with any burger order
* **Pasta Palace** - 25% off family-size pasta dishes
* **Sushi Express** - Free California roll with orders over $35
* **Taco Fiesta** - $10 off when you spend $40+
* **Pizza Heaven** - Buy one large pizza, get a medium free

### 🍕 NEW ON THE PLATFORM:
* **Smoke BBQ House** - Authentic Texas-style barbecue
* **Green Bowl** - Farm-to-table vegan cuisine
* **Sweet Treats** - Gourmet desserts delivered
* **Breakfast Club** - Morning favorites all day

### ⏰ MEAL PLANNING MADE EASY:
Schedule deliveries up to 7 days in advance and never worry about what to eat!

## HOW TO REDEEM:
1. Open the FoodDelivery app
2. Browse restaurants in your area
3. Add your favorites to cart
4. Enter promo code: WEEKEND20 at checkout
5. Enjoy your discounted meal with FREE delivery!

**Valid: This Friday through Sunday**

[OPEN APP & ORDER NOW](https://www.fooddelivery.com/app)

Hungry for more deals? Check the "Offers" tab in our app for restaurant-specific promotions updated daily!

Bon Appétit!
The FoodDelivery Team

*Free delivery valid on orders over $15. 20% discount capped at $10 maximum savings.
Offers cannot be combined with other promotions. Valid for this weekend only.*`,
        timestamp: { seconds: Date.now() / 1000 - 9200 },
        isImportant: false,
        category: "promotions"
      }
    },
    {
      id: "promo-4",
      data: {
        to: "user@example.com",
        from: "info@onlinelearning.com",
        subject: "🎓 Flash Sale: All Courses 85% Off - Learn New Skills Today!",
        message: `# BIGGEST COURSE SALE EVER
## ALL COURSES 85% OFF!

Dear Lifelong Learner,

For 48 hours only, we're offering our BIGGEST DISCOUNT EVER on all of our premium courses!

## 🎯 WHY THIS SALE IS SPECIAL:
* **85% OFF** all 10,000+ courses (our deepest discount ever)
* **Lifetime access** to all purchased courses
* **Certificates** included for all completed courses
* **Downloadable resources** for offline learning

## 🔝 TOP COURSE CATEGORIES:

### 💻 Technology & Coding
* Complete Web Development Bootcamp
* Python Programming Masterclass
* Data Science & Machine Learning
* iOS & Android App Development
* Cybersecurity Fundamentals

### 📊 Business & Marketing
* Digital Marketing Strategy
* Project Management Professional
* Financial Analysis & Modeling
* Social Media Marketing
* Entrepreneurship Fundamentals

### 🎨 Creative Skills
* Graphic Design Masterclass
* Video Editing with Premier Pro
* Photography Fundamentals
* UI/UX Design Portfolio Builder
* Animation & Motion Graphics

### 🧠 Personal Development
* Productivity & Time Management
* Public Speaking Mastery
* Emotional Intelligence at Work
* Leadership & Management Skills
* Negotiation Tactics & Strategies

## 👨‍🏫 FEATURED INSTRUCTORS:
Learn from industry experts with real-world experience!

## ⭐ STUDENT SUCCESS STORIES:
"I took the Web Development course and landed a job within 3 months!" - Sarah K.
"The Digital Marketing course helped me double my client base." - Michael T.
"Learning Python through this platform changed my career trajectory." - Priya S.

## 🕒 HURRY! Sale ends in 48 hours!

**Use code: FLASH85 at checkout**

[BROWSE ALL COURSES](https://www.onlinelearning.com/flash-sale)

Invest in yourself today!

The Online Learning Team

*This offer expires at 11:59 PM on May 31, 2023. Cannot be combined with other offers.
All courses include a 30-day money-back guarantee.*`,
        timestamp: { seconds: Date.now() / 1000 - 12400 },
        isImportant: false,
        category: "promotions"
      }
    },
    {
      id: "promo-5",
      data: {
        to: "user@example.com",
        from: "deals@fashionstore.com",
        subject: "👗 Summer Fashion Sale: 60% Off Everything + Extra 10% for Members",
        message: `# SUMMER FASHION BLOWOUT
## 60% OFF EVERYTHING!

Hello Fashion Lover,

Summer is here, and so is our BIGGEST SALE of the season!

## 🔆 SUMMER SALE HIGHLIGHTS:
* **60% OFF** storewide - no exclusions!
* **EXTRA 10% OFF** for loyalty members
* **FREE shipping** on all orders - no minimum!
* **Extended returns** until September 1st

## 👕 HOT DEALS BY CATEGORY:

### 👚 Women's Collection
* Summer Dresses - Starting at $19.99
* Designer Sandals - 70% OFF
* Swimwear Sets - Buy One, Get One FREE
* Luxury Handbags - Up to 65% OFF
* Activewear - 3 for $50

### 👔 Men's Collection
* Premium T-Shirts - 3 for $40
* Designer Sunglasses - 50% OFF
* Shorts & Swim Trunks - Starting at $14.99
* Casual Sneakers - Buy One, Get One 50% OFF
* Business Casual Sets - 60% OFF

### 👪 Family Deals
* Kids' Summer Essentials - 65% OFF
* Family Matching Sets - Special Bundle Pricing
* Baby Collection - 50% OFF + Free Gift

## 🆕 NEW ARRIVALS INCLUDED!
Unlike most sales, we're including all new summer arrivals in this special offer!

## 👑 EXCLUSIVE MEMBER BENEFITS:
* Early access to sale items
* Extra 10% off with code: MEMBER10
* Double reward points on all purchases
* Free style consultation (virtual or in-store)

## 🏪 WAYS TO SHOP:
* Online: www.fashionstore.com
* Mobile App: Download for extra app-only deals
* In-Store: Find your nearest location

**Sale Ends Sunday, June 4th**

[SHOP NOW BEFORE ITEMS SELL OUT](https://www.fashionstore.com/summer-sale)

Stay Stylish,
The Fashion Store Team

*Some designer brands may have restrictions. Extra 10% valid for registered members only.
Free shipping valid for domestic orders only.*`,
        timestamp: { seconds: Date.now() / 1000 - 15800 },
        isImportant: false,
        category: "promotions"
      }
    }
  ]
};

// Add email summary data
export const emailSummary = {
  lastUpdated: new Date().toISOString(),
  importantCount: 5,
  categories: {
    primary: 4,
    social: 1,
    promotions: 2,
    updates: 1,
    forums: 0
  },
  topSenders: [
    { name: "Sarah Johnson", count: 1 },
    { name: "TechCorp Recruitment", count: 1 },
    { name: "YourBank Security", count: 1 },
    { name: "Google Security", count: 1 }
  ],
  importantEmails: [
    {
      id: "inbox-1",
      from: "MailCrux Support",
      subject: "Welcome to MailCrux - Your Smart Email Management Solution",
      timestamp: Date.now() - 3600 * 1000,
      summary: "Welcome email with introduction to MailCrux features including smart inbox organization, important message detection, and daily summaries."
    },
    {
      id: "inbox-3",
      from: "YourBank Security",
      subject: "Important Security Alert: Unusual Account Activity Detected",
      timestamp: Date.now() - 10800 * 1000,
      summary: "Security alert about suspicious account activity from Moscow, Russia. Recommendation to change password and enable two-factor authentication."
    },
    {
      id: "inbox-6",
      from: "Sarah Johnson",
      subject: "Team Meeting Rescheduled + Important Project Updates",
      timestamp: Date.now() - 25200 * 1000,
      summary: "Weekly team meeting moved to Thursday 2:00 PM. Project Alpha updates: Backend 87% complete, Frontend 73% complete, QA Testing 45% complete. Client presentation next Wednesday."
    },
    {
      id: "inbox-7",
      from: "Google Security",
      subject: "New Sign-In Detected on Your Account",
      timestamp: Date.now() - 28800 * 1000,
      summary: "New account sign-in detected from San Francisco. Windows PC using Chrome browser."
    },
    {
      id: "inbox-9",
      from: "TechCorp Recruitment",
      subject: "Interview Invitation: Senior Developer Position at TechCorp",
      timestamp: Date.now() - 39600 * 1000,
      summary: "Interview invitation for Senior Developer position on May 25 at 10:00 AM. 90-minute video interview with James Wilson, Lisa Chen, and Michael Rodriguez."
    }
  ],
  actionRequired: [
    {
      id: "inbox-3",
      action: "Review security alert and secure account if needed",
      urgency: "high"
    },
    {
      id: "inbox-9",
      action: "Confirm interview availability for May 25",
      urgency: "medium"
    },
    {
      id: "inbox-6",
      action: "Prepare for rescheduled team meeting on Thursday",
      urgency: "medium"
    }
  ],
  promotionsSummary: "2 promotional emails, including a weekend sale from Fashion Outlet and subscription renewal from StreamFlix."
}; 