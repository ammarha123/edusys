import { Typography,Box } from '@mui/material';
import React from 'react';


export default function Contact() {
    return (
      <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '60px',
                backgroundColor: '#C9E5EF',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    p: 2,
                    textAlign: 'center', // Center-align the content
                }}
            >
                <Typography variant="h4" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    Contact Us
                </Typography>
                <Typography variant="h7" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    We'd love to hear from you!
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    If you have any questions, feedback, or inquiries, feel free to reach out to us.
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    Email: edusys@enquiries.com
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    Phone: +123-456-7890
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Calistoga', mt: 2 }}>
                    Address: Faculty of Computing UTM
                </Typography>
            </Box>
        </Box>
    );
    
};
