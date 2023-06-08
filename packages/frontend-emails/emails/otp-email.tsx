import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { render } from '@react-email/render';
import * as React from 'react';

interface OTPEmailProps {
  otp: string | number;
}

const OTPEmail = ({ otp = '123456' }: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>One time password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Login to CompanyName</Heading>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Your one time password is
        </Text>
        <code style={code}>{otp}</code>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '0px',
          }}>
          Copy and paste this code to login
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}>
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const renderOtpEmail = ({ otp }: OTPEmailProps) => {
  return render(<OTPEmail otp={otp} />);
};

export default OTPEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const code = {
  display: 'inline-block',
  padding: '16px 3%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  fontSize: '24px',
  letterSpacing: '2px',
};
