// Filename - components/Footer.js

import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyles";

export const RTPFooter = () => {
	return (
		<Box>
			<h1
				style={{
					color: "green",
					textAlign: "center",
					marginTop: "10px",
				}}
			>
				Now 🇮🇳 prints fastest without bothering his/her busy business 
			</h1>
			<FooterContainer>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="#">
							Aim
						</FooterLink>
						<FooterLink href="#">
							Vision
						</FooterLink>
						<FooterLink href="#">
							Testimonials
						</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">
							Printing
						</FooterLink>
						<FooterLink href="#">
							Online Xerox/Printing Delivery <code>(Beta)</code>
						</FooterLink>
						<FooterLink href="#">
							Printing protocols
						</FooterLink>
					</Column>
					<Column>
						<Heading>We are at</Heading>
						<FooterLink href="#">
							Bengaluru
						</FooterLink>
						<FooterLink href="#">
							Kolkata
						</FooterLink>
					</Column>
					<Column>
					<Heading>CopyWrite</Heading>
					 <FooterLink style={{textDecoration: 'none',fontFamily: "fantasy"}} href="#">Ready To Print @2024</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};

