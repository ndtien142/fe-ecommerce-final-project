import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
//
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
}));

const CardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export default function PolicyContent() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Privacy Policy & Terms of Service
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500' }}>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </m.div>
        </Box>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We respect your privacy and are committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, and safeguard your data when you
                visit our furniture store or make purchases.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Information We Collect:
              </Typography>
              <Typography variant="body1" paragraph>
                • Personal information (name, email, phone number, address) when you create an
                account or make a purchase
                <br />
                • Payment information (processed securely through our payment partners)
                <br />
                • Website usage data and cookies to improve your shopping experience
                <br />• Communication preferences and customer service interactions
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                How We Use Your Information:
              </Typography>
              <Typography variant="body1" paragraph>
                • Process and fulfill your furniture orders
                <br />
                • Provide customer support and respond to inquiries
                <br />
                • Send order updates and delivery notifications
                <br />
                • Improve our website and services based on your feedback
                <br />• Send promotional offers (only with your consent)
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Terms of Service
              </Typography>
              <Typography variant="body1" paragraph>
                By using our furniture store website and services, you agree to comply with and be
                bound by the following terms and conditions.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Account Responsibilities:
              </Typography>
              <Typography variant="body1" paragraph>
                • You must provide accurate and complete information when creating an account
                <br />
                • You are responsible for maintaining the confidentiality of your account
                credentials
                <br />• You must notify us immediately of any unauthorized use of your account
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Order Terms:
              </Typography>
              <Typography variant="body1" paragraph>
                • All prices are subject to change without notice
                <br />
                • Orders are subject to availability and acceptance
                <br />
                • We reserve the right to refuse or cancel orders at our discretion
                <br />• Delivery times are estimates and may vary based on location and product
                availability
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Return & Exchange Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We want you to be completely satisfied with your furniture purchase. Our return and
                exchange policy is designed to ensure your peace of mind.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Return Period:
              </Typography>
              <Typography variant="body1" paragraph>
                • 30 days from delivery date for most furniture items
                <br />
                • 14 days for custom or personalized furniture
                <br />• 7 days for clearance or sale items
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Return Conditions:
              </Typography>
              <Typography variant="body1" paragraph>
                • Items must be in original condition with all packaging
                <br />
                • Custom or personalized items cannot be returned unless defective
                <br />
                • Customer is responsible for return shipping costs unless item is defective
                <br />• Refunds will be processed within 5-7 business days after we receive the
                returned item
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Shipping & Delivery Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We strive to deliver your furniture safely and on time. Here's what you need to know
                about our shipping and delivery process.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Delivery Options:
              </Typography>
              <Typography variant="body1" paragraph>
                • Standard delivery: 7-14 business days
                <br />
                • White glove delivery: Professional setup and old furniture removal available
                <br />
                • Express delivery: 2-5 business days for select items
                <br />• Local pickup available at our showroom locations
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Delivery Process:
              </Typography>
              <Typography variant="body1" paragraph>
                • We'll contact you to schedule delivery once your order is ready
                <br />
                • Someone must be present during delivery to inspect and accept the items
                <br />
                • Please inspect all items for damage before signing for delivery
                <br />• Report any damage or issues within 48 hours of delivery
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Warranty & Care
              </Typography>
              <Typography variant="body1" paragraph>
                We stand behind the quality of our furniture and offer comprehensive warranty
                coverage for your peace of mind.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Warranty Coverage:
              </Typography>
              <Typography variant="body1" paragraph>
                • 1-year warranty on all furniture frames and mechanisms
                <br />
                • 6-month warranty on fabric and upholstery
                <br />
                • 2-year warranty on mattresses and bedding
                <br />• Lifetime warranty on solid wood construction
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Care Instructions:
              </Typography>
              <Typography variant="body1" paragraph>
                • Follow the care instructions provided with each piece
                <br />
                • Use appropriate cleaning products for different materials
                <br />
                • Avoid direct sunlight and excessive moisture
                <br />• Professional cleaning recommended for delicate fabrics
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Questions About Our Policies?
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500' }}>
              Contact our customer service team at support@furniturestore.com or call (555) 123-4567
            </Typography>
          </Box>
        </m.div>
      </Container>
    </RootStyle>
  );
}
