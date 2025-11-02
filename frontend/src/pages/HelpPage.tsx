import React, { useState } from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { ExpandMore, Search, Help, ContactSupport, Book, Security } from '@mui/icons-material';

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: <Help />,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button and fill in your details. You\'ll need a valid university email address to register.'
        },
        {
          question: 'How do I list an item for swap?',
          answer: 'Go to "Upload Item" in your dashboard, add photos, description, and set your swap preferences.'
        },
        {
          question: 'Is SwapAm free to use?',
          answer: 'Yes! SwapAm is completely free for all students. We believe in making sustainability accessible to everyone.'
        }
      ]
    },
    {
      title: 'Swapping Process',
      icon: <Book />,
      faqs: [
        {
          question: 'How does the swapping process work?',
          answer: 'Browse items, send swap requests, negotiate terms through our chat system, and arrange meetups for exchange.'
        },
        {
          question: 'What if the other person doesn\'t show up?',
          answer: 'You can report no-shows through our platform. Repeated offenses may result in account suspension.'
        },
        {
          question: 'Can I swap multiple items at once?',
          answer: 'Yes! You can create bundle swaps or negotiate multiple item exchanges with other users.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      icon: <Security />,
      faqs: [
        {
          question: 'How do you ensure user safety?',
          answer: 'We verify university emails, have user ratings, and recommend meeting in public campus locations.'
        },
        {
          question: 'What should I do if I encounter a problem?',
          answer: 'Use our report feature or contact support immediately. We take all safety concerns seriously.'
        },
        {
          question: 'How is my personal information protected?',
          answer: 'We follow strict privacy policies and never share your personal information with third parties.'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Contact Support', description: 'Get help from our team', icon: <ContactSupport /> },
    { title: 'Community Guidelines', description: 'Learn about our rules', icon: <Book /> },
    { title: 'Safety Tips', description: 'Stay safe while swapping', icon: <Security /> },
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title }))
  );

  const filteredFaqs = searchTerm 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFaqs;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 3 }}>
          How can we help you?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Find answers to common questions or get in touch with our support team
        </Typography>
        
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ mb: 4 }}
          />
        </Box>
      </Box>

      {/* Quick Links */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickLinks.map((link, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ textAlign: 'center', p: 3, cursor: 'pointer', '&:hover': { boxShadow: 4 } }}>
              <Box sx={{ color: 'primary.main', mb: 2, fontSize: 48 }}>
                {link.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {link.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {link.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ Sections */}
      {searchTerm ? (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Search Results ({filteredFaqs.length})
          </Typography>
          {filteredFaqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {faq.category}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        faqCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ color: 'primary.main', mr: 2, fontSize: 32 }}>
                {category.icon}
              </Box>
              <Typography variant="h4">{category.title}</Typography>
            </Box>
            
            {category.faqs.map((faq, faqIndex) => (
              <Accordion key={faqIndex} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))
      )}

      {/* Contact Support */}
      <Box sx={{ 
        textAlign: 'center', 
        bgcolor: 'grey.50', 
        p: 6, 
        borderRadius: 3,
        mt: 6
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Still need help?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Can't find what you're looking for? Our support team is here to help.
        </Typography>
        <Button variant="contained" size="large">
          Contact Support
        </Button>
      </Box>
    </Container>
  );
};

export default HelpPage;