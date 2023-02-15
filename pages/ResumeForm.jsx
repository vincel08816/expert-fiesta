import FilePresentIcon from "@mui/icons-material/FilePresent";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Swal from "sweetalert2";

import React, { useState } from "react";

const initialState = {
  role: "",
  company: "",
  clientType: "",
  isFullStack: false,
};

const ButtonComponent = ({
  form,
  children,
  copyText,
  tooltipText,
  requiresErrorCheck,
}) => {
  const handleClick = () => {
    if (requiresErrorCheck) {
      const { role, company, clientType } = form;
      if (!role || !company || !clientType) {
        return Swal.fire({
          icon: "error",
          title: "Please fill in all fields",
          text: "wah wah wah",
        });
      }
    }
    navigator.clipboard.writeText(copyText);
  };
  return (
    <Tooltip title={tooltipText}>
      <IconButton sx={{ p: 1, m: 1 }} onClick={handleClick} variant="Primary">
        {children}
      </IconButton>
    </Tooltip>
  );
};

const frontendParagraph = `As a front-end developer, I have extensive experience designing and developing modern web applications. One of my recent projects was a social media site for stocks. For this project, I created a reusable React component news feed tab with infinite scrolling capabilities and an interactive commenting system with upvotes and downvotes that allows users to sort by most votes or most recent. Additionally, I implemented a light and dark mode toggle feature requiring an entire site redesign. My skills in developing user-friendly front-end interfaces have enabled me to create innovative solutions that are visually appealing and highly functional.`;

const fullStackParagraph = `I have a proven track record of my abilities, as demonstrated in my work on Fanfare, a platform for discovering and collecting music NFTs. I was responsible for creating the project end-to-end, including designing and implementing the user interface, setting up the database using technologies such as MongoDB, and handling authentication and transactions using MetaMask and Ethers.js. I was also responsible for creating a UI for creating and managing NFTs, implementing a voting system based on token ownership, and improving site performance by managing file sizes and upload limits.`;

const linkedinUrl = "https://www.linkedin.com/in/vincentlee28/";
const websiteUrl = "https://vince-personal.herokuapp.com";

const ResumeForm = () => {
  const [form, setForm] = useState(initialState);
  const { role, company, clientType, isFullStack } = form;

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheck = () => {
    setForm({ ...form, ["isFullStack"]: !form.isFullStack });
  };

  const letter = `Dear Hiring Manager,\n
  I am excited to apply for the ${role} role at ${company}. My expertise in technologies such as HTML, CSS, JavaScript, React, and Express.js, enables me to efficiently develop and implement engaging front-end interfaces. I am proficient in both SQL and NoSQL databases, specifically Postgres and MongoDB, allowing me to effectively manage and manipulate data. Additionally, my experience with Git, Github, and Heroku facilitates efficient version control and deployment of my code. My experience in deployment, refactoring, and web accessibility best practices, enables me to deliver high-quality, performant and accessible solutions.\n
  ${isFullStack ? fullStackParagraph : frontendParagraph}\n
  I am organized and stay on top of tasks by using a custom ticketing system and Asana, and I attend weekly sprint meetings to collaborate with my team on new designs and solve any problems that arise. The process that is brought up could include discussing Zeplin wireframes with UI/UX Product Designers, potential roadblocks with other engineers, and/or backend design patterns when it comes to creating new features. I am always open to feedback and eager to learn from others.\n
  I am excited to bring my skills to ${company} and be part of a team of designers and developers who create high-quality websites and applications that can impact ${clientType}.\n
  Thank you for considering my application.\n
  Best,\n
  Vincent`;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ pt: 2, pb: 2 }}>
        {Object.entries(form).map(([key, value]) => (
          <TextField
            sx={{ m: 1 }}
            key={key}
            name={key}
            label={key}
            value={value}
            onChange={handleChange}
          />
        ))}
        <Box>
          <ButtonComponent
            requiresErrorCheck
            form={form}
            tooltipText="Cover Letter"
            copyText={letter}
          >
            <FilePresentIcon />
          </ButtonComponent>
          <ButtonComponent
            form={form}
            tooltipText="Linkedin"
            copyText={linkedinUrl}
          >
            <LinkedInIcon />
          </ButtonComponent>
          <ButtonComponent
            form={form}
            tooltipText="Personal Website"
            copyText={websiteUrl}
          >
            <LinkIcon />
          </ButtonComponent>
          <FormControlLabel
            control={
              <Switch
                name="isFullStack"
                checked={isFullStack}
                onChange={handleCheck}
              />
            }
            label="FS?"
          />
        </Box>
      </Box>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Cover Letter Template Preview
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
        {letter.split("\n").map((line, index) => (
          <Typography key={"coverLetter" + index} paragraph>
            {line}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default ResumeForm;
