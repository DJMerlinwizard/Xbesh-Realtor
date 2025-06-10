// This is a simple Reddit scraper script that would be used to find potential real estate leads
// In a production environment, this would be a more sophisticated system using the Reddit API

import axios from 'axios';
import fs from 'fs';

// Subreddits to monitor
const subreddits = [
  'RealEstate',
  'FirstTimeHomeBuyer',
  'Mortgages',
  'personalfinance',
  'HomeImprovement',
  'realestateinvesting',
  'homeowners',
  'HousingMarket'
];

// Keywords to look for
const keywords = [
  'buying a home',
  'first time home',
  'mortgage',
  'refinance',
  'realtor',
  'real estate agent',
  'house hunting',
  'looking to buy',
  'moving to',
  'relocating',
  'home purchase',
  'pre-approval',
  'down payment',
  'closing costs',
  'home inspection',
  'selling my house',
  'listing agent'
];

// Function to score a post based on relevance
function scorePost(post) {
  let score = 0;
  
  // Check title for keywords
  const titleLower = post.title.toLowerCase();
  keywords.forEach(keyword => {
    if (titleLower.includes(keyword.toLowerCase())) {
      score += 10;
    }
  });
  
  // Check selftext for keywords
  const textLower = post.selftext.toLowerCase();
  keywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      score += 5;
    }
  });
  
  // Boost score for specific indicators
  if (textLower.includes('looking for recommendations') || 
      textLower.includes('need advice') || 
      textLower.includes('can anyone recommend')) {
    score += 15;
  }
  
  // Boost score for posts with location information
  if (textLower.match(/\b(in|to|from|near)\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?\b/)) {
    score += 20;
  }
  
  // Boost score for posts mentioning timeframes
  if (textLower.match(/\b(next|coming|within|in)\s+\d+\s+(days|weeks|months)\b/) ||
      textLower.includes('soon') || 
      textLower.includes('immediately')) {
    score += 15;
  }
  
  // Boost score for posts mentioning budget
  if (textLower.match(/\b\$\d+[k]?\b/) || 
      textLower.match(/\bbudget\b/) || 
      textLower.match(/\bprice range\b/)) {
    score += 15;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Function to extract location from post
function extractLocation(post) {
  const text = post.title + ' ' + post.selftext;
  
  // Look for common location patterns
  const locationMatch = text.match(/\b(in|to|from|near)\s+([A-Z][a-z]+(\s+[A-Z][a-z]+)?)\b/);
  if (locationMatch && locationMatch[2]) {
    return locationMatch[2];
  }
  
  // Check for city names in text
  const commonCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
                        'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Seattle', 
                        'Denver', 'Boston', 'Portland', 'Miami', 'Atlanta', 'Nashville'];
  
  for (const city of commonCities) {
    if (text.includes(city)) {
      return city;
    }
  }
  
  return 'Unknown';
}

// Function to extract budget from post
function extractBudget(post) {
  const text = post.title + ' ' + post.selftext;
  
  // Look for dollar amounts
  const budgetMatch = text.match(/\$(\d{3},\d{3}|\d{3}k|\d+,\d{3},\d{3}|\d+\s*-\s*\d+k|\d+k\s*-\s*\d+k)/);
  if (budgetMatch) {
    return budgetMatch[0];
  }
  
  // Look for budget mentions
  const budgetTextMatch = text.match(/budget\s*(of|is|around)?\s*\$?(\d{3},\d{3}|\d{3}k|\d+,\d{3},\d{3})/i);
  if (budgetTextMatch) {
    return '$' + budgetTextMatch[2];
  }
  
  return 'Unknown';
}

// Main function to scrape Reddit
async function scrapeReddit() {
  console.log('Starting Reddit scraper...');
  
  const leads = [];
  
  for (const subreddit of subreddits) {
    try {
      console.log(`Scraping r/${subreddit}...`);
      
      // In a real implementation, this would use the Reddit API with proper authentication
      // For this example, we're using the JSON endpoint which is rate-limited and not suitable for production
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}/new.json?limit=100`);
      
      const posts = response.data.data.children;
      
      for (const post of posts) {
        const postData = post.data;
        
        // Skip posts that aren't self posts (text posts)
        if (!postData.is_self) continue;
        
        // Score the post for relevance
        const leadScore = scorePost(postData);
        
        // Only consider posts with a minimum score
        if (leadScore >= 50) {
          const lead = {
            id: postData.id,
            username: postData.author,
            post_title: postData.title,
            post_content: postData.selftext,
            subreddit: `r/${subreddit}`,
            created_at: new Date(postData.created_utc * 1000).toISOString(),
            permalink: `https://reddit.com${postData.permalink}`,
            lead_score: leadScore,
            location: extractLocation(postData),
            budget: extractBudget(postData),
            status: 'new',
            contact_status: 'Not contacted'
          };
          
          leads.push(lead);
          console.log(`Found lead: ${lead.username} - "${lead.post_title.substring(0, 50)}..." (Score: ${lead.lead_score})`);
        }
      }
      
      // In a real implementation, we would respect Reddit's rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Error scraping r/${subreddit}:`, error.message);
    }
  }
  
  // Sort leads by score
  leads.sort((a, b) => b.lead_score - a.lead_score);
  
  // Save leads to a file
  fs.writeFileSync('leads.json', JSON.stringify(leads, null, 2));
  
  console.log(`Scraping complete. Found ${leads.length} potential leads.`);
}

// Run the scraper
scrapeReddit().catch(error => {
  console.error('Scraper failed:', error);
});
