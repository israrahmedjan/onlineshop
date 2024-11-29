import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Weight } from "lucide-react";
import React from "react";

// const baseUrl = process.env.REACT_APP_BASE_URL
// ? `https://${process.env.VERCEL_URL}`
// : "";
const baseUrl = process.env.REACT_APP_BASE_URL || "";
const logo = "https://res.cloudinary.com/dozddxjyh/image/upload/v1731128344/logo_a313vi.png";
const KoalaWelcomeEmail = ({ amount_total, email, name,phone }) =>

  {

  return (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads. 
    </Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
      <Img
          src={logo}
          width="200"
          height="70"
          alt="Koala"
          style={styles.logo}
        
        />   
        <Text style={styles.paragraph}>Hi , {name}</Text>
        <Text style={styles.paragraph}>
        Your selected product will be ready and assigned to you within 24 hours. 
        If you have any questions or need assistance, 
        feel free to reach out to our support team. We’re here to help!
        </Text>
        <p style={styles.heading}>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <Hr style={styles.hr} />
            <p>Total Amount Conducted : {amount_total}</p>
         
        </p>
        <Text style={styles.paragraph}>
          Best,
          <br />
          The Market Vibe team
        </Text>
        <Hr style={styles.hr} />
        <Text style={styles.footer}>
         F11 Markaz Islamabad , Postal Code 94080
        </Text>
      </Container>
    </Body>
  </Html>
);
} 
// KoalaWelcomeEmail.defaultProps = {
//   userFirstname: "Alan",
// };

export default KoalaWelcomeEmail;

const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
  },
  logo: {
    margin: "auto",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "26px",
  },
  heading:{
    fontSize: "20px",
    lineHeight: "8px", 
  },
  btnContainer: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  },
  hr: {
    borderColor: "#cccccc",
    margin: "20px 0",
  },
  footer: {
    color: "#8898aa",
    fontSize: "12px",
  },
};
